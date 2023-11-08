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
    global: {
      body: {
        bg: "darkBackgroud",
      },
    },
  },
  colors: {
    darkBackgroud: "#262626",
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
