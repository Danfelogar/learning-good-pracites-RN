import { Info } from "./info";

export interface Character {
  idFront: number;
  nameFront: string;
  speciesFront: string;
  imageFront: string;
}

export interface CharacterList {
  infoFront: Info;
  resultsFront: Character[];
}
