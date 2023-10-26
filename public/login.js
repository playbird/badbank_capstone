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

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle() {
    fetch(`/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);
  
          // Assuming 'create' function inserts data into MongoDB
          create(data.name, data.email, data.password) // Call the create function to add the user to the database
            .then((insertedUser) => {
              console.log('User inserted into MongoDB:', insertedUser);
            })
            .catch((err) => {
              console.error('Error inserting user into MongoDB:', err);
            });
  
          setData(data);
        } catch (err) {
          // Handle parsing error
          console.log('err:', text);
        }
      });
  }
  


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}

function activeLogin(activeEmail) {
  const [current, setCurrent] = React.useState('');
  setCurrent(activeEmail);
  // console.log(data.email);
  // console.log(activeEmail);
  //   do {  
  //     if (data[i].email == activeEmail) {
  //       console.log(data[i].email);
  //       console.log(activeEmail);
  //       setCurrent(activeEmail);
  //       return
  //       }
  //     i++; 
  //   }
  //   while (i < data.length);
}
