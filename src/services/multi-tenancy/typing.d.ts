

export  interface  FindTenantResultDto {
  success:boolean;
  tenantId?:string;
  name?:string;
  isActive:boolean;
}

export  interface  FindTenantInput {
  name?:string;
}
