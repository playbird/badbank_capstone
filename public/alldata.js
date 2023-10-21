function AllData(){
    const [data, setData] = React.useState(''); 
    const [current, setCurrent] = React.useState('');   

    React.useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                // console.log(data[7].loggedIn);
                // setCurrent(JSON.stringify(data[7].loggedIn));
                setData(JSON.stringify(data));                
            });

    }, []);

    return (<>
        <h5>All Data in Store:</h5>
        {data}<br></br><br></br>
        {current}

    </>);
}
