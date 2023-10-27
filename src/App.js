import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import { getFirestore, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import SignOut from "./components/SignOut";

firebase.initializeApp({
  apiKey: "AIzaSyA0Ue_HQN_GiThArf7K6kSNsdW4BqjDVcg",
  authDomain: "react-chat-app-b71c0.firebaseapp.com",
  projectId: "react-chat-app-b71c0",
  storageBucket: "react-chat-app-b71c0.appspot.com",
  messagingSenderId: "1091946090583",
  appId: "1:1091946090583:web:c5d885a7169b0fc526d312",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

// Get a list of cities from your database

function App() {
  const [user] = useAuthState(auth);

  // useEffect(() => {
  //   async function getMessages(db) {
  //     const messagesCol = collection(db, "messages");
  //     const messagesSnapshot = await getDocs(messagesCol);

  //     const messagesList = messagesSnapshot.docs.map((doc) => doc.data());
  //     console.log(messagesList);
  //     setMessages(messagesList);
  //   }
  //   getMessages(db);
  // }, []);
  return (
    <div className="App">
      <header className="App-header">{user && <SignOut auth={auth} />}</header>

      <section>
        {user ? (
          <ChatRoom firestore={firestore} auth={auth} />
        ) : (
          <Login auth={auth} firebase={firebase} />
        )}
      </section>
    </div>
  );
}

export default App;
