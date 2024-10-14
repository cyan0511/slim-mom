export const isLoggedIn = (state) => state.auth.isLoggedIn;

export const user = (state) => state.auth.user;

export const isRefreshing = (state) => state.auth.isRefreshing;

export const getAuthError = (state) => state.auth.error;

export const token = (state) => state.auth.token;
export const refreshToken = (state) => state.auth.refreshToken;

export const getUserName = (state) => state.auth.user.name;
export const getToken = (state) => state.auth.token;
export const getUserInfo = (state) => state.auth.userInfo;
