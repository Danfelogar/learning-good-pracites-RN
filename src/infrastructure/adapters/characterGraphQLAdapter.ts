import { gql } from "@apollo/client";
import {
  CharacterRepository,
  GetCharacterParams,
} from "../../core/domain/repository/characterRepository";
import { rickAndMortyClient } from "../http/graphQL/rickAndMortyClient";
import { CharacterDTO, CharacterResponseDTO } from "../http/dto/chatacterDTO";
import { CharacterList } from "../../core/domain/entities/character";
import { CharacterDetails } from "../../core/domain/entities/characterDetails";

interface CharactersQueryVars extends GetCharacterParams {}

interface CharacterQuery {
  characters: CharacterResponseDTO;
}

const GET_CHARACTERS_QUERY = gql`
  query characters(
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

interface CharacterByIdQueryVars {
  id: string | number;
}

interface CharacterByIdQuery {
  character: CharacterDTO;
}

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
      episode {
        id
      }
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
  private static instance: CharacterGraphQLAdapter;
  private client = rickAndMortyClient;
  private abortController: AbortController | null = null;

  // Constructor private for singleton pattern
  private constructor() {}

  // Method to get the singleton instance
  public static getInstance(): CharacterGraphQLAdapter {
    if (!CharacterGraphQLAdapter.instance) {
      CharacterGraphQLAdapter.instance = new CharacterGraphQLAdapter();
    }
    return CharacterGraphQLAdapter.instance;
  }

  private transformToCharacterList(data: CharacterQuery): CharacterList {
    return {
      infoFront: {
        countFront: data.characters.info.count,
        pagesFront: data.characters.info.pages,
        nextFront: data.characters.info.next,
        prevFront: data.characters.info.prev,
      },
      resultsFront: data.characters.results.map((character) => ({
        idFront: character.id,
        nameFront: character.name,
        speciesFront: character.species,
        imageFront: character.image,
      })),
    };
  }

  // Method to cancel ongoing requests
  cancelPendingRequests(): void {
    if (this.abortController) {
      console.log("🔴 Canceling active GraphQL request");
      this.abortController.abort();
      this.abortController = null;
    }
  }

  async getCharacters(params?: GetCharacterParams): Promise<CharacterList> {
    this.cancelPendingRequests();

    const variables: CharactersQueryVars = {
      page: params?.page ? parseInt(String(params.page), 10) : 1,
    };

    if (params?.name && params.name.trim().length > 0) {
      variables.name = params.name.trim();
    }
    if (params?.status && params.status.trim().length > 0) {
      variables.status = params.status.trim();
    }
    if (params?.species && params.species.trim().length > 0) {
      variables.species = params.species.trim();
    }
    if (params?.gender && params.gender.trim().length > 0) {
      variables.gender = params.gender.trim();
    }

    this.abortController = new AbortController();

    try {
      const result = await this.client.query<
        CharacterQuery,
        CharactersQueryVars
      >({
        query: GET_CHARACTERS_QUERY,
        fetchPolicy: "network-only",
        variables: variables,
        context: {
          //for cancel current request
          fetchOptions: {
            signal: this.abortController.signal,
          },
        },
      });

      if (!result.data) {
        throw new Error("No data");
      }

      console.log(
        `✅ Request completed with: "${variables.name || "without name"}"`
      );
      return this.transformToCharacterList(result.data);
    } catch (error: any) {
      // Verify if the error is due to an intentional abort
      if (error.name === "AbortError") {
        console.log("🟡 Request intentionally canceled");
        throw new Error("SearchCancelled");
      }

      console.error("❌ Error in GraphQL request:", error);
      throw error;
    } finally {
      this.abortController = null;
    }
  }

  private transformToCharacterDetails(
    data: CharacterByIdQuery
  ): CharacterDetails {
    return {
      idFront: data.character.id,
      nameFront: data.character.name,
      speciesFront: data.character.species,
      imageFront: data.character.image,
      statusFront: data.character.status,
      typeFront: data.character.type,
      genderFront: data.character.gender,
      originFront: {
        idFront: data.character.origin.id,
        nameFront: data.character.origin.name,
      },
      locationFront: {
        idFront: data.character.location.id,
        nameFront: data.character.location.name,
      },
      episodeFront: data.character.episode.map((ep) => ep.id),
    };
  }

  async getCharacterById(id: string | number): Promise<CharacterDetails> {
    const result = await this.client.query<
      CharacterByIdQuery,
      CharacterByIdQueryVars
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
