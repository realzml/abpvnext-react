import {useModel} from '@umijs/max';
import React, {useState} from 'react';
import HeaderDropdown from "@/components/HeaderDropdown";
import {LanguageInfo} from "@/services/typing";
import {MenuProps} from "antd/es/menu";
import {getCurrentLanguage, saveCurrentLanguage} from "@/utils/store";
import {MenuItemType} from "rc-menu/es/interface";
import {LANG_CHANGE_EVENT,event} from "@/components/AntdLocaleContainer";


export const SelectLang = () => {
  const {initialState, refresh} = useModel("@@initialState");
  const localization = initialState?.applicationConfiguration?.localization;
  const languages = localization!?.languages;

  const [selectedLang, setSelectedLang] = useState<string>(localization?.currentCulture?.name || 'en');

  const changeLang = ({key}: any): void => {
    if(key !== getCurrentLanguage()){
      saveCurrentLanguage(key);
      refresh();
      setSelectedLang(key);
      event.emit(LANG_CHANGE_EVENT, key);
      // chrome 不支持这个事件。所以人肉触发一下
      if (window.dispatchEvent) {
        const event = new Event('languagechange');
        window.dispatchEvent(event);
      }
    }
  };
  const menuItemIconStyle = {marginRight: "8px"};

  const menuItems: MenuItemType[] = languages?.map((language: LanguageInfo) => ({
    key: language.cultureName!,
    label:
      <div>
          <span role="img" aria-label={language?.displayName || 'en-US'} style={menuItemIconStyle}>
             🌐
          </span>
        {language?.displayName || 'en-US'}
      </div>
    ,
  }));
  const langMenu: MenuProps = {
    selectedKeys: [selectedLang],
    onClick: changeLang,
    items: menuItems
  };

  const inlineStyle = {
    cursor: "pointer",
    padding: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    verticalAlign: "middle",
  };
  return (
    <HeaderDropdown trigger={['click']} menu={langMenu} placement="bottomRight">
      <span style={inlineStyle}>
        <i className="anticon" title={localization?.currentCulture?.displayName}>
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path
                  d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                  className="css-c4d79v"
                />
              </svg>

        </i>
      </span>
    </HeaderDropdown>
  );
};
