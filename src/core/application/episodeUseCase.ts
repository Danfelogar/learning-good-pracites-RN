import { Episodes } from "./../domain/entities/episode";
import { EpisodesRepository } from "../domain/repository/episodesReository";

export class EpisodeUseCase implements EpisodesRepository {
  constructor(private episodesRepository: EpisodesRepository) {}

  async getEpisodes(ids: number[]): Promise<Episodes[]> {
    try {
      return await this.episodesRepository.getEpisodes(ids);
    } catch (error) {
      console.log({ error });
      throw new Error("Error fetching episodes");
    }
  }
}
