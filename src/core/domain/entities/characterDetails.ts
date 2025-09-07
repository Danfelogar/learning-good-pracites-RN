import { Character } from "./character";

export interface CharacterDetails extends Character {
  statusFront: string;
  typeFront: string;
  genderFront: string;
  speciesFront: string;
  originFront: {
    idFront: number;
    nameFront: string;
    urlFront?: string;
  };
  locationFront: {
    idFront: number;
    nameFront: string;
    urlFront?: string;
  };
  episodeFront: string[];
}
