import "dotenv/config";
import express from "express";
import loginController from "./controllers/auth/loginController";
import registerController from "./controllers/auth/registerController";
import projectRequestController from "./controllers/projectRequestController";
import teamController from "./controllers/teamController";
import authMiddleware from "./middleware/authMiddleware";
import roleMiddleware from "./middleware/roleMiddleware";
import projectController from "./controllers/projectController"
import createTaskController from "./controllers/createTaskController";
import taskStatusController from "./controllers/taskStatusController";

const app = express();
app.use(express.json());
app.use("/admin", authMiddleware, roleMiddleware("admin"));
app.use("/pm", authMiddleware, roleMiddleware("project_manager"));

app.post("/auth/login", loginController);
app.post("/auth/register", registerController);

app.post("/admin/create/project_request", projectRequestController);
app.post("/admin/create/team", teamController);

// app.post("/pm/projects",projectController);
// app.post("/pm/projects/create_project, createProjectController");
// app.post("/pm/projects/assign_tasks",taskController);
app.post("/pm/create/project", projectController);
app.post("/pm/create/tasks", createTaskController);

app.use("/dev",authMiddleware, roleMiddleware("developer"));
app.post("/dev/tasks", taskStatusController);

app.listen(3000);   