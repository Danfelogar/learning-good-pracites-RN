import { CharacterList } from "../domain/entities/character";
import { CharacterDetails } from "../domain/entities/characterDetails";
import { CharacterRepository } from "../domain/repository/characterRepository";

export class CharacterUseCase implements CharacterRepository {
  constructor(private characterRepository: CharacterRepository) {}

  async getCharacterById(id: number): Promise<CharacterDetails> {
    try {
      return await this.characterRepository.getCharacterById(id);
    } catch (error) {
      throw new Error("Error fetching character");
    }
  }

  async getCharacters(): Promise<CharacterList> {
    try {
      return await this.characterRepository.getCharacters();
    } catch (error) {
      throw new Error("Error fetching characters");
    }
  }
}
