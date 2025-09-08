import { gql } from "@apollo/client";
import { EpisodesDTO } from "../http/dto/eposodesDTO";
import { EpisodesRepository } from "../../core/domain/repository/episodesReository";
import { rickAndMortyClient } from "../http/graphQL/rickAndMortyClient";
import { Episodes } from "../../core/domain/entities/episode";

interface EpisodesQueryVars {
  ids: number[];
}

interface EpisodesQuery {
  episodesByIds: EpisodesDTO[];
}

const GET_EPISODES_QUERY = gql`
  query GetEpisodesByIds($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      id
      name
      episode
      air_date
    }
  }
`;

export class EpisodeGraphQLAdapter implements EpisodesRepository {
  private client = rickAndMortyClient;

  private chunkArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  private transformToEpisode(data: EpisodesDTO): Episodes {
    return {
      idFront: data.id,
      nameFront: data.name,
      air_dateFront: data.air_date,
      episodeFront: data.episode,
    };
  }

  async getEpisodes(ids: number[]): Promise<Episodes[]> {
    const validIds = ids.filter((id) => id && id > 0);

    if (validIds.length === 0) {
      console.warn("⚠️ No valid IDs provided");
      return [];
    }

    const chunks = this.chunkArray(validIds, 20);

    const allResults: Episodes[] = [];

    for (const chunk of chunks) {
      console.log("📦 Fetching chunk:", chunk);

      const res = await this.client.query<EpisodesQuery, EpisodesQueryVars>({
        query: GET_EPISODES_QUERY,
        fetchPolicy: "network-only",
        variables: { ids: chunk },
      });

      if (res.data?.episodesByIds) {
        const episodes = res.data.episodesByIds.map(this.transformToEpisode);
        allResults.push(...episodes);
      }
    }

    if (!allResults.length) {
      throw new Error("No data found");
    }

    console.log({ allResults });
    return allResults;
  }
}
