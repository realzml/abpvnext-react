import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import React, {useRef, useState} from "react";
import {Button, Dropdown, MenuProps, Modal, Space, Tag} from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  SettingOutlined
} from "@ant-design/icons";
import CreateForm from "./components/createForm";
import UpdateForm from "./components/updateForm";
import {useLocalize} from "@/utils/hooks";
import {GetTenantsInput, TenantDto} from "@/services/saas/tenant/typing";
import {deleteTenant, getTenants} from "@/services/saas/tenant";

const {confirm} = Modal;

const Tenant: React.FC = () => {
  const [editItem, setEditItem] = useState<TenantDto>();
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const intl = useLocalize();
  const tableActionDropdownClick = (key: string, row: TenantDto) => {
    switch (key) {
      case 'edit':
        setEditItem(row);
        setEditFormVisible(true);
        break;
      case 'delete':
        deleteTenantItem(row);
        break;
      default:
        break;
    }
  };
  const tableDataReload = () => {
    actionRef.current?.reload();
  }
  const deleteTenantItem = (row: TenantDto) => {
    confirm({
      title: intl("AbpTenantManagement::TenantDeletionConfirmationMessage", row.name),
      icon: <ExclamationCircleFilled/>,
      async onOk() {
        await deleteTenant(row.id!);
        tableDataReload();
      },
      onCancel() {
      },
    });
  };
  const tableActionDropdownItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: intl('AbpTenantManagement::Edit'),
      icon: <EditOutlined/>
    },
    {
      key: 'delete',
      label: intl('AbpTenantManagement::Delete'),
      icon: <DeleteOutlined/>
    },
  ];
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TenantDto>[] = [
    {
      title: intl('AbpTenantManagement::Actions'),
      dataIndex: 'operation',
      width:'200px',
      hideInSearch: true,
      key: 'operation',
      render: (_, row) => (
        <Space size="middle">
          <Dropdown trigger={["click"]}
                    menu={{items: tableActionDropdownItems, onClick: e => tableActionDropdownClick(e.key, row)}}>
            <Button type="primary">
              <Space>
                <SettingOutlined/>
                {intl('AbpTenantManagement::Actions')}
                <DownOutlined/>
              </Space>
            </Button>
          </Dropdown>
        </Space>
      ),
    },
    {
      title: intl('AbpTenantManagement::TenantName'),
      dataIndex: "name",
      key:'name',
      formItemProps: {
        name: "filter"
      }
    },
  ];

  return (
    <PageContainer
      key='tenant'
      extra={[
        <CreateForm key='createTenant' onFinish={() => actionRef.current?.reload()}/>
      ]}
    >
      <ProTable<TenantDto, GetTenantsInput>
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
          const result = await getTenants({
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


export default Tenant;
