import {FullAuditedEntityDto, PagedAndSortedResultRequestDto} from "@/services/typing";


export interface GetIdentityUsersInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface IdentityUserDto extends FullAuditedEntityDto {
  tenantId?: string;
  userName?: string;
  name?: string;
  surname?: string;
  email?: string;
  emailConfirmed: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  isActive: boolean;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  lockoutEnd?: Date;
  concurrencyStamp: string;
  entityVersion: number;
  lastPasswordChangeTime?: Date;
}

export interface CreateIdentityUserInput {
  userName:string;
  name?:string;
  surname?:string;
  email:string;
  phoneNumber?:string;
  isActive:boolean;
  lockoutEnabled:boolean;
  roleNames:string[];
  password:string;
}
export interface UpdateIdentityUserInput {
  userName:string;
  name?:string;
  surname?:string;
  email:string;
  phoneNumber?:string;
  isActive:boolean;
  lockoutEnabled:boolean;
  roleNames:string[];
}
