import { request } from '@umijs/max';
import {ApplicationConfigurationDto} from "@/services/typing";

export function getApplicationConfiguration(options?: { [key: string]: any }) {
  return request<ApplicationConfigurationDto>('/api/abp/application-configuration', {
    method: 'GET',
    ...(options || {}),
  });
}
