import storage from './storage';

export const TOKEN_NAME = '@wavelight/token';

export const getAuthToken = () => storage.get(TOKEN_NAME);
export const setAuthToken = (token: string) => storage.set(TOKEN_NAME, token);
export const clearAuthToken = () => storage.remove(TOKEN_NAME);
