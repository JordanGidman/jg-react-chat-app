import ChatMessage from "./ChatMessage";
import firebase from "firebase/compat/app";
import { useState, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserInput from "./UserInput";

function ChatRoom({ firestore, auth }) {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy(`createdAt`).limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages);

  const scroller = useRef();

  return (
    <div className="chat-container">
      <main className="chat-messages">
        {messages &&
          messages.map((msg) => (
            <ChatMessage
              key={msg.id || crypto.randomUUID()}
              msg={msg}
              auth={auth}
            />
          ))}

        <div ref={scroller}></div>
      </main>
      <UserInput
        auth={auth}
        messagesRef={messagesRef}
        firebase={firebase}
        scroller={scroller}
      />
    </div>
  );
}

export default ChatRoom;
