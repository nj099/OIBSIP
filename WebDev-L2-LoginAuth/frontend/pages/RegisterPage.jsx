
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../src/App.css";
function Register() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    if(!email || !password){
      setError("Please fill in all fields.");
      return;
    }
    if(password.length<8){
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!/\d/.test(password)) {
  setError("Password must contain at least one number.");
  return;
}
    setError("");

    try{
      const res = await fetch("http://localhost:5000/api/auth/register",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({email,password})
      });
      const data=await res.json();
      console.log(data);

      if(!res.ok){
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      navigate("/login", { replace: true });
    }
    catch(err){
      setError(err.message);
    }
    

    
  }


  return (
    <main className="register-page">
    <div>
      <h1>Register</h1>

        <form className="register-form" onSubmit={handleSubmit}>
        <input className="register-input email" onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Username/Email" value={email}/>
        <input className="register-input password" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" value={password} />
        <button className="register-button" type="submit">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}

    </div>
    </main>
  );
}

export default Register;