import "dotenv/config";
import express from "express";
import loginController from "./controllers/loginController";
import registerController from "./controllers/registerController";

const app = express();
app.use(express.json());

app.post("/auth/login", loginController)
app.post("/auth/register", registerController)

app.listen(3000);