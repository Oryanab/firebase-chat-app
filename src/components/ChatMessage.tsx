import React from "react";

type Props = {
  message: any;
};

const ChatMessage = (props: Props) => {
  const { text, uid } = props.message;
  return <div>ChatMessage</div>;
};

export default ChatMessage;
