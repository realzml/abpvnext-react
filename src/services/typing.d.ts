export interface ApplicationConfigurationDto {
  localization: ApplicationLocalizationConfigurationDto;
  auth: ApplicationAuthConfigurationDto;
  setting: ApplicationSettingConfigurationDto;
  currentUser: CurrentUserDto;
  features: ApplicationFeatureConfigurationDto;
  globalFeatures: ApplicationGlobalFeatureConfigurationDto;
  multiTenancy: MultiTenancyInfoDto;
  currentTenant: CurrentTenantDto;
  timing: any;
  clock: ClockDto;
  objectExtensions: any;
  extraProperties: Record<string, object>;
}
export interface ApplicationLocalizationConfigurationDto {
  values: Record<string, Record<string, string>>;
  resources: Record<string, ApplicationLocalizationResourceDto>;
  languages: LanguageInfo[];
  currentCulture: CurrentCultureDto;
  defaultResourceName?: string;
  languagesMap: Record<string, NameValue[]>;
  languageFilesMap: Record<string, NameValue[]>;
}
export interface ApplicationAuthConfigurationDto {
  grantedPolicies: Record<string, boolean>;
}
export interface ApplicationSettingConfigurationDto {
  values: Record<string, string>;
}
export interface CurrentUserDto {
  isAuthenticated: boolean;
  id?: string;
  tenantId?: string;
  impersonatorUserId?: string;
  impersonatorTenantId?: string;
  impersonatorUserName?: string;
  impersonatorTenantName?: string;
  userName?: string;
  name?: string;
  surName?: string;
  email?: string;
  emailVerified: boolean;
  phoneNumber?: string;
  phoneNumberVerified: boolean;
  roles: string[];
}
export interface ApplicationFeatureConfigurationDto {
  values: Record<string, string>;
}
export interface ApplicationGlobalFeatureConfigurationDto {
  enabledFeatures: string[];
}
export interface CurrentTenantDto {
  id?: string;
  name?: string;
  isAvailable: boolean;
}

export interface MultiTenancyInfoDto {
  isEnabled: boolean;
}
export interface ClockDto {
  kind?: string;
}
export interface ApplicationLocalizationResourceDto {
  texts: Record<string, string>;
  baseResources: string[];
}
export interface LanguageInfo {
  cultureName?: string;
  uiCultureName?: string;
  displayName?: string;
  twoLetterISOLanguageName?: string;
  flagIcon?: string;
}
export interface CurrentCultureDto {
  displayName?: string;
  englishName?: string;
  threeLetterIsoLanguageName?: string;
  twoLetterIsoLanguageName?: string;
  isRightToLeft: boolean;
  cultureName?: string;
  name?: string;
  nativeName?: string;
  dateTimeFormat: DateTimeFormatDto;
}
export interface DateTimeFormatDto {
  calendarAlgorithmType?: string;
  dateTimeFormatLong?: string;
  shortDatePattern?: string;
  fullDateTimePattern?: string;
  dateSeparator?: string;
  shortTimePattern?: string;
  longTimePattern?: string;
}
export interface NameValue<T = string> {
  name?: string;
  value: T;
}
export interface PagedResultRequestDto extends LimitedResultRequestDto {
  skipCount?: number;
}

export interface LimitedResultRequestDto {
  maxResultCount : number;
}
export interface ListResultDto<T> {
  items?: T[];
}
export interface PagedResultDto<T> extends ListResultDto<T> {
  totalCount?: number;
}
export interface PagedAndSortedResultRequestDto extends PagedResultRequestDto {
  sorting?: string;
}
export interface EntityDto<TKey = string> {
  id?: TKey;
}
export interface CreationAuditedEntityDto<TPrimaryKey = string> extends EntityDto<TPrimaryKey> {
  creationTime?: string | Date;
  creatorId?: string;
}
export interface AuditedEntityDto<TPrimaryKey = string> extends CreationAuditedEntityDto<TPrimaryKey> {
  lastModificationTime?: string | Date;
  lastModifierId?: string;

}
export interface FullAuditedEntityDto<TPrimaryKey = string> extends AuditedEntityDto<TPrimaryKey> {
  isDeleted?: boolean;
  deleterId?: string;
  deletionTime?: Date | string;
}
