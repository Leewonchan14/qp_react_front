export function getLocalToken() {
  return {
    accessToken: localStorage.getItem('accessToken') ?? undefined,
    refreshToken: localStorage.getItem('refreshToken') ?? undefined,
  };
}

export function setLocalToken(accessToken?: string, refreshToken?: string) {
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
}

export function removeLocalToken() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
