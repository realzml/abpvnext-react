import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import React, {useRef, useState} from "react";
import {GetIdentityRolesInput, IdentityRoleDto} from "@/services/identity/identityRole/typing";
import {deleteIdentityRole, getIdentityRoles} from "@/services/identity/identityRole";
import {Button, Dropdown, MenuProps, Modal, Space, Tag} from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleFilled, LockOutlined,
  SettingOutlined
} from "@ant-design/icons";
import CreateForm from "@/pages/identity/identityRole/components/createForm";
import UpdateForm from "@/pages/identity/identityRole/components/updateForm";
import {useLocalize} from "@/utils/hooks";
import PermissionManagement from "@/components/PermissionManagement";

const {confirm} = Modal;

const IdentityRole: React.FC = () => {
  const [editItem, setEditItem] = useState<IdentityRoleDto>();
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const intl = useLocalize();
  const tableActionDropdownClick = (key: string, row: IdentityRoleDto) => {
    switch (key) {
      case 'edit':
        setEditItem(row);
        setEditFormVisible(true);
        break;
      case 'permission':
        setEditItem(row);
        break;
      case 'delete':
        deleteRoleItem(row);
        break;
      default:
        break;
    }
  };
  const tableDataReload = () => {
    actionRef.current?.reload();
  }
  const deleteRoleItem = (row: IdentityRoleDto) => {
    confirm({
      title: intl("AbpIdentity::RoleDeletionConfirmationMessage",row?.name!),
      icon: <ExclamationCircleFilled/>,
      async onOk() {
        await deleteIdentityRole(row?.id!);
        tableDataReload();
      },
      onCancel() {
      },
    });
  };
  const tableActionDropdownItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: intl('AbpIdentity::Edit'),
      icon: <EditOutlined/>
    },
    {
      key: 'permission',
      label: <PermissionManagement trigger={<div>{intl("AbpIdentity::Permission:ChangePermissions")}</div>} providerName='R' providerKey={editItem?.name!} />,
      icon: <LockOutlined />
    },
    {
      key: 'delete',
      label: intl('AbpIdentity::Delete'),
      icon: <DeleteOutlined/>
    },
  ];
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<IdentityRoleDto>[] = [
    {
      title: intl("AbpIdentity::Actions"),
      dataIndex: 'operation',
      hideInSearch: true,
      width:'200px',
      key: 'operation',
      render: (_, row) => (
        <Space size="middle">
          <Dropdown trigger={["click"]}
                    menu={{items: tableActionDropdownItems, onClick: e => tableActionDropdownClick(e.key, row)}}>
            <Button type="primary">
              <Space>
                <SettingOutlined/>
                {intl("AbpIdentity::Actions")}
                <DownOutlined/>
              </Space>
            </Button>
          </Dropdown>
        </Space>
      ),
    },
    {
      title: intl("AbpIdentity::RoleName"),
      dataIndex: "name",
      render: (text, row) => {
        return <Space>{text}{row.isDefault ? <Tag color="#108ee9">{intl("AbpIdentity::DisplayName:IsDefault")}</Tag> : ''}</Space>;
      },
      formItemProps: {
        name: "filter"
      }
    },
  ];

  return (
    <PageContainer
      extra={[
        <CreateForm key='createRole' onFinish={() => actionRef.current?.reload()}/>
      ]}
    >
      <ProTable<IdentityRoleDto, GetIdentityRolesInput>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        columns={columns}
        request={async (
          params,
          sort,
          filter,
        ) => {
          const result = await getIdentityRoles({
            skipCount: (params.current! - 1) * params.pageSize!,
            maxResultCount: params.pageSize!,
            filter: params.filter
          });
          return Promise.resolve({
            data: result.items,
            success: true,
            total: result.totalCount,
          });
        }}
      />
      <UpdateForm onOpenChange={setEditFormVisible} visible={editFormVisible} editItem={editItem}
                  onFinish={tableDataReload}/>
    </PageContainer>
  );
};


export default IdentityRole;
