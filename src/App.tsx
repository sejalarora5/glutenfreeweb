import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/login_page/LoginPage";
import HomePage from "./pages/home_page/HomePage";
import SignupPage from "./pages/signup_page/SignupPage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { ThemeStateType } from "./redux/themeSlice/themeSlice";
import RestaurantsPage from "./pages/restaurants_page/RestaurantsPage";
import "@smastrom/react-rating/style.css";
import "react-toastify/dist/ReactToastify.min.css";
import RestaurantDetailsPage from "./pages/restaurants_page/restaurantsdetails_page/RestaurantDetailsPage";
import StoresPage from "./pages/stores_page/StoresPage";

function App() {
  const themeSelector = useSelector<RootState>(
    (state) => state.themeSlice
  ) as ThemeStateType;

  return (
    <div data-theme={themeSelector.theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route  path="/stores" element={<StoresPage />}/>
          <Route path="/restaurantsDetails/:restaurantId" element={<RestaurantDetailsPage/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
