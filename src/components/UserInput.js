import { useState } from "react";
function UserInput({ auth, firebase, messagesRef, scroller }) {
  const [userInput, setUserInput] = useState("");

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
    <form onSubmit={sendMessage}>
      <input
        type="text"
        className="message-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></input>
      <button>Send</button>
    </form>
  );
}

export default UserInput;
