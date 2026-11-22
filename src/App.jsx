import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter.route";
import { useDispatch } from "react-redux";
import authActions from "./store/features/auth/actions/auth.actions";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.checkAuth());
    dispatch(authActions.getUserRole());
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
