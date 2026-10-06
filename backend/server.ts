import "dotenv/config";
import express from "express";
import loginController from "./controllers/loginController";
import registerController from "./controllers/registerController";
import projectRequestController from "./controllers/projectRequestController";
import teamController from "./controllers/teamController";
import authMiddleware from "./middleware/authMiddleware";
import roleMiddleware from "./middleware/roleMiddleware";
import projectController from "./controllers/projectController"

const app = express();
app.use(express.json());
app.use("/admin", authMiddleware, roleMiddleware("admin"));

app.post("/auth/login", loginController);
app.post("/auth/register", registerController);
app.post("/admin/create/project_request", projectRequestController);
app.post("/admin/create/team", teamController);

app.post("/pm/create/project", projectController);

app.listen(3000);   