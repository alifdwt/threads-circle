import ReactDOM from "react-dom/client";
// import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./store/RootReducer.ts";
import { Provider } from "react-redux";
// import App from "./App.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
// import router from "./contants/Route.tsx";
import App from "./App.tsx";

const client = new QueryClient();
const store = configureStore({
  reducer: RootReducer,
});

// const routerMain = createBrowserRouter(router);

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
          {/* <RouterProvider router={routerMain} /> */}
          <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </ChakraProvider>
);
