import { infoDTO } from "./infoDTO";

export interface CharacterDTO {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    id: number;
    name: string;
    url?: string;
  };
  location: {
    id: number;
    name: string;
    url?: string;
  };
  image: string;
  episode: { id: string }[];
  url?: string;
  created: string;
}

export interface CharacterResponseDTO {
  info: infoDTO;
  results: CharacterDTO[];
}
