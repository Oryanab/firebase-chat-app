import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../shared/firebase";

const ChatRoom = () => {
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages, loading, error] = useCollectionData(messagesQuery, {
    idField: "id",
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading messages</p>}
      {messages?.map((msg) => (
        <div key={msg.id}>{msg.text}</div>
      ))}
    </div>
  );
};

export default ChatRoom;
