import { useForm } from "react-hook-form";
import { useEffect } from "react";

// import { useDebouncedValue } from "./useDebouncedValue";
import { useCharactersState } from "../../../infrastructure/storage/characters/charactersStore";
import { FilterCharacter } from "../../../shared/types/filterCharacter";
export const useFilterForm = () => {
  const {
    //state
    nameFiltered,
    isFirstRenderOnHome,
    //actions
    changeSpeciesSelected,
    changeStatusSelected,
    changeGenderSelected,
    changeNameFiltered,
    getCharacters,
  } = useCharactersState();

  const { control, watch, setValue } = useForm<
    Omit<
      FilterCharacter,
      "filterByStatus" | "filterBySpecies" | "filterByGender"
    >
  >({
    defaultValues: {
      filterByName: nameFiltered,
    },
  });
  const filterByName = watch("filterByName");
  // const filterByNameDebounced = useDebouncedValue(filterByName, 700);

  useEffect(() => {
    if (nameFiltered === "") {
      setValue("filterByName", "");
    }
  }, [nameFiltered]);

  useEffect(() => {
    if (!isFirstRenderOnHome) {
      getCharacters({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName]);

  return {
    //state
    filterByName,

    //methods
    control,
    //functions
    changeSpeciesSelected,
    changeStatusSelected,
    changeGenderSelected,
    changeNameFiltered,
  };
};
