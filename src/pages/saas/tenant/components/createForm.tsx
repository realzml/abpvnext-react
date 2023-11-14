import React from "react";
import {ModalForm, ProFormText} from "@ant-design/pro-components";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useLocalize} from "@/utils/hooks";
import {CreateTenantInput} from "@/services/saas/tenant/typing";
import {createTenant} from "@/services/saas/tenant";

export interface CreateFormProps {
  onFinish: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({onFinish}) => {

  const intl = useLocalize();
  const onSubmit = (values: CreateTenantInput) => {
    createTenant(values).then(() => {
      onFinish();
    });
    return Promise.resolve(true);
  }
  return (
    <ModalForm<CreateTenantInput>
      title={intl('AbpTenantManagement::NewTenant')}
      modalProps={{
        width: 520,
        bodyStyle: {marginTop: '30px'}
      }}
      layout='vertical'
      autoFocusFirstInput
      onFinish={onSubmit}
      trigger={
        <Button type="primary">
          <PlusOutlined/>
          {intl('AbpTenantManagement::NewTenant')}
        </Button>
      }>
      <ProFormText
        width="md"
        rules={[
          {required: true, message: intl('AbpTenantManagement::ThisFieldIsRequired.')}
        ]}
        name="name"
        label={intl("AbpTenantManagement::DisplayName:TenantName")}
      />
      <ProFormText
        width="md"
        name="adminEmailAddress"
        rules={[
          {required: true, message: intl('AbpTenantManagement::ThisFieldIsRequired.')}
        ]}
        label={intl("AbpTenantManagement::DisplayName:AdminEmailAddress")}
      />
      <ProFormText.Password
        width="md"
        name="adminPassword"
        rules={[
          {required: true, message: intl('AbpTenantManagement::ThisFieldIsRequired.')}
        ]}
        label={intl("AbpTenantManagement::DisplayName:AdminPassword")}
      />
    </ModalForm>
  )
}

export default CreateForm;
