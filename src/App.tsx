import React from "react";
import "./App.css";
import AppRouter from "./router";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./components/common/toaster";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <AppRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
