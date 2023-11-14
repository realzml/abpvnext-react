import React, {useEffect, useState} from "react";
import {ModalForm, ProFormCheckbox, ProFormText} from "@ant-design/pro-components";
import {Form, Tabs} from "antd";
import {getIdentityUserRoles, updateIdentityUser} from "@/services/identity/identityUser";
import {
  CreateIdentityUserInput,
  IdentityUserDto,
  UpdateIdentityUserInput
} from "@/services/identity/identityUser/typing";
import {useLocalize} from "@/utils/hooks";
import {getAllIdentityRoles} from "@/services/identity/identityRole";
import {IdentityRoleDto} from "@/services/identity/identityRole/typing";

export interface UpdateFormProps {
  onFinish: () => void;
  editItem?: IdentityUserDto;
  visible: boolean;
  onOpenChange: (visible: boolean) => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({onFinish, editItem, visible, onOpenChange}) => {
  const [roles, setRoles] = useState<IdentityRoleDto[]>([]);

  const [form] = Form.useForm();

  const getAllRoles = () => {
    getAllIdentityRoles().then(res => {
      setRoles(res.items!);
    })
  }
  const modalOpenChange = (visible: boolean) => {
    if (visible) {
      const updateInfo: UpdateIdentityUserInput = {
        userName: editItem?.userName!,
        name:editItem?.name,
        surname: editItem?.surname,
        phoneNumber: editItem?.phoneNumber,
        isActive: editItem?.isActive!,
        email: editItem?.email!,
        roleNames: [],
        lockoutEnabled: editItem?.lockoutEnabled!
      }
      getAllRoles();
      getIdentityUserRoles(editItem?.id!).then(res => {
        updateInfo.roleNames = res.items?.map(t => t.name!) || [];
        form.setFieldsValue(updateInfo)
      })
    }
    onOpenChange(visible);
  }
  const intl = useLocalize();
  const onSubmit = (values: UpdateIdentityUserInput) => {
    console.log(values)
    updateIdentityUser(editItem?.id!, values).then(() => {
      onFinish();
    });
    return Promise.resolve(true);
  }
  return (
    <ModalForm<CreateIdentityUserInput>
      title={intl("AbpIdentity::Edit")}
      key='updateUser'
      form={form}
      modalProps={{
        width: 520,
        bodyStyle: {marginTop: '30px'}
      }}
      layout='horizontal'
      labelCol={{span: 6}}
      autoFocusFirstInput
      open={visible}
      onOpenChange={modalOpenChange}
      onFinish={onSubmit}>
      <Tabs>
        <Tabs.TabPane key='user' tab={intl("AbpIdentity::UserInformations")}>
          <ProFormText
            name="userName"
            rules={[
              {required: true, message: intl('AbpIdentity::ThisFieldIsRequired')}
            ]}
            label={intl("AbpIdentity::UserName")}
          />
          <ProFormText
            name="name"
            rules={[
              {required: true, message: intl('AbpIdentity::ThisFieldIsRequired')}
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
              {required: true, message: intl('AbpIdentity::ThisFieldIsRequired')}
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
            name="roleNames"
            valuePropName='value'
            layout="vertical"
            options={roles.map(role => {
                return {label: role?.name!, value: role?.name!};
              }
            )}
          />
        </Tabs.TabPane>
      </Tabs>

    </ModalForm>
  )
}

export default UpdateForm;
