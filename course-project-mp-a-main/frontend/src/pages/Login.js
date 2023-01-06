import React , { useState, useEffect }from 'react';
import "../Urls"

const axios = require('axios')
const LoginPage= () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (localStorage.getItem("token") !== null) {
        window.location.replace(global.Default + "/personal");
      } else {
        setLoading(false);
      }
    }, []);
  

    const onSubmit = (e) => {
      e.preventDefault();

      axios.post('http://localhost:8000/api/token/',{  //api used for login 
          username: username,
          password: password,
      }).then(function (res){
          console.log(res)
          localStorage.clear();
          localStorage.setItem('token', res.token);
          // localStorage.setItem('user', res.config.data);
          // alert(username)
          window.location.replace( global.Default + "/login/" + username);
      }).catch(function (err){
          console.log(err)
          setErrors(true)
          setMessage(err.message)
          localStorage.clear();
          
      })
  
    };

    return (
      <div>
        {loading === false && <h1>Login</h1>}
        {errors === true && <h2>Incorrect username or password</h2>  }
        {loading === false && (
          <form onSubmit={onSubmit}>
            <label htmlFor="username">username :</label> <br />
            <input
              name="username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="password">Password:</label> <br />
            <input
              name="password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <input type="submit" value="Login" />
          </form>

          
        )}
        {loading === false &&(
          
        <><br></br><br></br><a href="/register" class='button' style ={{color:'yellow'}}> New user? Register </a></>
)}

      </div>
      
    );
  };
  
  export default LoginPage;