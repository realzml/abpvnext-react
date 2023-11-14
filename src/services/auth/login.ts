import { request } from '@umijs/max';

export function Login(input:LoginRequestInput){
  const params = new URLSearchParams();
  params.append('password', input.password);
  params.append('username', input.username);
  params.append('grant_type', "password");
  params.append('client_id', OPENID_DICT_CLIENT_ID!);
  params.append('scope', OPENID_DICT_SCOPE!);

  return request<Record<string, any>>('/connect/token', {
    method: 'POST',
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data:params,
    skipErrorHandler:true,
  });
}
