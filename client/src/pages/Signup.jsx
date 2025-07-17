import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Signup = () => {

    
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [er,setEr]=useState('');
const navigate = useNavigate();
const handelclick = async() => {
    try {
        const res = await axios.post('http://localhost:5000/register', { name, email, password });
        if (res.status == 200) {
            navigate('/dashboard', { state: { email: email } });
        }
        console.log(res.data);
        
    }
    catch (error) {
        if(error.response&& error.response.status==400){
            setEr('user already exist');
        }
        else{
            setEr('server error');
        }
    }
}

    return (
        <div>
            <div>
                {er &&<p>{er}</p>}
                <label>name</label><input onChange={(e) => setName(e.target.value)}></input><br />
                <label>email</label><input onChange={(e) => setEmail(e.target.value)} ></input><br />
                <label>password</label><input onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={handelclick}>submit</button>
            </div>
        </div>
    )
}

export default Signup
