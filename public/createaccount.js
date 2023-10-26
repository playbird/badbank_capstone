// Initialize Firebase with the configuration
firebase.initializeApp(firebaseConfig);

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState(''); // Local state for name
  const [email, setEmail] = React.useState(''); // Local state for email
  const [password, setPassword] = React.useState(''); // Local state for password

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ?
        <CreateForm setShow={setShow} name={name} email={email} password={password} setName={setName} setEmail={setEmail} setPassword={setPassword} /> :
        <CreateMsg setShow={setShow} />}
    />)
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
  const auth = firebase.auth();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;

  // Extract data from props
  const { setShow } = props;

  const [name, setName] = React.useState(''); // Local state for name
  const [email, setEmail] = React.useState(''); // Local state for email
  const [password, setPassword] = React.useState(''); // Local state for password
  const [formStatus, setFormStatus] = React.useState(''); // Local status state

  async function handle() {
    setFormStatus(''); // Update status using local state

    if (!emailRegex.test(email)) {
      setFormStatus('Error: Please enter a valid email address');
    } else if (password.length < 8) {
      setFormStatus('Error: Password must be at least 8 characters long');
    } else {
      // Check if the user already exists in MongoDB
      const userExists = await checkUserExistsInMongoDB(email);

      if (userExists) {
        setFormStatus('Error: User already exists');
      } else {
        try {
          // Use createUserWithEmailAndPassword method to create a user
          await auth.createUserWithEmailAndPassword(email, password);

          // Get the currently signed-in user
          const user = auth.currentUser;

          // Handle success here, e.g., you can access user for the registered user.
          console.log('User registered:', user);

          // Add the user to MongoDB
          await addUserToMongoDB(name, email, password);

          setFormStatus('Account created successfully');
          setTimeout(() => {
            setFormStatus('');
            setShow(false);
          }, 3000);
        } catch (error) {
          setFormStatus('Error: ' + error.message);
        }
      }
    }
  }

  async function checkUserExistsInMongoDB(email) {
    try {
      const response = await fetch(`/account/find/${email}`);
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const user = await response.json();
          // Check if the response contains valid data
          if (user && Object.keys(user).length > 0) {
            return true; // User exists
          }
        }
        return false; // User doesn't exist (no valid data)
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async function addUserToMongoDB(name, email, password) {
    try {
      const response = await fetch(`/account/create/${name}/${email}/${password}`, {
        method: 'GET', // Use GET method to create user
      });

      if (response.ok) {
        const user = await response.json();
        console.log('User added to MongoDB:', user);
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    } catch (error) {
      throw error;
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

      {formStatus && <p>{formStatus}</p>}
    </>
  );
}