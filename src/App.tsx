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
import VideoPage from "./pages/video_page/VideoPage";
import CardsPage from "./pages/cards_page/CardsPage";
import SuggestBusinessPage from "./pages/suggest_bussiness_page/SuggestBusinessPage";
import { AddBusiness } from "./pages/suggest_bussiness_page/AddBusiness";
import { Profile } from "./pages/Profile_page/Profile";
import { EditProfile } from "./pages/Profile_page/EditProfile";
import ShopsPage from "./pages/shops_page/ShopsPage";
import BlogsPage from "./pages/blogs_page/BlogsPage";
import ForgotPassword from "./pages/forgot_password_page/ForgotPassword";
import GlutenFreeEbookPage from "./pages/glutenfreeebook_page/GlutenFreeEbookPage";
import RTIPage from "./pages/rti_page/RTIPage";
import AboutMe from "./pages/aboutMe_page/AboutMe";

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

          <Route path="/cards" element={<CardsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route
            path="/restaurantsDetails/:restaurantId"
            element={<RestaurantDetailsPage />}
          />
          <Route path="/videos" element={<VideoPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/forgotpass" element={<ForgotPassword />} />
          <Route path="/suggestBusiness" element={<SuggestBusinessPage />} />
          <Route path="/addBusiness" element={<AddBusiness />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/forgotpass" element={<ForgotPassword />} />
          <Route path="/rti" element={<RTIPage />} />
          <Route
            path="/restaurantsDetails/:restaurantId"
            element={<RestaurantDetailsPage />}
          />
          <Route path="/shops" element={<ShopsPage />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="gluten_free_ebook" element={<GlutenFreeEbookPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
