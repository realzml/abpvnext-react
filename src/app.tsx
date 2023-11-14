import Footer from '@/components/Footer';
import {SelectLang} from '@/components/RightContent';
import {LinkOutlined} from '@ant-design/icons';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import {SettingDrawer} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from '@umijs/max';
import {history, Link, RequestConfig} from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import {errorConfig} from './requestErrorConfig';
import React, {useState} from 'react';
import {AvatarDropdown, AvatarName} from './components/RightContent/AvatarDropdown';
import {getApplicationConfiguration} from "@/services/application-configuration";
import {ApplicationConfigurationDto} from "@/services/typing";
import {LOGIN_PATH} from "@/utils/constant";
import {useLocalize} from "@/utils/hooks";
import reFormatterMenu from "@/utils/reFormatterMenu";
import {AntdLocaleContainer} from "@/components/AntdLocaleContainer";
const isDev = process.env.NODE_ENV === 'development';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  applicationConfiguration?: ApplicationConfigurationDto;
  loading?: boolean;
  fetchApplicationConfiguration?: () => Promise<ApplicationConfigurationDto>;
}> {
  const fetchApplicationConfiguration = async () => {
    try {
      return await getApplicationConfiguration({
        skipErrorHandler: true,
      });
    } catch (error) {
      history.push(LOGIN_PATH);
    }
    return {} as ApplicationConfigurationDto;
  };
  const applicationConfiguration = await fetchApplicationConfiguration();
  return {
    fetchApplicationConfiguration,
    applicationConfiguration,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  const intl = useLocalize();
  return {
    actionsRender: () => [<SelectLang key="SelectLang"/>],
    avatarProps: {
      src: initialState?.applicationConfiguration?.currentUser?.name,
      title: <AvatarName/>,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // waterMarkProps: {
    //   content: initialState?.applicationConfiguration?.currentUser?.name,
    // },
    menuDataRender:(menuData)=>{
      reFormatterMenu(menuData,intl);
      return menuData;
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.applicationConfiguration?.currentUser?.isAuthenticated && location.pathname !== LOGIN_PATH) {
        history.push(LOGIN_PATH);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  baseURL: REACT_APP_BASE_URL,
  ...errorConfig,
};


export function rootContainer(container:React.ReactNode) {
  return React.createElement(AntdLocaleContainer, null, container);
}
