import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Login = () => {

    

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [er,setEr]=useState('');
const navigate = useNavigate();
const handelclick = async() => {
    try {
        const res = await axios.post('http://localhost:5000/login', { email, password });
        if (res.status == 200) {
            navigate('/dashboard', { state: { email: email } });
        }
        console.log(res.data);
        
    }
    catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setEr('User does not exist');
        } else if (status === 401) {
          setEr('Password incorrect');
        } else {
          setEr('Server error');
        }
      } else {
        setEr('Network error');
      }
    }
  };


    return (
        <div>
            <div>
                {er &&<p>{er}</p>}
                <label>email</label><input onChange={(e) => setEmail(e.target.value)} ></input><br />
                <label>password</label><input onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={handelclick}>submit</button>
            </div>
        </div>
    )
}

export default Login
