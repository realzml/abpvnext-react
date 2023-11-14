import {request} from "@@/exports";
import {
  GetPermissionsInput,
  PermissionListResultDto, UpdatePermissionsDto,
  UpdatePermissionsInput
} from "@/services/permission-management/typing";


export function getPermissions(input:GetPermissionsInput) {
  return request<PermissionListResultDto>(`/api/permission-management/permissions`, {
    method: 'GET',
    params:input
  });
}
export function updatePermissions(input:UpdatePermissionsInput,data:UpdatePermissionsDto) {
  return request<PermissionListResultDto>(`/api/permission-management/permissions`, {
    method: 'PUT',
    params:input,
    data,
  });
}
