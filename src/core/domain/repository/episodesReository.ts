import { Episodes } from "../entities/episode";

export interface EpisodesRepository {
  getEpisodes(ids: string[]): Promise<Episodes[]>;
}
