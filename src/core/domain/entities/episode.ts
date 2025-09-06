import { Info } from "./info";

export interface Episodes {
  idFront: number;
  nameFront: string;
  air_dateFront: string;
  episodeFront: string;
}

export interface EpisodesList {
  infoFront: Info;
  resultsFront: Episodes[];
}
