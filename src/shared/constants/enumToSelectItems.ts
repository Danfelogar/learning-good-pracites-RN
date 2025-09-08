import i18n from "../../config/i18n/i18n";

export const enumToSelectItems = <T extends Record<string, string>>(
  enumObj: T,
  namespace: string
): Array<{ label: string; value: string }> => {
  return Object.values(enumObj).map((value) => ({
    label: i18n.t(`${value}`, { ns: namespace }),
    value: value,
  }));
};
