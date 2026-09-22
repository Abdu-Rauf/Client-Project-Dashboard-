import "dotenv/config";
import express from "express";
import loginController from "./controllers/loginController";
import registerController from "./controllers/registerController";
import clientController from "./controllers/clientController";

const app = express();
app.use(express.json());

app.post("/auth/login", loginController);
app.post("/auth/register", registerController);
app.post("/admin/create_client",clientController);

app.listen(3000);