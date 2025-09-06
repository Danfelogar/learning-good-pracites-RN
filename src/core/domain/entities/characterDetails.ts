import { Character } from "./character";

export interface CharacterDetails extends Character {
  statusFront: string;
  typeFront: string;
  genderFront: string;
  speciesFront: string;
  originFront: {
    nameFront: string;
    urlFront: string;
  };
  locationFront: {
    nameFront: string;
    urlFront: string;
  };
  episodeFront: string[];
}
