import { CharacterList } from "../entities/character";
import { CharacterDetails } from "../entities/characterDetails";

export interface CharacterRepository {
  getCharacters(): Promise<CharacterList>;
  getCharacterById(id: string | number): Promise<CharacterDetails>;
}
