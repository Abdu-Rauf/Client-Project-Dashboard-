import { TaskStatusBody } from "../schema/taskStatus";
import { prisma } from "../utils/prisma";

export default async function taskStatusService(task: TaskStatusBody, developerId: number) {
    try {
        const updatedTask = await prisma.tasks.updateMany({
            where: {
                id: task.task_id,
                assigned_developer_id: developerId,
            },
            data: {
                status: task.status,
            },
        });

        if (updatedTask.count === 0) {
            return {
                success: false,
                message: "Task was not found or is not assigned to this developer",
            };
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Could not update task status";
        return { success: false, message };
    }

    return {
        success: true,
        message: "Task status updated",
    };
}