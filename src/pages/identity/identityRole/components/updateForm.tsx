import React from "react";
import {ModalForm, ProFormCheckbox, ProFormText} from "@ant-design/pro-components";
import {
  IdentityRoleDto,
  UpdateIdentityRoleInput
} from "@/services/identity/identityRole/typing";
import {Space} from "antd";
import { updateIdentityRole} from "@/services/identity/identityRole";
export interface UpdateFormProps {
  onFinish: () => void;
  editItem?: IdentityRoleDto;
  visible:boolean;
  onOpenChange:(visible:boolean)=>void;
}
const UpdateForm: React.FC<UpdateFormProps> = ({onFinish,editItem,visible,onOpenChange}) => {
  const onSubmit = (values: UpdateIdentityRoleInput) => {
    updateIdentityRole(editItem?.id!,{...values}).then(() => {
      onFinish();
    });
    return Promise.resolve(true);
  }
  return (
    <ModalForm<UpdateIdentityRoleInput>
      title="编辑角色"
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
        name="name"
        label="角色名称"
        placeholder="请输入角色名称"
      />
      <Space size='small'>
        <ProFormCheckbox
          name="isDefault"
          label="是否默认"
        />
        <ProFormCheckbox
          name="isPublic"
          label="是否公共"
        />
      </Space>
    </ModalForm>
  )
}

export default UpdateForm;
