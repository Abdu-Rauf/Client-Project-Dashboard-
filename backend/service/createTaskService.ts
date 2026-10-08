import { TaskBody } from "../schema/tasks";
import { prisma } from "../utils/prisma";

export default async function createTaskService(task:TaskBody, pmId:number){
    
    try {
        await prisma.$transaction(async (tx)=>{

            // verify project belongs to the pm creating task
            const project = await tx.project.findFirst({
                where:{
                    id:task.project_id,
                    assigned_pm_id:pmId
                }
            })
            if(!project){
                throw new Error("Project does not belong to the user.")
            }
            // verify dev is in pm's team and is a part of the project
            const dev = await tx.user.findFirst({
                where:{
                    id: task.assigned_developer_id,
                    role: "developer",
                    manager_id:pmId,
                    project_id:task.project_id
                }
            })
            if(!dev){
                throw new Error("Dev selected is not part of the project")
            }
            // create the new task
            await tx.tasks.create({
                data:{
                    project_id:task.project_id,
                    title:task.title,
                    description:task.description,
                    assigned_developer_id:task.assigned_developer_id,
                    deadline:task.deadline,
                    priority:task.priority
                }
            });
        })
    } catch (error) {
        const message = error instanceof Error? error.message:"Can not assign the task"
        return {success:false, message};
    }

    return {
        success:true,
        message:"Task has been assigned"
    }
}