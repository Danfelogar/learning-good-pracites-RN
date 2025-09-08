import { Episodes } from "../entities/episode";

export interface EpisodesRepository {
  getEpisodes(ids: number[]): Promise<Episodes[]>;
}
