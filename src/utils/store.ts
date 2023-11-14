import {ACCESS_TOKEN_STORE_KEY, CURRENT_LANGUAGE_STORE_KEY, TENANT_STORE_KEY} from "@/utils/constant";

export function saveToken(token:string){
  localStorage.setItem(ACCESS_TOKEN_STORE_KEY,token)
}
export function getToken(){
  return localStorage.getItem(ACCESS_TOKEN_STORE_KEY);
}
export function saveCurrentLanguage(language:string){
  localStorage.setItem(CURRENT_LANGUAGE_STORE_KEY,language)
}
export function getCurrentLanguage(){
  return localStorage.getItem(CURRENT_LANGUAGE_STORE_KEY);
}
export function saveTenant(tenant:string){
  localStorage.setItem(TENANT_STORE_KEY,tenant)
}
export function getTenant(){
  return localStorage.getItem(TENANT_STORE_KEY);
}
export function clearStore(){
   localStorage.removeItem(TENANT_STORE_KEY);
   localStorage.removeItem(ACCESS_TOKEN_STORE_KEY);
}
