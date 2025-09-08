import { gql } from "@apollo/client";
import { EpisodesDTO } from "../http/dto/eposodesDTO";
import { EpisodesRepository } from "../../core/domain/repository/episodesReository";
import { rickAndMortyClient } from "../http/graphQL/rickAndMortyClient";
import { Episodes } from "../../core/domain/entities/episode";

interface EpisodesQueryVars {
  ids: string[];
}

interface EpisodesQuery {
  episodesByIds: EpisodesDTO[];
}

const GET_EPISODES_QUERY = gql`
  query episodesByIds($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      results {
        id
        name
        air_date
        episode
        character
        created
      }
    }
  }
`;

export class EpisodeGraphQLAdapter implements EpisodesRepository {
  private client = rickAndMortyClient;

  private transformToEpisode(data: EpisodesDTO): Episodes {
    return {
      idFront: data.id,
      nameFront: data.name,
      air_dateFront: data.air_date,
      episodeFront: data.episode,
    };
  }

  async getEpisodes(ids: string[]): Promise<Episodes[]> {
    const res = await this.client.query<EpisodesQuery, EpisodesQueryVars>({
      query: GET_EPISODES_QUERY,
      fetchPolicy: "network-only",
      variables: { ids },
    });

    if (!res.data) {
      throw new Error("No data found");
    }

    const { episodesByIds } = res.data;
    return episodesByIds.map(this.transformToEpisode);
  }
}
