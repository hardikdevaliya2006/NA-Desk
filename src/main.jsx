import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { ColorProvider } from "./components/theme/ColorProvider";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./store/redux.store";
import { TooltipProvider } from "@/components/ui/tooltip";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ColorProvider>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </ColorProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
