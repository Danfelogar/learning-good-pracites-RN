import { create } from "zustand";
import { CharactersState, CharactersWithoutActions } from "./characters";
import { container } from "../../../config/diContainer";
import { CharacterUseCase } from "../../../core/application/characterUseCase";
import { EpisodeUseCase } from "../../../core/application/episodeUseCase";
import { enumDI } from "../../../shared/constants/enumDI";
import { CharacterGraphQLAdapter } from "../../adapters/characterGraphQLAdapter";
import { ReactiveSearchService } from "../../http/rxjs/reactiveSearchService";

const INITIAL_INFO_DATA = {
  count: 0,
  pages: 0,
  currentPage: 1,
};

const INITIAL_STATE: Omit<CharactersWithoutActions, "reactiveSearchService"> = {
  speciesSelected: "",
  statusSelected: "",
  genderSelected: "",
  nameFiltered: "",
  singleCharacter: null,
  episodesByCharacter: null,
  infoData: INITIAL_INFO_DATA,
  isLoading: false,
  isFirstRenderOnHome: true,
  characters: [],
};

export const useCharactersState = create<CharactersState>((set, get) => {
  const reactiveSearchService = new ReactiveSearchService();
  return {
    ...INITIAL_STATE,
    reactiveSearchService,
    //actions
    changeSpeciesSelected: (species) => {
      set({ speciesSelected: species });
    },
    changeStatusSelected: (status) => {
      set({ statusSelected: status });
    },
    changeGenderSelected: (gender) => {
      set({ genderSelected: gender });
    },
    changeNameFiltered: (name) => {
      set({ nameFiltered: name });
    },
    changeInfoData: ({ count, currentPage, pages }) => {
      if (!count && !currentPage && !pages) {
        set({ infoData: INITIAL_INFO_DATA });
      } else {
        set((oldState) => ({
          infoData: {
            ...oldState.infoData,
            count: count ?? oldState.infoData.count,
            currentPage: currentPage ?? oldState.infoData.currentPage,
            pages: pages ?? oldState.infoData.pages,
          },
        }));
      }
    },
    changeLoading: () => {
      set((oldState) => ({
        isLoading: !oldState.isLoading,
      }));
    },
    changeFirstRenderOnHome: (val: boolean = true) => {
      set({
        isFirstRenderOnHome: val,
      });
    },
    resetSingleCharacter: () => {
      set({ singleCharacter: null, episodesByCharacter: null });
    },
    getCharacterById: async (id) => {
      const currentState = get();
      const { changeLoading } = currentState;
      const characterUseCases = container.resolve(
        enumDI.CharacterUseCase
      ) as CharacterUseCase;

      changeLoading();
      try {
        const result = await characterUseCases.getCharacterById(id);
        set({
          singleCharacter: result,
        });
      } catch (e) {
        console.error(e);
        set({
          singleCharacter: null,
        });
      } finally {
        changeLoading();
      }
    },
    getEpisodesByCharacter: async (ids: string[]) => {
      const currentState = get();
      const { changeLoading } = currentState;
      const episodeUseCases = container.resolve(
        enumDI.EpisodeUseCase
      ) as EpisodeUseCase;

      changeLoading();
      try {
        const result = await episodeUseCases.getEpisodes(
          ids.map((id) => Number(id))
        );
        set({
          episodesByCharacter: result,
        });
      } catch (e) {
        console.error(e);
        set({
          episodesByCharacter: null,
        });
      } finally {
        changeLoading();
      }
    },
    getCharacters: async ({ nextPage = "1" }: { nextPage?: string }) => {
      const currentState = get();
      const {
        changeLoading,
        changeInfoData,
        changeFirstRenderOnHome,
        speciesSelected,
        genderSelected,
        statusSelected,
        nameFiltered,
        isFirstRenderOnHome,
      } = currentState;
      changeLoading();
      try {
        const characterUseCases = container.resolve(
          enumDI.CharacterUseCase
        ) as CharacterUseCase;

        const params = {
          species: speciesSelected,
          gender: genderSelected,
          status: statusSelected,
          page: nextPage,
          name: nameFiltered,
        };

        const result = await characterUseCases.getCharacters(params);
        const { infoFront, resultsFront } = result;
        set((oldState) => ({
          characters:
            nextPage === "1"
              ? resultsFront
              : [...oldState.characters, ...resultsFront],
          infoData: {
            count: infoFront.countFront,
            pages: infoFront.pagesFront,
            currentPage: Number(nextPage),
          },
        }));
        if (isFirstRenderOnHome) changeFirstRenderOnHome(false);
      } catch (e) {
        console.error(e);
        set({
          characters: [],
        });
        changeInfoData({});
      } finally {
        changeLoading();
      }
    },
    cleanupSearch: () => {
      const { reactiveSearchService } = get();
      reactiveSearchService.destroy();

      // Create new service with new adapter
      const newReactiveSearchService = new ReactiveSearchService();

      set({ reactiveSearchService: newReactiveSearchService });
    },
    setCharactersAndInfo: (characters, infoData) => {
      set({
        characters,
        infoData,
      });
    },
  };
});
