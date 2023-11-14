import {EntityDto, PagedAndSortedResultRequestDto} from "@/services/typing";


export interface GetTenantsInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface TenantDto extends EntityDto {
  name: string;
  concurrencyStamp?:string
}
export interface CreateTenantInput{
  name: string;
  adminEmailAddress: boolean;
  adminPassword: boolean;
}
export interface UpdateTenantInput{
  name: string;
}
