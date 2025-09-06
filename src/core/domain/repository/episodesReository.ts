import { EpisodesList, Episodes } from "../entities/episode";

export interface EpisodesRepository {
  getEpisodes(): Promise<EpisodesList>;
  getSingleEpisode(id: string | number): Promise<Episodes>;
}
