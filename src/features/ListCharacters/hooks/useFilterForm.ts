import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { Subscription } from "rxjs";

import { useCharactersState } from "../../../infrastructure/storage/characters/charactersStore";
import { FilterCharacter } from "../../../shared/types/filterCharacter";

export const useFilterForm = () => {
  const {
    //state
    nameFiltered,
    reactiveSearchService,
    //actions
    changeSpeciesSelected,
    changeStatusSelected,
    changeGenderSelected,
    changeNameFiltered,
    cleanupSearch,
    changeInfoData,
    setCharactersAndInfo,
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
  const searchSubscription = useRef<Subscription | null>(null);

  useEffect(() => {
    if (nameFiltered === "") {
      setValue("filterByName", "");
    }
  }, [nameFiltered]);

  useEffect(() => {
    const searchObservable = reactiveSearchService.createSearchObservable();

    searchSubscription.current = searchObservable.subscribe({
      next: (result) => {
        if (result) {
          const { infoFront, resultsFront } = result;

          // Actualizar el estado con los resultados
          setCharactersAndInfo(resultsFront, {
            count: infoFront.countFront,
            pages: infoFront.pagesFront,
            currentPage: 1,
          });
        }
      },
      error: (error) => {
        if (error.message !== "SearchCancelled") {
          console.error("Error en búsqueda:", error);
          // En caso de error, hacer una petición para obtener todos los personajes
          reactiveSearchService.setSearchTerm("");
        }
      },
    });

    // Emitir el término actual al servicio de búsqueda
    reactiveSearchService.setSearchTerm(filterByName || "");

    return () => {
      if (searchSubscription.current) {
        searchSubscription.current.unsubscribe();
        searchSubscription.current = null;
      }
    };
  }, [filterByName, reactiveSearchService, setCharactersAndInfo]);

  useEffect(() => {
    return () => {
      cleanupSearch();
    };
  }, [cleanupSearch]);

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
