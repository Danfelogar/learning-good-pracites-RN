import { gql } from "@apollo/client";
import { EpisodesDTO, EpisodesResultsDTO } from "../http/dto/eposodesDTO";
import { EpisodesRepository } from "../../core/domain/repository/episodesReository";
import { rickAndMortyClient } from "../http/graphQL/rickAndMortyClient";
import { Episodes } from "../../core/domain/entities/episode";

interface EpisodesMutationVars {
  ids: string[];
}

interface EpisodesMutation extends EpisodesResultsDTO {}

const GET_EPISODES_QUERY = gql`
  mutation episodesByIds($ids: [ID!]!) {
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
    const res = await this.client.mutate<
      EpisodesMutation,
      EpisodesMutationVars
    >({
      mutation: GET_EPISODES_QUERY,
      fetchPolicy: "network-only",
      variables: { ids },
    });

    if (!res.data) {
      throw new Error("No data found");
    }

    const { results } = res.data;

    return results.map(this.transformToEpisode);
  }
}
