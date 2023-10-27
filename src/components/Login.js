function Login({ auth, firebase }) {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div className="login-container">
      <h1>Please Sign in</h1>
      <button className="login-button" onClick={signInWithGoogle}>
        Sign In
      </button>
    </div>
  );
}

export default Login;
