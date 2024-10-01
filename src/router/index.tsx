import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckoutPage from "../pages/checkoutPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
