import "dotenv/config";
import express from "express";
import loginController from "./controllers/loginController";
import registerController from "./controllers/registerController";
import projectRequestController from "./controllers/projectRequestController";
import teamController from "./controllers/teamController";
import authMiddleware from "./middleware/authMiddleware";

const app = express();
app.use(express.json());
app.use("/admin", authMiddleware);

app.post("/auth/login", loginController);
app.post("/auth/register", registerController);
app.post("/admin/create/project", projectRequestController);
app.post("/admin/create/team", teamController);

app.listen(3000);   