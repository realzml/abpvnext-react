import {Button, Modal, Tabs, Tree} from "antd";
import React, {useEffect, useState} from "react";
import {
  PermissionGrantInfoDto,
  PermissionListResultDto, UpdatePermissionDto
} from "@/services/permission-management/typing";
import {getPermissions, updatePermissions} from "@/services/permission-management";
import {DownOutlined} from "@ant-design/icons";

export interface PermissionManagementProps {
  providerName: string;
  providerKey: string;
  trigger: React.ReactNode;
}
import  * as _ from  'lodash';
import {useLocalize} from "@/utils/hooks";

const convertPermissionsToTreeData = (permissions: PermissionGrantInfoDto[], parentName: string | null): any[] => {
  return permissions.filter(t => t.parentName == parentName).map(item => {
    return {title: item.displayName, key: item.name, children: convertPermissionsToTreeData(permissions, item.name!)}
  })
}

const PermissionManagement: React.FC<PermissionManagementProps> = ({trigger, providerName, providerKey}) => {

  const intl = useLocalize();

  const [permissionListResult, setPermissionListResult] = useState<PermissionListResultDto>();
  const [open, setOpen] = useState<boolean>(false);
  const [groupPermissions, setGroupPermissions] = useState<Record<string, UpdatePermissionDto[]>>({});

  useEffect(() => {
    if (open) {
      getPermissions({providerKey, providerName}).then(res => {
        setPermissionListResult(res);
        const grantedPermissionName:Record<string, UpdatePermissionDto[]> = {};
        res.groups.map(item=> {
          grantedPermissionName[item?.displayNameKey!]
            = item.permissions.filter(t=>t.isGranted).map(t=>{
              return { isGranted: t.isGranted,name:t.name!}
          });
        })
        setGroupPermissions(grantedPermissionName);
      })
    }
  }, [open])
  const handleTreeCheck=(checkedKeys:string[],groupName:string)=>{
    const selectedGroupPermissions = groupPermissions[groupName];
    selectedGroupPermissions.map(item=>{
      item.isGranted = checkedKeys.includes(item.name!);
    })
    groupPermissions[groupName]=selectedGroupPermissions;
    setGroupPermissions(groupPermissions)
  }
  const onSubmit = ()=>{
     let permissions:UpdatePermissionDto [] =  [];
     Object.keys(groupPermissions).map(key=>{
       const item = groupPermissions[key];
       permissions=permissions.concat(item);
     })
    updatePermissions({providerKey,providerName},{permissions:permissions}).then(res=>{
      setOpen(false);
    })
  }
  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Modal
        bodyStyle={{marginTop:30}}
        title={intl("AbpPermissionManagement::Permissions")}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={onSubmit}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button type='primary'>授予所有权限</Button>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Tabs tabPosition='left'>
          {permissionListResult?.groups.map(item => {
            return <Tabs.TabPane key={item.displayNameKey} tab={item.displayName}>
              <Tree
                key={item.displayNameKey}
                showIcon
                checkable={true}
                defaultExpandAll
                onCheck={(checkedKeys)=>handleTreeCheck(checkedKeys as string[],item.displayNameKey!)}
                defaultCheckedKeys={groupPermissions[item.displayNameKey!].map(t=>t.name!)}
                switcherIcon={<DownOutlined/>}
                treeData={convertPermissionsToTreeData(item.permissions, null)}
              />
            </Tabs.TabPane>
          })
          }
        </Tabs>
      </Modal>
    </>
  )
}
export default PermissionManagement;
