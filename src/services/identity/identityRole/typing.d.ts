import {EntityDto, PagedAndSortedResultRequestDto} from "@/services/typing";


export interface GetIdentityRolesInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface IdentityRoleDto extends EntityDto {
  name: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  concurrencyStamp?:string
}
export interface CreateIdentityRoleInput{
  name: string;
  isDefault: boolean;
  isPublic: boolean;
}
export interface UpdateIdentityRoleInput{
  name: string;
  isDefault: boolean;
  isPublic: boolean;
}
