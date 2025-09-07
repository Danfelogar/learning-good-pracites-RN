import { gql } from "@apollo/client";
import {
  CharacterRepository,
  GetCharacterParams,
} from "../../core/domain/repository/characterRepository";
import { rickAndMortyClient } from "../http/graphQL/rickAndMortyClient";
import { CharacterDTO, CharacterResponseDTO } from "../http/dto/chatacterDTO";
import { CharacterList } from "../../core/domain/entities/character";
import { CharacterDetails } from "../../core/domain/entities/characterDetails";

interface CharactersMutationVars extends GetCharacterParams {}

interface CharacterMutation extends CharacterResponseDTO {}

const GET_CHARACTERS_QUERY = gql`
  mutation characters(
    $page: Int
    $name: String
    $status: String
    $species: String
    $type: String
    $gender: String
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        status: $status
        species: $species
        type: $type
        gender: $gender
      }
    ) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        species
        type
        image
      }
    }
  }
`;

interface CharacterByIdMutationVars {
  id: string | number;
}

interface CharacterByIdMutation extends CharacterDTO {}

const GET_CHARACTER_BY_ID_QUERY = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      created
      origin {
        id
        name
      }
      location {
        id
        name
      }
    }
  }
`;

export class CharacterGraphQLAdapter implements CharacterRepository {
  private client = rickAndMortyClient;

  private transformToCharacterList(data: CharacterResponseDTO): CharacterList {
    return {
      infoFront: {
        countFront: data.info.count,
        pagesFront: data.info.pages,
        nextFront: data.info.next,
        prevFront: data.info.prev,
      },
      resultsFront: data.results.map((character) => ({
        idFront: character.id,
        nameFront: character.name,
        speciesFront: character.species,
        imageFront: character.image,
      })),
    };
  }

  async getCharacters(params?: GetCharacterParams): Promise<CharacterList> {
    const result = await this.client.mutate<
      CharacterMutation,
      CharactersMutationVars
    >({
      mutation: GET_CHARACTERS_QUERY,
      fetchPolicy: "network-only",
      variables: {
        page: params?.page,
        name: params?.name,
        status: params?.status,
        species: params?.species,
      },
    });

    if (!result.data) {
      throw new Error("No data");
    }

    const { info, results } = result.data;
    return this.transformToCharacterList({ info, results });
  }

  private transformToCharacterDetails(data: CharacterDTO): CharacterDetails {
    return {
      idFront: data.id,
      nameFront: data.name,
      speciesFront: data.species,
      imageFront: data.image,
      statusFront: data.status,
      typeFront: data.type,
      genderFront: data.gender,
      originFront: {
        idFront: data.origin.id,
        nameFront: data.origin.name,
      },
      locationFront: {
        idFront: data.location.id,
        nameFront: data.location.name,
      },
      episodeFront: data.episode,
    };
  }

  async getCharacterById(id: string | number): Promise<CharacterDetails> {
    const result = await this.client.query<
      CharacterByIdMutation,
      CharacterByIdMutationVars
    >({
      query: GET_CHARACTER_BY_ID_QUERY,
      fetchPolicy: "network-only",
      variables: { id },
    });

    if (!result.data) {
      throw new Error("No data");
    }

    return this.transformToCharacterDetails(result.data);
  }
}
