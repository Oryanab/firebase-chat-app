import {
  addDoc,
  collection,
  CollectionReference,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../shared/firebase";
import { chatRoomNames } from "../shared/constants";
import { useAuth } from "./authProvider";

export interface ChatMessage {
  id?: string;
  text: string;
  room: string;
  uid: string;
  displayName: string;
  photoURL?: string;
  createdAt: any;
}

type ChatContextType = {
  selectedChatRoom: string;
  handleChangeChatRoom: (room: string) => void;
  messages: ChatMessage[] | undefined;
  loading: boolean;
  sendMessage: (text: string) => Promise<void>;
};

const ChatContext = createContext<ChatContextType>({
  selectedChatRoom: "",
  handleChangeChatRoom: () => {},
  messages: [],
  loading: true,
  sendMessage: async () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const [selectedChatRoom, setSelectedChatRoom] = useState(chatRoomNames[0]);

  const messagesRef = collection(
    db,
    "messages"
  ) as CollectionReference<ChatMessage>;

  const messagesQuery = query(
    messagesRef,
    where("room", "==", selectedChatRoom),
    orderBy("createdAt", "asc")
  );

  const [messages, loading, error] =
    useCollectionData<ChatMessage>(messagesQuery);

  console.log({ loading, error, messages });

  const handleChangeChatRoom = (room: string) => setSelectedChatRoom(room);
  const sendMessage = async (text: string) => {
    if (!user) {
      return;
    }
    if (!text.trim()) return;

    await addDoc(messagesRef, {
      text,
      room: selectedChatRoom,
      uid: user.uid,
      displayName: user.displayName ?? "Anon",
      photoURL: user.photoURL ?? "",
      createdAt: serverTimestamp(),
    });
  };
  return (
    <ChatContext.Provider
      value={{
        selectedChatRoom,
        handleChangeChatRoom,
        messages,
        loading,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
