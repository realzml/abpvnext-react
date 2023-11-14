import {request} from "@@/exports";
import {FindTenantResultDto} from "./typing";


export function findTenantByName(name:string) {
  return request<FindTenantResultDto>(`/api/abp/multi-tenancy/tenants/by-name/${name}`, {
    method: 'GET',
  });
}
