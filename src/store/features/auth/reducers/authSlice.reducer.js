import { createSlice } from "@reduxjs/toolkit";
import authActions from "../actions/auth.actions";
import toast from "react-hot-toast";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const getErrorMessage = (payload, fallback = "Something went wrong") =>
  typeof payload === "string" ? payload : payload?.message || fallback;

const initialState = {
  user: null,
  session: null,
  role: null,
  name: null,
  usersWithRole: [],
  status: STATUS.IDLE,
  initialized: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.status = STATUS.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(authActions.checkAuth.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(authActions.checkAuth.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.session = action.payload;
        state.user = action.payload?.user || null;
        state.isAuthenticated = !!action.payload;
        state.initialized = true;
      })
      .addCase(authActions.checkAuth.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        state.initialized = true;
        toast.error(getErrorMessage(action.payload, "Session check failed"));
      })

      .addCase(authActions.loginUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(authActions.loginUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.isAuthenticated = true;
        state.error = null;
        toast.success("Login Successfully");
      })
      .addCase(authActions.loginUser.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        toast.error(getErrorMessage(action.payload, "Login failed"));
      })

      .addCase(authActions.getUserRole.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(authActions.getUserRole.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.role = action.payload.role;
        state.name = action.payload.name;
        state.initialized = true;
      })
      .addCase(authActions.getUserRole.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        state.initialized = true;
        toast.error(getErrorMessage(action.payload, "Could not load your role"));
      })

      .addCase(authActions.logoutUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(authActions.logoutUser.fulfilled, (state) => {
        state.status = STATUS.SUCCESS;
        state.user = null;
        state.session = null;
        state.role = null;
        state.name = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(authActions.logoutUser.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.error?.message || "Logout failed";
        toast.error(state.error);
      })

      .addCase(authActions.fetchEmployees.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(authActions.fetchEmployees.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.usersWithRole = action.payload;
      })
      .addCase(authActions.fetchEmployees.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        toast.error(getErrorMessage(action.payload, "Could not load employees"));
      })

      .addCase(authActions.createEmployee.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(authActions.createEmployee.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.usersWithRole.unshift(action.payload);
        toast.success("Employee created");
      })
      .addCase(authActions.createEmployee.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        toast.error(action.payload || "Could not create employee");
      })

      .addCase(authActions.updateEmployee.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(authActions.updateEmployee.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        const idx = state.usersWithRole.findIndex(
          (e) => e.user_id === action.payload.user_id,
        );
        if (idx !== -1) {
          state.usersWithRole[idx] = {
            ...state.usersWithRole[idx],
            ...action.payload,
          };
        }
        toast.success("Employee updated");
      })
      .addCase(authActions.updateEmployee.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        toast.error(action.payload || "Could not update employee");
      })

      .addCase(authActions.deleteEmployee.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.usersWithRole = state.usersWithRole.filter(
          (e) => e.user_id !== action.payload,
        );
        toast.success("Employee deleted");
      })
      .addCase(authActions.deleteEmployee.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        toast.error(action.payload || "Could not delete employee");
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
