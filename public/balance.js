function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState(null); // Initialize balance as null

  function updateBalance(newBalance) {
    setBalance(newBalance);
  }

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} updateBalance={updateBalance} /> :
        <BalanceMsg setShow={setShow} setStatus={setStatus} balance={balance} />}
    />
  );
}


function BalanceMsg(props) {
  return (
    <>
      <h5>Balance retrieved:</h5>
      <p>${props.balance}</p>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');

  function handle() {
    fetch(`/account/findOne/${email}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setShow(false);
          props.updateBalance(data.balance); // Update balance with the fetched data
          console.log('JSON:', data.balance);
        } catch (err) {
          props.setStatus('error');
          console.log('err:', text);
        }
      });
  }

  return (
    <>
      Email<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
      /><br />

      <button type="submit" className="btn btn-light" onClick={handle}>
        Check Balance
      </button>
    </>
  );
}