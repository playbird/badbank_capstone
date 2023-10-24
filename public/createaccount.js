// Initialize Firebase with the configuration
firebase.initializeApp(firebaseConfig);

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ?
        <CreateForm setShow={setShow} /> :
        <CreateMsg setShow={setShow} />}
    />
  )
}

function CreateMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');

  async function handle() {
    const auth = firebase.auth();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;

    setStatus('');

    if (!emailRegex.test(email)) {
      setStatus('Error: Please enter a valid email address');
    } else if (password.length < 8) {
      setStatus('Error: Password must be at least 8 characters long');
    } else {
      try {
        // Use createUserWithEmailAndPassword method to create a user
        await auth.createUserWithEmailAndPassword(email, password);

        // Get the currently signed-in user
        const user = auth.currentUser;

        // Handle success here, e.g., you can access user for the registered user.
        console.log('User registered:', user);

        setStatus('Account created successfully');
        setTimeout(() => {
          setStatus('');
          props.setShow(false);
        }, 3000);
      } catch (error) {
        setStatus('Error: ' + error.message);
      }
    }
  }

  return (
    <>
      Name<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      /><br />

      Email address<br />
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
        Create Account
      </button>

      {status && <p>{status}</p>}
    </>
  );
}
