
/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState:any) {
  const  grantedPolicies  = initialState?.applicationConfiguration?.auth?.grantedPolicies || {};
  return grantedPolicies;
}
