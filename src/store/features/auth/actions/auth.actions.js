import { supabase } from "@/supabase/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const loginUser = createAsyncThunk(
  "authentication/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return rejectWithValue(error.message);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return null;
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const checkAuth = createAsyncThunk(
  "authentication/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) return rejectWithValue(error.message);
      return data.session || null;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

const getUserRole = createAsyncThunk(
  "authentication/getUserRole",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        return rejectWithValue("User not authenticated");
      }

      // Prefer the row tied to the auth user id. Some accounts were created
      // outside the create-user flow, so their roles row has no matching
      // user_id — in that case try the email column before giving up.
      let { data, error } = await supabase
        .from("roles")
        .select("role, name, email")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        return rejectWithValue(error.message);
      }

      if (!data && user.email) {
        const byEmail = await supabase
          .from("roles")
          .select("role, name, email")
          .eq("email", user.email)
          .maybeSingle();

        if (byEmail.error) {
          return rejectWithValue(byEmail.error.message);
        }
        data = byEmail.data;
      }

      // Still no row: fall back to auth metadata instead of showing a raw
      // "Cannot coerce the result to a single JSON object" error.
      return (
        data || {
          role: "user",
          name: user.user_metadata?.name || user.email?.split("@")[0] || null,
          email: user.email || null,
        }
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const logoutUser = createAsyncThunk("authentication/logoutUser", async () => {
  await supabase.auth.signOut();
  toast.success("Logout Successful");
  return null;
});

const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("roles")
        .select("id, user_id, name, email, role, password, created_at")
        .order("created_at", { ascending: false });

      if (error) return rejectWithValue(error.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.functions.invoke("create-user", {
        body: { name, email, password, role },
      });

      if (error) return rejectWithValue(error.message);
      if (data?.error) return rejectWithValue(data.error);

      return {
        user_id: data.user.id,
        name,
        email,
        role: role || "user",
        password,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async ({ user_id, name, email, password, role }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.functions.invoke("update-user", {
        body: { user_id, name, email, password, role },
      });

      if (error) return rejectWithValue(error.message);
      if (data?.error) return rejectWithValue(data.error);

      return { user_id, name, email, role, password };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (user_id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.functions.invoke("delete-user", {
        body: { id: user_id },
      });

      if (error) return rejectWithValue(error.message);
      if (data?.error) return rejectWithValue(data.error);

      return user_id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export default {
  loginUser,
  checkAuth,
  getUserRole,
  logoutUser,
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
