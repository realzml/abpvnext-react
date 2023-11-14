import {request} from "@umijs/max";
import {ListResultDto, PagedResultDto} from "@/services/typing";
import {
  CreateIdentityRoleInput,
  GetIdentityRolesInput,
  IdentityRoleDto,
  UpdateIdentityRoleInput
} from "@/services/identity/identityRole/typing";


export function getIdentityRoles(input:GetIdentityRolesInput){
  return request<PagedResultDto<IdentityRoleDto>>('/api/identity/roles', {
    method: 'GET',
    params: input,
  });
}
export function deleteIdentityRole(id:string){
  return request<PagedResultDto<IdentityRoleDto>>(`/api/identity/roles/${id}`, {
    method: 'DELETE',
  });
}
export function createIdentityRole(input:CreateIdentityRoleInput){
  return request<PagedResultDto<IdentityRoleDto>>(`/api/identity/roles`, {
    method: 'POST',
    data:input
  });
}
export function updateIdentityRole(id:string,input:UpdateIdentityRoleInput){
  return request<PagedResultDto<IdentityRoleDto>>(`/api/identity/roles/${id}`, {
    method: 'PUT',
    data:input
  });
}
export function getAllIdentityRoles(){
  return request<ListResultDto<IdentityRoleDto>>('/api/identity/roles/all', {
    method: 'GET',
  });
}
