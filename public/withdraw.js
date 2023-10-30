function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [withdraw, setWithdraw] = React.useState(null); // Initialize withdraw as null

  function updateWithdraw(newWithdraw) {
    setWithdraw(newWithdraw);
  }
  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} updateWithdraw={updateWithdraw} /> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus} withdraw={withdraw} />}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Withdrawal successful:</h5>
      <p>${props.withdraw}</p>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        console.log('JSON:', data.balance);
        if(data.balance < amount && amount > 0){
          fetch(`/account/update/${email}/-${amount}`)
          .then(response => response.text())
          .then(text => {
        try {
            const data = JSON.parse(text);
            console.log(data.value.balance);
            if (data.value.balance < amount){
              props.setStatus('Insufficient balance');
            } else {
              props.setShow(false);
              props.updateWithdraw(amount); // Update withdraw value
            }
            console.log('JSON:', data.value);
        } catch(err) {
            props.setStatus('Withdrawal failed')
            console.log('err:', text);
        }
          });
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
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
