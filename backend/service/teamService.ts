import { CreateTeamBody } from "../schema/team";

// ezz merge types to form new type
type Team = CreateTeamBody & { id: number };

// mock team store (later: db)
const teams: Team[] = [];

export default function teamService(teamBody: CreateTeamBody) {
    const newTeam: Team = {
        id: teams.length + 1,
        pm_id: teamBody.pm_id,
        developer_ids: teamBody.developer_ids,
    };
    teams.push(newTeam);
    console.log(teams);

    return {
        success: true,
        message: "Team created",
        team: newTeam,
    };
}
