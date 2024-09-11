import { TeamType } from "../types/TeamType";

export interface GameDto {
  id: number,
  teamHome: {id: number, team: TeamType},
  teamVisitor: {id: number, team: TeamType},
  scoreHome: number,
  scoreVisitor: number
}