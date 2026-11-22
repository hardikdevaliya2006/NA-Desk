import {
  setInitialized,
  setRole,
  setUser,
} from "../reducers/authSlice.reducer";

export const checkAuth = () => (dispatch) => {
  // TODO: restore the session here (Supabase auth / persisted token).
  dispatch(setInitialized(true));
};

export const getUserRole = () => (dispatch) => {
  // TODO: load the current user's role here.
  dispatch(setRole(null));
};

export const signIn = (user) => (dispatch) => {
  dispatch(setUser(user));
};

const authActions = { checkAuth, getUserRole, signIn };
export default authActions;
