import { infoDTO } from "./infoDTO";

export interface EpisodesDTO {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  character: string[];
  url: string;
  created: string;
}

export interface EpisodesResultsDTO {
  info: infoDTO;
  results: EpisodesDTO[];
}
