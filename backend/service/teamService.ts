import { CreateTeamBody } from "../schema/team";
import { prisma } from "../utils/prisma";


export default async function teamService(teamBody: CreateTeamBody) {

    //ensure there are no repeating developer ids
    const developerIds = [...new Set(teamBody.developer_ids)];
    
    try {

        await prisma.$transaction(async (tx)=>{
            // Verify the pm id sent is a project manager
            const pm = await tx.user.findFirst({
                where : {id:teamBody.assigned_pm_id, role:"project_manager"}
                
            });
            if(!pm){
                throw new Error("Team lead must be a manager")
            }
            // assign new manager ids to all devs in developerids with managerid as null
            const assigned = await tx.user.updateMany({
                where: {
                    id:{in:developerIds},
                    role:"developer",
                    manager_id:null
                },
                data:{
                    manager_id:pm.id
                }
            });
            // verify if all the devs id were updated
            if (assigned.count !== developerIds.length){
                throw new Error("Every member must be an unassigned developer")
            }
        });
        
    } catch (error) {
        // runtime check to ensure that error is of type Error or it's subclass to ensure error.message is valid.
        // instanceof asks the js engine wether this object was created as an Error or subclass of Error.
        const message =
            error instanceof Error ? error.message : "Team could not be created";
        return { success: false, message };
    };

    return {
        success: true,
        message: "Team created",
    };
    // refactor required for team switch.
}
