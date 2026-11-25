import { createAsyncThunk } from "@reduxjs/toolkit";

import { supabase } from "@/supabase/supabase";

const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("id, name, village, taluka, mobile_number, created_at")
        .order("created_at", { ascending: false });

      if (error) return rejectWithValue(error.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async ({ name, village, taluka, mobile_number }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("customers")
        .insert({ name, village, taluka, mobile_number })
        .select("id, name, village, taluka, mobile_number, created_at")
        .single();

      if (error) return rejectWithValue(error.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async ({ id, name, village, taluka, mobile_number }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("customers")
        .update({ name, village, taluka, mobile_number })
        .eq("id", id)
        .select("id, name, village, taluka, mobile_number, created_at")
        .single();

      if (error) return rejectWithValue(error.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("customers").delete().eq("id", id);

      if (error) return rejectWithValue(error.message);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export default {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
