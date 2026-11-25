import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import customerActions from "../actions/customer.actions";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const getErrorMessage = (payload, fallback = "Something went wrong") =>
  typeof payload === "string" ? payload : payload?.message || fallback;

const initialState = {
  customers: [],
  status: STATUS.IDLE,
  error: null,
};

const customerSlice = createSlice({
  name: "Customers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.status = STATUS.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customerActions.fetchCustomers.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(customerActions.fetchCustomers.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.customers = action.payload;
      })
      .addCase(customerActions.fetchCustomers.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        toast.error(getErrorMessage(action.payload, "Could not load customers"));
      })

      .addCase(customerActions.createCustomer.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(customerActions.createCustomer.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.customers.unshift(action.payload);
        toast.success("Customer created");
      })
      .addCase(customerActions.createCustomer.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        toast.error(action.payload || "Could not create customer");
      })

      .addCase(customerActions.updateCustomer.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(customerActions.updateCustomer.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        const index = state.customers.findIndex(
          (customer) => customer.id === action.payload.id,
        );
        if (index !== -1) {
          state.customers[index] = {
            ...state.customers[index],
            ...action.payload,
          };
        }
        toast.success("Customer updated");
      })
      .addCase(customerActions.updateCustomer.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        toast.error(action.payload || "Could not update customer");
      })

      .addCase(customerActions.deleteCustomer.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload,
        );
        toast.success("Customer deleted");
      })
      .addCase(customerActions.deleteCustomer.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        toast.error(action.payload || "Could not delete customer");
      });
  },
});

export const { clearError } = customerSlice.actions;
export default customerSlice.reducer;
