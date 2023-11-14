import {getCurrentLanguage} from "@/utils/store";
import React, {useLayoutEffect} from "react";
import {EventEmitter} from 'events';
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import {Locale} from "antd/es/locale";

export const event = new EventEmitter();
export const LANG_CHANGE_EVENT = Symbol('LANGUAGE_CHANGE');
export  const  localeInfo:Record<string, Locale>={
  'es': enUS,
  'zh-Hans': zhCN
};


export const AntdLocaleContainer = (props:any) => {
  const initLocale = getCurrentLanguage();
  const [locale, setLocale] = React.useState(initLocale||'es');

  const handleLangChange = (locale:string) => {
    setLocale(locale);
  };
  useLayoutEffect(() => {
    event.on(LANG_CHANGE_EVENT, handleLangChange);
    return () => {
      event.off(LANG_CHANGE_EVENT, handleLangChange);
    };
  }, []);

  return (
    <ConfigProvider  locale={localeInfo[locale!] || enUS}>
      {props.children}
    </ConfigProvider>
  )
}
