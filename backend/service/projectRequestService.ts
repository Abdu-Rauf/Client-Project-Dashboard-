import { ProjectReqBody } from "../schema/projectReq";
import { ProjectRequest } from "../types/projectRequest";

// mock project request store (later: db)
const projectRequests: ProjectRequest[] = [];

export default function projectRequestService(projectBody: ProjectReqBody) {
    // pmid is the fk for project desc ( relationship: one to many (pm-pdesc))
    const newRequest: ProjectRequest = {
        id: projectRequests.length + 1,
        title: projectBody.title,
        description: projectBody.description,
        pmid: projectBody.pm_id
    };
    projectRequests.push(newRequest);
    console.log(projectRequests);

    return {
        success: true,
        message: "Project request created",
        projectRequest: newRequest
    };
}
