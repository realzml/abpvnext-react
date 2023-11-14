import Footer from '@/components/Footer';
import {Login as LoginRequest} from '@/services/auth/login';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {history, useModel, Helmet} from '@umijs/max';
import {Alert, message, Tabs} from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
import {SelectLang} from "@/components/RightContent";
import {useLocalize} from '@/utils/hooks';
import {saveToken} from "@/utils/store";
import TenantSelect from "@/components/TenantSelect";
const Lang = () => {
  const langClassName = useEmotionCss(({token}) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang/>}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginErrorMessage, setUserLoginErrorMessage] = useState('');
  const {initialState, setInitialState} = useModel('@@initialState');
  const intl = useLocalize();
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const isEnableMultiTenancy = initialState?.applicationConfiguration?.multiTenancy?.isEnabled||false;
  const fetchUserInfo = async () => {
    const applicationConfiguration = await initialState?.fetchApplicationConfiguration?.();
    if (applicationConfiguration?.currentUser?.isAuthenticated) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          applicationConfiguration: applicationConfiguration,
        }));
      });
    }
  };

  const handleSubmit = async (values: LoginRequestInput) => {
    try {
      // 登录
      const loginResult = await LoginRequest({...values});
      const accessToken = loginResult["access_token"];
      if (accessToken) {
        const defaultLoginSuccessMessage = intl("AbpAccount::LogInUsingYourProviderAccount");
        saveToken(accessToken);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }else{
        message.error(loginResult['error']);
      }
    } catch (error:any) {
      const errorMessage =  error?.response?.data['error_description']
      setUserLoginErrorMessage(errorMessage)
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl("AbpAccount::Login")}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang/>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="Ant Design"
          subTitle={isEnableMultiTenancy&&<TenantSelect/>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as LoginRequestInput);
          }}
        >
          <Tabs
            activeKey="account"
            centered
            items={[
              {
                key: 'account',
                label: intl("AbpAccount::Login")
              },
            ]}
          />

          {userLoginErrorMessage != '' && (
            <LoginMessage
              content={userLoginErrorMessage}
            />
          )}
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined/>,
              }}
              placeholder={intl("AbpAccount::UserNameOrEmailAddress")}
              rules={[
                {
                  required: true,
                  message: intl("AbpAccount::ThisFieldIsRequired"),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined/>,
              }}
              placeholder={intl("AbpAccount::Password")}
              rules={[
                {
                  required: true,
                  message: intl("AbpAccount::ThisFieldIsRequired"),
                },
              ]}
            />
          </>

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              {intl("AbpAccount::RememberMe")}
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
