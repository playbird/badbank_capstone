function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');


  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
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
  const [status, setStatus] = React.useState(''); // Add status state for error messages

  function handle() {
    // Reset status message
    setStatus('');

    // Email validation using a simple regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation
    if (!emailRegex.test(email)) {
      setStatus('Error: Please enter a valid email address');
    } else if (password.length < 8) {
      setStatus('Error: Password must be at least 8 characters long');
    } else {
      // Validation passed, make the API request
      const url = `/account/create/${name}/${email}/${password}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
        // Check if the creation was successful and set status accordingly
        if (data.success) {
          setStatus('Account created successfully');
          setTimeout(() => {
            setStatus('');
            props.setShow(false);
          }, 3000);
        } else {
          setStatus('Error: ' + data.message);
        }
      })();
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
      
      {/* Display error or success message */}
      {status && <p className="text-danger mt-3">{status}</p>}
    </>
  );
}
