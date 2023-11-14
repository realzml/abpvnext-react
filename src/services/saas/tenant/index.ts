import {request} from "@umijs/max";
import {PagedResultDto} from "@/services/typing";
import {CreateTenantInput, GetTenantsInput, TenantDto, UpdateTenantInput} from "@/services/saas/tenant/typing";


export function getTenants(input: GetTenantsInput) {
  return request<PagedResultDto<TenantDto>>('/api/multi-tenancy/tenants', {
    method: 'GET',
    params: input,
  });
}

export function deleteTenant(id: string) {
  return request(`/api/multi-tenancy/tenants/${id}`, {
    method: 'DELETE',
  });
}

export function createTenant(input: CreateTenantInput) {
  return request<TenantDto>(`/api/multi-tenancy/tenants`, {
    method: 'POST',
    data: input
  });
}

export function updateTenant(id: string, input: UpdateTenantInput) {
  return request<TenantDto>(`/api/multi-tenancy/tenants/${id}`, {
    method: 'PUT',
    data: input
  });
}
