import React from "react";
import {ModalForm, ProFormCheckbox, ProFormText} from "@ant-design/pro-components";
import {CreateIdentityRoleInput} from "@/services/identity/identityRole/typing";
import {Button, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {createIdentityRole} from "@/services/identity/identityRole";
import {useLocalize} from "@/utils/hooks";
export  interface CreateFormProps{
  onFinish:()=>void;
}

const CreateForm: React.FC<CreateFormProps> = ({onFinish}) => {

  const intl = useLocalize();
  const onSubmit=(values:CreateIdentityRoleInput)=>{
    createIdentityRole(values).then(()=>{
      onFinish();
    });
    return Promise.resolve(true);
  }
  return (
    <ModalForm<CreateIdentityRoleInput>
      title={intl("AbpIdentity::NewRole")}
      modalProps={{
        width:520,
        bodyStyle:{marginTop:'30px'}
      }}
      layout='horizontal'
      autoFocusFirstInput
      onFinish={onSubmit}
      trigger={
        <Button type="primary">
          <PlusOutlined/>
          {intl("AbpIdentity::NewRole")}
        </Button>
      }>
      <ProFormText
        width="md"
        name="name"
        rules={[
          {required:true,message:intl('AbpIdentity::ThisFieldIsRequired.')}
        ]}
        label= {intl("AbpIdentity::DisplayName:RoleName")}
      />
      <Space  size='small'>
      <ProFormCheckbox
        name="isDefault"
        label= {intl("AbpIdentity::DisplayName:IsDefault")}
      />
      <ProFormCheckbox
        name="isPublic"
        label= {intl("AbpIdentity::DisplayName:IsPublic")}
      />
      </Space>
    </ModalForm>
  )
}

export default CreateForm;
