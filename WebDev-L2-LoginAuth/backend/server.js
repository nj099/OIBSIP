import express from "express";
import Cors from "cors";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const users = path.join(__dirname, "users.json");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; 
console.log("Users file path:", users);

const app = express();
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}


app.use(express.json());
app.use(Cors({origin: "http://localhost:5173"}));


app.post("/api/auth/register", async (req,res)=>{
    console.log("Received registration data:", req.body);
    const { email, password } = req.body  
      const bcryptPassword = await bcrypt.hash(password, 12);
    const user={email:email,password:bcryptPassword};

fs.readFile(users, "utf8", (err, fileData) => {
  if (err) {
    console.log("Something went wrong:", err);
    return;
  }
    

    const usersData = JSON.parse(fileData);
    const userExists=usersData.find((data)=>data.email===email);
    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }
    usersData.push(user);
    const updatedFileData = JSON.stringify(usersData);

     fs.writeFile(users, updatedFileData, (err) => {
        if (err) {
            console.error("Error writing to users.json:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        console.log("User data saved successfully.");
        res.status(201).json({ message: "User registered successfully" });
    });
});
    
})


app.post("/api/auth/login", async (req, res) => {
  console.log("Login request received");

  const { email, password } = req.body;

  fs.readFile(users, "utf8", async (err, fileData) => {
    if (err) {
      console.error("Error reading users:", err);
      return res.status(500).json({
        message: "Internal server error"
      });
    }

    try {
      const usersData = JSON.parse(fileData);

      const user = usersData.find(
        u => u.email === email
      );
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
      );


      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }

      const token = jwt.sign(
        { email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful",
        token: token
      });

    } catch (error) {
      console.error("Login error:", error.message);

      return res.status(500).json({
        message: "Internal server error"
      });
    }
  });
});


app.get("/",(req,res)=>{
    res.json({message: "Hello, USER!"});
})

app.get("/api/dashboard", requireAuth, (req, res) => {
  res.json({
    message: "Welcome to your dashboard",
    email: req.user.email
  });
});
app.listen(5000,()=>{
    console.log("Server is running on port 5000, http://localhost:5000");
})