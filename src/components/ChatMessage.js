function ChatMessage({ msg, auth }) {
  console.log(msg);
  const { message, uid } = msg;
  console.log(uid);

  return (
    <p
      className={`message ${
        uid === auth.currentUser.uid ? "sent" : "recieved"
      }`}
    >
      {message}
    </p>
  );
}

export default ChatMessage;
