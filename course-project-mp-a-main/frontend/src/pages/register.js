import React , { useState, useEffect }from 'react';
import './RegisterPage.css';
import '../Urls';
const axios = require('axios')

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      localStorage.clear();
      window.location.replace(global.Default + "/login"); 
    } else {
      setLoading(false);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(global.BackendDefault + '/users/register/',{  //fetch backend api to rejster
          username: username,
          password: password,
          password2: password2,
          email: "",
          first_name: '',
          last_name: ""
      }).then(function (res){
          console.log(res)
          localStorage.clear();  //clear localstorage in case jump without login 
          
          window.location.replace(global.Default + "/login"); // jump to login page if register successfully
      }).catch(function (err){
          console.log(err)
          setErrors(true)
          setUsername("")
          setPassword("")
          setPassword2("")
          localStorage.clear();
          setMessage(err.response.status);
          
      })

  };

  return (
    <div>
      {loading === false && <h1>Register</h1>}  
      {errors === true && <><h2>Cannot Register with provided information</h2> <br></br> <p> 
							{message}
						</p></>}  
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label> <br />
        <input
          name='username'
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />{' '}
        <br />
        <label htmlFor='password'>Password:</label> <br /> 
        <input
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />{' '}
        <br />
        <label htmlFor='password2'>Confirm password:</label> <br />
        <input
          name='password2'
          type='password'
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          required
        />{' '}
        <br />
        <input type='submit' value='Register' />
      </form>

      {/* jump buttons */}
      {loading === false &&(
          
          <><br></br><br></br><a href="/login" class='button' style ={{color:'yellow'}}> Login </a></>
  )}   
    </div>

    
  );
};
export default RegisterPage;