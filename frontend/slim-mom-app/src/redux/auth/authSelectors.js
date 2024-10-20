
export const isLoggedIn = state => state.auth.isLoggedIn;

export const user = state => state.auth.user;

export const isRefreshing = state => state.auth.isRefreshing;

export const getAuthError = state => state.auth.error;

export const accessToken = state => state.auth.accessToken;
export const refreshToken = state => state.auth.refreshToken;
