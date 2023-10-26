function NavBar() {
  const [user, setUser] = React.useState(null);

  const handleSignOut = () => {
    const auth = firebase.auth();
    auth.signOut().then(() => {
      setUser(null); // Set the user to null after sign out
    });
  };

  React.useEffect(() => {
    const auth = firebase.auth();

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/createaccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>       
        </ul>
      </div>
      <div id="currentlogin">
        {user ? (
          <div>
            <p>Current User: {user.email}</p>
            <button className="btn btn-light" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <div>No user logged in</div>
        )}
      </div>
    </nav>
  );
}
