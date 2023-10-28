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
      <header className="App-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="logo"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
          />
        </svg>

        {user && <SignOut auth={auth} />}
      </header>

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
