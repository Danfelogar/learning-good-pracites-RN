import { CharacterList } from "../entities/character";
import { CharacterDetails } from "../entities/characterDetails";

export interface GetCharacterParams {
  species?: string;
  gender?: string;
  status?: string;
  name?: string;
  page?: number;
}

export interface CharacterRepository {
  getCharacters(params?: GetCharacterParams): Promise<CharacterList>;
  getCharacterById(id: string | number): Promise<CharacterDetails>;
}
