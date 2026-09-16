import express from "express";
const app = express();


const users  = [
    {
        email:"aamir@gmail.com",
        pwd: "yea right"
    },
    {
        email:"abswoof@gmail.com",
        pwd: "no mate"
    }
]
app.get("/users",(req,res)=>{
    res.json(users);
})

app.use(express.json());

app.post("/auth/login", (req, res) => {
    // extract email and pwd
    const { email, pwd } = req.body;
    // check if user exists
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }   
    // check if pwd is correct
    if (user.pwd !== pwd) {
        return res.status(400).json({ message: "wrong password" });
    }
    return res.status(200).json({ message: "success" });
});

app.listen(3000);