import { useEffect, useState } from "react";

import { useCharactersState } from "../../../infrastructure/storage/characters/charactersStore";

interface Props {
  id: string;
}
export const useSingleCharacter = ({ id }: Props) => {
  const {
    //state
    singleCharacter,
    episodesByCharacter,
    //actions
    resetSingleCharacter,
    getCharacterById,
    getEpisodesByCharacter,
  } = useCharactersState();

  useEffect(() => {
    if (id) {
      getCharacterById(id);
    }
    return () => {
      // Cleanup function
      resetSingleCharacter();
    };
  }, [id, getCharacterById, resetSingleCharacter]);

  useEffect(() => {
    if (singleCharacter) {
      getEpisodesByCharacter(singleCharacter.episodeFront);
    }
  }, [singleCharacter]);

  return {
    //state
    singleCharacter,
    episodesByCharacter,
    //methods
    //functions
    resetSingleCharacter,
  };
};
