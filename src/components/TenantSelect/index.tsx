import {ModalForm, ProFormText} from "@ant-design/pro-components";
import {useLocalize} from "@/utils/hooks";
import React, {useState} from "react";
import {getTenant, saveTenant} from "@/utils/store";
import {Alert, message, Space} from "antd";
import {FindTenantInput} from "@/services/multi-tenancy/typing";
import {findTenantByName} from "@/services/multi-tenancy";


const TenantSelect: React.FC = () => {

  const intl = useLocalize();
  const [tenantName, setTenantName] = useState<string|null>(null);
  const onSubmit = (values: FindTenantInput) => {
    const name = values.name!;
    if (name === null || name === '') {
      saveTenant('');
    } else {
      findTenantByName(name).then(res => {
        if (!res.success) {
          message.error(intl("AbpUiMultiTenancy::GivenTenantIsNotExist", name))
        } else {
          if (!res.isActive) {
            message.error(intl("AbpUiMultiTenancy::GivenTenantIsNotAvailable", name))
          }
          saveTenant(res.tenantId!);
          setTenantName(name)
        }
      })
    }

    return Promise.resolve(true);
  }
  return (
    <ModalForm<FindTenantInput>
      layout='horizontal'
      modalProps={{
        width: 520,
        bodyStyle: {marginTop: '30px'}
      }}
      labelCol={{span: 6}}
      onFinish={onSubmit}
      title={intl("AbpUiMultiTenancy::Tenant")}
      trigger={
        <div style={{color: "#1890ff"}}>{tenantName ?? intl("AbpUiMultiTenancy::NotSelected")}</div>
      }
    >
      <Space direction='vertical' size='large'>
        {
          tenantName && <Alert message={intl('AbpUiMultiTenancy::SwitchTenantHint')} type="info" showIcon/>
        }

        <ProFormText width="md" name="name" label={intl("AbpUiMultiTenancy::Name")}/>
      </Space>
    </ModalForm>
  )
}
export default TenantSelect;
