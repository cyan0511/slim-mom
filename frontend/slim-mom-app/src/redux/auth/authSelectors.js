
export const isLoggedIn = state => state.auth.isLoggedIn;

export const user = state => state.auth.user;

export const isRefreshing = state => state.auth.isRefreshing;

export const getAuthError = state => state.auth.error;

export const token = state => state.auth.token;
export const refreshToken = state => state.auth.refreshToken;
export const sid = state => state.auth.sid;
