import {request} from "@umijs/max";
import {
  CreateIdentityUserInput,
  GetIdentityUsersInput,
  IdentityUserDto,
  UpdateIdentityUserInput
} from "@/services/identity/identityUser/typing";
import {ListResultDto, PagedResultDto} from "@/services/typing";
import {IdentityRoleDto} from "@/services/identity/identityRole/typing";


export function getIdentityUsers(input:GetIdentityUsersInput){
  return request<PagedResultDto<IdentityUserDto>>('/api/identity/users', {
    method: 'GET',
    params: input,
  });
}
export function getIdentityUser(id:string){
  return request<IdentityUserDto>(`/api/identity/users/${id}`, {
    method: 'GET',
  });
}
export function getIdentityUserRoles(id:string){
  return request<ListResultDto<IdentityRoleDto>>(`/api/identity/users/${id}/roles`, {
    method: 'GET',
  });
}
export function deleteIdentityUser(id:string){
  return request(`/api/identity/users/${id}`, {
    method: 'DELETE',
  });
}
export function createIdentityUser(input:CreateIdentityUserInput){
  return request<IdentityUserDto>(`/api/identity/users`, {
    method: 'POST',
    data:input
  });
}
export function updateIdentityUser(id:string,input:UpdateIdentityUserInput){
  return request<IdentityUserDto>(`/api/identity/users/${id}`, {
    method: 'PUT',
    data:input
  });
}
