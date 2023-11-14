import React from "react";
import {ModalForm, ProFormText} from "@ant-design/pro-components";
import {useLocalize} from "@/utils/hooks";
import {TenantDto, UpdateTenantInput} from "@/services/saas/tenant/typing";
import {updateTenant} from "@/services/saas/tenant";

export interface UpdateFormProps {
  onFinish: () => void;
  editItem?: TenantDto;
  visible: boolean;
  onOpenChange: (visible: boolean) => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({onFinish, editItem, visible, onOpenChange}) => {
  const onSubmit = (values: UpdateTenantInput) => {
    updateTenant(editItem?.id!, {...values}).then(() => {
      onFinish();
    });
    return Promise.resolve(true);
  }

  const intl = useLocalize();

  return (
    <ModalForm<UpdateTenantInput>
      title={intl("AbpTenantManagement::Edit")}
      initialValues={editItem}
      open={visible}
      onOpenChange={onOpenChange}
      modalProps={{
        width: 520,
        bodyStyle: {marginTop: '30px'}
      }}
      layout='horizontal'
      autoFocusFirstInput
      onFinish={onSubmit}>
      <ProFormText
        width="md"
        rules={[
          {required: true, message: intl('AbpTenantManagement::ThisFieldIsRequired.')}
        ]}
        name="name"
        label={intl("AbpTenantManagement::DisplayName:TenantName")}
      />
    </ModalForm>
  )
}

export default UpdateForm;
