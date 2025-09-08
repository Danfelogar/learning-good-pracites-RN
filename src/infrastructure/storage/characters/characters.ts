import { Character } from "../../../core/domain/entities/character";
import { CharacterDetails } from "../../../core/domain/entities/characterDetails";
import { Episodes } from "../../../core/domain/entities/episode";
import { ReactiveSearchService } from "../../http/rxjs/reactiveSearchService";

export interface CharactersState {
  //state
  reactiveSearchService: ReactiveSearchService;
  isFirstRenderOnHome: boolean;
  speciesSelected: string;
  statusSelected: string;
  genderSelected: string;
  nameFiltered: string;
  characters: Character[];
  singleCharacter: CharacterDetails | null;
  episodesByCharacter: Episodes[] | null;
  infoData: {
    count: number;
    pages: number;
    currentPage: number;
  };
  isLoading: boolean;
  //action
  changeSpeciesSelected: (species: string) => void;
  changeStatusSelected: (status: string) => void;
  changeGenderSelected: (gender: string) => void;
  changeNameFiltered: (name: string) => void;
  getCharacters: ({ nextPage }: { nextPage?: string }) => void;
  getCharacterById: (id: string) => void;
  getEpisodesByCharacter: (ids: string[]) => void;
  resetSingleCharacter: () => void;
  changeInfoData: ({
    count,
    currentPage,
    pages,
  }: {
    count?: number;
    pages?: number;
    currentPage?: number;
  }) => void;
  changeLoading: () => void;
  changeFirstRenderOnHome: (isFirstRender?: boolean) => void;
  cleanupSearch: () => void;
  setCharactersAndInfo: (
    characters: Character[],
    infoData: {
      count: number;
      pages: number;
      currentPage: number;
    }
  ) => void;
}

export interface CharactersWithoutActions
  extends Omit<
    CharactersState,
    | "changeFirstRenderOnHome"
    | "changeSpeciesSelected"
    | "changeStatusSelected"
    | "changeGenderSelected"
    | "getEpisodesByCharacter"
    | "resetSingleCharacter"
    | "changeNameFiltered"
    | "getCharacterById"
    | "changeInfoData"
    | "getCharacters"
    | "changeLoading"
    | "cleanupSearch"
    | "setCharactersAndInfo"
  > {}
