import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {GetIdentityUsersInput, IdentityUserDto} from "@/services/identity/identityUser/typing";
import React, {useRef, useState} from "react";
import {deleteIdentityUser, getIdentityUsers} from "@/services/identity/identityUser";
import CreateForm from "@/pages/identity/identityUser/components/createForm";
import {Button, Dropdown, MenuProps, Modal, Space} from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LockOutlined,
  SettingOutlined
} from "@ant-design/icons";
import UpdateForm from "@/pages/identity/identityUser/components/updateForm";
import {useLocalize} from "@/utils/hooks";
import PermissionManagement from "@/components/PermissionManagement";

const {confirm} = Modal;

const IdentityUser: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editItem, setEditItem] = useState<IdentityUserDto>();
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const intl = useLocalize();

  const tableActionDropdownItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: intl('AbpIdentity::Edit'),
      icon: <EditOutlined/>
    },
    {
      key: 'permission',
      label: <PermissionManagement trigger={<span>{intl("AbpIdentity::Permission:ChangePermissions")}</span>} providerName='U' providerKey={editItem?.id!} />,
      icon: <LockOutlined />
    },
    {
      key: 'delete',
      label: intl('AbpIdentity::Delete'),
      icon: <DeleteOutlined/>
    },
  ];
  const tableActionDropdownClick = (key: string, row: IdentityUserDto) => {
    switch (key) {
      case 'edit':
        setEditFormVisible(true);
        break;
      case 'permission':
        break;
      case 'delete':
        deleteIdentityUserItem(row);
        break;
      default:
        break;
    }
  };
  const tableDataReload = () => {
    actionRef.current?.reload();
  }
  const deleteIdentityUserItem = (row: IdentityUserDto) => {
    confirm({
      title: intl("AbpIdentity::UserDeletionConfirmationMessage",row?.name!),
      icon: <ExclamationCircleFilled/>,
      async onOk() {
        await deleteIdentityUser(row?.id!);
        tableDataReload();
      },
      onCancel() {
      },
    });
  };
  const columns: ProColumns<IdentityUserDto>[] = [
    {
      title: intl("AbpIdentity::Actions"),
      dataIndex: 'operation',
      hideInSearch: true,
      width:'200px',
      key: 'operation',
      render: (_, row) => (
        <Space size="middle">
          <Dropdown trigger={["click"]}
                    onOpenChange={()=>setEditItem(row)}
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
      dataIndex: "userName",
      formItemProps:{
        name:"filter"
      }
    },
    {
      title: intl("AbpIdentity::RoleName"),
      dataIndex: "email",
      hideInSearch:true
    },
    {
      title: intl("AbpIdentity::RoleName"),
      dataIndex: "phoneNumber",
      hideInSearch:true
    },
  ];

  return (
    <PageContainer
      extra={[
        <CreateForm key='createUser' onFinish={() => actionRef.current?.reload()}/>
      ]}>
      <ProTable<IdentityUserDto, GetIdentityUsersInput>
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
          const result = await getIdentityUsers({
            skipCount: (params.current! - 1) * params.pageSize!,
            maxResultCount: params.pageSize!,
            filter:params.filter
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


export default IdentityUser;
