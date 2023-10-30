function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [deposit, setDeposit] = React.useState(null); // Initialize deposit as null

  function updateDeposit(newDeposit) {
    setDeposit(newDeposit);
  }

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus} updateDeposit={updateDeposit} /> :
        <DepositMsg setShow={setShow} setStatus={setStatus} deposit={deposit} />}
    />
  )
}

function DepositMsg(props){
  return (<>
     <h5>Deposit submitted:</h5>
      <p>${props.deposit}</p>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        if(amount > 0){
          fetch(`/account/update/${email}/${amount}`)
          .then(response => response.text())
          .then(text => {
          try {
              const data = JSON.parse(text);
              //props.setStatus(JSON.stringify(data.value));
              props.setShow(false);
              props.updateDeposit(amount); // Update deposit value
              console.log('JSON:', data.value);
          } catch(err) {
              props.setStatus('Deposit failed')
              console.log('err:', text);
          }
        });
      } else {
        props.setStatus('Deposit must be a positive value')
      }
      } catch (err) {
        props.setStatus('error');
        console.log('err:', text);
      }
    
    });
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}