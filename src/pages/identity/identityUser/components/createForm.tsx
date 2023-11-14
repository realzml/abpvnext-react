import React, {useEffect, useState} from "react";
import {ModalForm, ProFormCheckbox, ProFormText} from "@ant-design/pro-components";
import {CreateIdentityRoleInput, IdentityRoleDto} from "@/services/identity/identityRole/typing";
import {Button, Space, Tabs} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {createIdentityUser} from "@/services/identity/identityUser";
import {CreateIdentityUserInput} from "@/services/identity/identityUser/typing";
import {useLocalize} from "@/utils/hooks";
import {getAllIdentityRoles} from "@/services/identity/identityRole";
export  interface CreateFormProps{
  onFinish:()=>void;
}

const CreateForm: React.FC<CreateFormProps> = ({onFinish}) => {

  const [roles,setRoles] = useState<IdentityRoleDto[]>([]);

  const getAllRoles = ()=>{
    getAllIdentityRoles().then(res=>{
      setRoles(res.items!);
    })
  }
  const onOpenChange = (visible:boolean)=>{
    if(visible){
      getAllRoles();
    }
  }
  const intl = useLocalize();
  const onSubmit=(values:CreateIdentityUserInput)=>{
    createIdentityUser(values).then(()=>{
      onFinish();
    });
    return Promise.resolve(true);
  }
  return (
    <ModalForm<CreateIdentityUserInput>
      title={intl("AbpIdentity::NewUser")}
      key="newUser"
      modalProps={{
        width:520,
        bodyStyle:{marginTop:'30px'}
      }}
      onOpenChange={onOpenChange}
      layout='horizontal'
      labelCol={{span:6}}
      autoFocusFirstInput
      onFinish={onSubmit}
      trigger={
        <Button type="primary">
          <PlusOutlined/>
          {intl("AbpIdentity::NewUser")}
        </Button>
      }>
      <Tabs>
        <Tabs.TabPane key='user' tab={intl("AbpIdentity::UserInformations")}>
          <ProFormText
            name="userName"
            rules={[
              {required:true,message:intl('AbpIdentity::ThisFieldIsRequired.')}
            ]}
            label={intl("AbpIdentity::UserName")}
          />
          <ProFormText.Password
            name="password"
            rules={[
              {required:true,message:intl('AbpIdentity::ThisFieldIsRequired.')}
            ]}
            label={intl("AbpIdentity::Password")}
          />
          <ProFormText
            name="name"
            rules={[
              {required:true,message:intl('AbpIdentity::ThisFieldIsRequired.')}
            ]}
            label={intl("AbpIdentity::Name")}
          />
          <ProFormText
            name="sureName"
            label={intl("AbpIdentity::SureName")}
          />
          <ProFormText
            name="email"
            rules={[
              {required:true,message:intl('AbpIdentity::ThisFieldIsRequired.')}
            ]}
            label={intl("AbpIdentity::Email")}
          />
          <ProFormText
            name="phoneNumber"
            label={intl("AbpIdentity::PhoneNumber")}
          />

        </Tabs.TabPane>
        <Tabs.TabPane key='role' tab={intl("AbpIdentity::Roles")}>
          <ProFormCheckbox.Group
            name="checkbox"
            layout="vertical"
            options={roles.map(role=>{
                 return {label:role?.name!,value:role?.name!};
              }
            )}
          />
        </Tabs.TabPane>
      </Tabs>

    </ModalForm>
  )
}

export default CreateForm;
