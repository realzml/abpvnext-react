import {useModel} from "@umijs/max";

export interface LocalizationWithDefault {
  key: string;
  defaultValue: string;
}

export const useLocalize = () => {
  const {initialState}  = useModel("@@initialState")
  const localization = initialState?.applicationConfiguration?.localization;
  const getLocalization = (key: string | LocalizationWithDefault, ...interpolateParams: string[]) => {
    if (!key) key = '';
    let defaultValue: string = '';

    if (typeof key !== 'string') {
      defaultValue = key.defaultValue;
      key = key.key;
    }

    const keys = key.split('::') as string[];
    const warn = (message: string) => {
      //@ts-ignore
      if (process.env.NODE_ENV === 'development') console.warn(message);
    };

    if (keys.length < 2) {
      warn('The localization source separator (::) not found.');
      return defaultValue || (key as string);
    }
    if (!localization) return defaultValue || keys[1];

    const sourceName = keys[0] || localization.defaultResourceName;
    const sourceKey = keys[1];

    if (sourceName === '_') {
      return defaultValue || sourceKey;
    }

    if (!sourceName) {
      warn(
        'Localization source name is not specified and the defaultResourceName was not defined!',
      );

      return defaultValue || sourceKey;
    }

    const source = localization.values[sourceName]
    if (!source) {
      warn('Could not find localization source: ' + sourceName);
      return defaultValue || sourceKey;
    }

    let internallocalization = source[sourceKey];
    if (typeof internallocalization === 'undefined') {
      return defaultValue || sourceKey;
    }

    interpolateParams = interpolateParams.filter(params => params != null);
    if (internallocalization) internallocalization = interpolate(internallocalization, interpolateParams);

    if (typeof internallocalization !== 'string') internallocalization = '';

    return internallocalization || defaultValue || (key as string);
  }
  return getLocalization;
};
function interpolate(text: string, params: string[]) {
  return text
    .replace(/(['"]?\{\s*(\d+)\s*\}['"]?)/g, (_, match, digit) => params[digit] ?? match)
    .replace(/\s+/g, ' ');
}
