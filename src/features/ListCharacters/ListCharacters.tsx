import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { StandardWrapper } from "../../infrastructure/ui/StandardWrapper";

export const ListCharacters = () => {
  const { t } = useTranslation("listCharacters");
  const { container } = styles;
  return (
    <StandardWrapper>
      <View style={container}>
        <Text>{t("title")}</Text>
        <Text>{t("description")}</Text>
      </View>
    </StandardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
