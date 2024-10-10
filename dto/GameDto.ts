import { TeamType } from "../types/TeamType";

export interface GameDto {
  id: number,
  teamCompetingHome: {id: number, team: TeamType},
  teamCompetingVisitor: {id: number, team: TeamType},
  scoreHome: number,
  scoreVisitor: number
}