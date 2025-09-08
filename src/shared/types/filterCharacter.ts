import {
  GenderOptions,
  SpeciesOptions,
  StatusOptions,
} from "../constants/enumsFilters";

export interface FilterCharacter {
  filterByName: string | undefined;
  filterByStatus: StatusOptions | undefined;
  filterBySpecies: SpeciesOptions | undefined;
  filterByGender: GenderOptions | undefined;
}
