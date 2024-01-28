import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./store/RootReducer.ts";
import { Provider } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

const client = new QueryClient();
const store = configureStore({
  reducer: RootReducer,
});

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "darkBackground" : "lightBackground",
        color: props.colorMode === "dark" ? "lightColor" : "darkColor",
      },
    }),
  },
  colors: {
    darkBackgroud: "#262626",
    lightBackgroud: "#f5f5f5",
    // darkColor: "#f5f5f5",
    // lightColor: "#262626",
  },
  config: {
    // initialColorMode: "light",
    useSystemColorMode: true,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </ChakraProvider>
);
