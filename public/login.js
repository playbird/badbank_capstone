import React from 'react';

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handle() {
    // Access Firebase authentication
    const auth = firebase.auth();

    try {
      // Sign in with email and password
      await auth.signInWithEmailAndPassword(email, password);

      // Get the currently signed-in user
      const user = auth.currentUser;

      // Handle success here, e.g., you can access user for the authenticated user.
      console.log('User authenticated:', user);

      props.setStatus('Login successful');
      props.setShow(false);
    } catch (error) {
      props.setStatus('Error: ' + error.message);
    }
  }

  return (
    <>
      Email<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      /><br />

      Password<br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      /><br />

      <button type="submit" className="btn btn-light" onClick={handle}>
        Login
      </button>
    </>
  );
}

export default LoginForm;
