import { Episodes, EpisodesList } from "../domain/entities/episode";
import { EpisodesRepository } from "../domain/repository/episodesReository";

export class EpisodeUseCase implements EpisodesRepository {
  constructor(private episodesRepository: EpisodesRepository) {}

  async getEpisodes(): Promise<EpisodesList> {
    try {
      return await this.episodesRepository.getEpisodes();
    } catch (error) {
      throw new Error("Error fetching episodes");
    }
  }

  async getSingleEpisode(id: string | number): Promise<Episodes> {
    try {
      return await this.episodesRepository.getSingleEpisode(id);
    } catch (error) {
      throw new Error("Error fetching episode");
    }
  }
}
