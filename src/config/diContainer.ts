import { CharacterUseCase } from "../core/application/characterUseCase";
import { EpisodeUseCase } from "../core/application/episodeUseCase";
import { CharacterGraphQLAdapter } from "../infrastructure/adapters/characterGraphQLAdapter";
import { EpisodeGraphQLAdapter } from "../infrastructure/adapters/episodeGraphQLAdapter";
import { enumDI } from "../shared/constants/enumDI";

class DIcontainer {
  private instances: Map<string, any> = new Map();

  register<T>(key: string, instance: T): void {
    this.instances.set(key, instance);
  }

  resolve<T>(key: string): T {
    const instance = this.instances.get(key);
    if (!instance) throw new Error(`No instance found for key: ${key}`);
    return instance as T;
  }
}

export const container = new DIcontainer();

//config dependencies of character
const characterAdapter = new CharacterGraphQLAdapter();
const characterUseCases = new CharacterUseCase(characterAdapter);
container.register(enumDI.CharacterUseCase, characterUseCases);

//config dependencies of episodes
const episodeAdapter = new EpisodeGraphQLAdapter();
const episodeUseCase = new EpisodeUseCase(episodeAdapter);
container.register(enumDI.EpisodeUseCase, episodeUseCase);
