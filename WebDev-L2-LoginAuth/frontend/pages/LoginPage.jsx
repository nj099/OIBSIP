import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../src/App.css";


function Login({ onLogin }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!email || !password){
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    try{
      const res = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({email,password})
      });
      const data=await res.json();
      console.log(data);

      if(!res.ok){
        throw new Error(data.message || "Login failed. Please try again.");
      }

if (!data.token) {
  throw new Error("Login succeeded but no token was received.");
}

localStorage.setItem("auth_token", data.token);
onLogin(data.token);

navigate("/dashboard", { replace: true });
    }
    catch(err){
      setError(err.message);
    }
  }


  return (
    <main className="login-page">
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input className="login-input email" type="text" placeholder="Username/Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="login-input password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="login-button" type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p style={{color: 'red'}} className="error">{error}</p>
    </div>
    </main>
  );
}

export default Login;