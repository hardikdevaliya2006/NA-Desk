import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter.route";
import { useDispatch } from "react-redux";
import authActions from "./store/features/auth/actions/auth.actions";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const result = await dispatch(authActions.checkAuth());

      // Only fetch the role once we know a real session exists. Otherwise
      // getUserRole() rejects with "User not authenticated" on the login page.
      if (authActions.checkAuth.fulfilled.match(result) && result.payload) {
        dispatch(authActions.getUserRole());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            iconTheme: {
              primary: "var(--primary)",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--destructive)",
              secondary: "#fff",
            },
          },
        }}
      />
      <AppRouter />
    </>
  );
};

export default App;
