import ChatMessage from "./ChatMessage";
import firebase from "firebase/compat/app";
import { useState, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom({ firestore, auth }) {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy(`createdAt`).limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages);

  const [userInput, setUserInput] = useState("");
  const scroller = useRef();

  async function sendMessage(e) {
    e.preventDefault();

    const { uid } = auth.currentUser;

    await messagesRef.add({
      message: userInput,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });

    setUserInput("");
    scroller.current.scrollIntoView({
      behavior: "smooth",
    });
  }

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
      <form onSubmit={sendMessage}>
        <input
          type="text"
          className="message-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></input>
        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
