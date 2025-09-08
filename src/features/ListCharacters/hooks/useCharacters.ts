import { useEffect } from "react";
import { useCharactersState } from "../../../infrastructure/storage/characters/charactersStore";

interface Props {
  callerFirstGetCharacters?: boolean;
}

export const useCharacters = ({ callerFirstGetCharacters = false }: Props) => {
  const {
    //state
    characters,
    infoData,
    isLoading,
    isFirstRenderOnHome,
    //actions
    changeSpeciesSelected,
    changeStatusSelected,
    changeGenderSelected,
    changeNameFiltered,
    getCharacters,
  } = useCharactersState();

  useEffect(() => {
    if (isFirstRenderOnHome && callerFirstGetCharacters) {
      getCharacters({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearFiltersAndGetData = () => {
    changeSpeciesSelected("");
    changeStatusSelected("");
    changeGenderSelected("");
    changeNameFiltered("");
    getCharacters({});
  };

  return {
    //states
    characters,
    infoData,
    isLoading,
    //methods
    //functions
    getCharacters,
    clearFiltersAndGetData,
  };
};
