import { StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useTranslation } from "react-i18next";

import { useSettingsState } from "../../../infrastructure/storage/settings/settingsStore";
import { useCharacters } from "../hooks/useCharacters";
import { Modal } from "../../../infrastructure/ui/Modal";
import {
  heightFullScreen,
  widthFullScreen,
} from "../../../shared/utils/phoneDimensions";
import { ButtonGeneric } from "../../../infrastructure/ui/ButtonGeneric";
import { useFilterSelectors } from "../hooks/useFilterSelector";
import { InputSelect } from "../../../infrastructure/ui/input/SelectorGeneric";
import {
  GenderOptions,
  SpeciesOptions,
  StatusOptions,
} from "../../../shared/constants/enumsFilters";
import { enumToSelectItems } from "../../../shared/constants/enumToSelectItems";

export const ModalFilters = () => {
  const { t } = useTranslation("modalFilters");
  const { modalContent, titleHeader, titleModal, btnFilter, textFilter } =
    styles;

  const {
    //states
    isOpenModalFilters,
    //actions
    changeModalFiltersState,
  } = useSettingsState();

  const {
    //states
    //methods
    //functions
    getCharacters,
  } = useCharacters({});

  const {
    //state
    //methods
    control,
    //functions
    changeSpeciesSelected,
    changeStatusSelected,
    changeGenderSelected,
  } = useFilterSelectors();
  return (
    <Modal
      visibility={isOpenModalFilters}
      handleDismiss={changeModalFiltersState}
    >
      <View style={modalContent}>
        <View style={titleHeader}>
          <Text style={{ ...titleModal }}>{t("title")}</Text>
          <Feather
            onPress={changeModalFiltersState}
            name="x"
            size={heightFullScreen / 32}
            color={"#00000061"}
          />
        </View>
        <InputSelect
          inputStyle={{
            marginBottom: heightFullScreen * 0.015,
          }}
          inputColor="black"
          items={enumToSelectItems(SpeciesOptions, "species")}
          control={control}
          onChangeCallback={(val) => {
            changeSpeciesSelected(val);
            console.log("val---->", val);
          }}
          name="filterBySpecies"
          placeHolder={t("placeholderSpecies")}
          placeholderTextColor="#00000061"
        />
        <InputSelect
          inputStyle={{
            marginBottom: heightFullScreen * 0.015,
          }}
          inputColor="black"
          items={enumToSelectItems(GenderOptions, "gender")}
          control={control}
          onChangeCallback={(val) => {
            changeGenderSelected(val);
            console.log("val---->", val);
          }}
          name="filterByGender"
          placeHolder={t("placeholderGender")}
          placeholderTextColor="#00000061"
        />
        <InputSelect
          inputStyle={{
            marginBottom: heightFullScreen * 0.015,
          }}
          inputColor="black"
          items={enumToSelectItems(StatusOptions, "status")}
          control={control}
          onChangeCallback={(val) => {
            changeStatusSelected(val);
            console.log("val---->", val);
          }}
          name="filterByStatus"
          placeHolder={t("placeholderStatus")}
          placeholderTextColor="#00000061"
        />
        <View style={{ width: "100%", height: heightFullScreen * 0.015 }} />

        <ButtonGeneric
          buttonStyle={{ ...btnFilter }}
          activeOpacity={0.7}
          onPress={() => {
            getCharacters({});
            changeModalFiltersState();
          }}
          textContent={
            <View style={{ flex: 1 }}>
              <Text style={{ ...textFilter }}>{t("btnLabel")}</Text>
            </View>
          }
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    top: heightFullScreen * 0.15,
    left: (widthFullScreen - widthFullScreen * 0.8) / 2,
    borderRadius: widthFullScreen * 0.015,
    width: widthFullScreen * 0.8,
    height: heightFullScreen * 0.38,
    padding: heightFullScreen * 0.02,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    elevation: 24, // Para sombra en Android
    zIndex: 100,
  },
  titleHeader: {
    width: "100%",
    alignItems: "center",
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleModal: {
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0.15,
    textAlignVertical: "center",
    color: "#000000DE",
  },
  contentListItems: {
    width: "100%",
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  btnFilter: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    width: "100%",
    height: heightFullScreen * 0.05,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: widthFullScreen * 0.06,
    //card shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  textFilter: {
    color: "#2196F3",
    fontWeight: "600",
    fontSize: 15.6,
    lineHeight: 16,
    letterSpacing: 1.25,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
