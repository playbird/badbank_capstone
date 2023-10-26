
function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [data, setData] = React.useState('log in')  

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handle() {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Authentication succeeded; you can now access the authenticated user
      const user = firebase.auth().currentUser;
      if (user) {
        // Add your logic here to handle the authenticated user
        console.log('User authenticated:', user);

        // Set your application state or perform other actions as needed
        props.setStatus('');
        props.setShow(false);
      }
    } catch (error) {
      // Authentication failed
      console.error('Authentication error:', error);
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
