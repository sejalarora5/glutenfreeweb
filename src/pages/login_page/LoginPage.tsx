import { Formik } from "formik";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import appIcon from "../../assets/appIcon.png";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { saveUser } from "../../redux/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { LoginObject } from "./type";
import emailIcon from "../../assets/icons_svg/ic_email.svg";
import passwordIcon from "../../assets/icons_svg/ic_password.svg";
import AuthField from "../../components/AuthField";
import EyeSvg from "../../assets/icons_svg/eye-slash-fill.svg";
import OpenEyeSvg from "../../assets/icons_svg/eye_open5.svg";
const LoginPage = () => {
  const navigate = useNavigate();
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        emailId: Yup.string().required().email().label("Email"),

        password: Yup.string().required().min(6).label("Password"),
      }),
    []
  );
  const appDispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (
    email: string,
    password: string,
    resetForm: () => void
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.post<LoginObject>(
        import.meta.env.VITE_BASE_URL + "/api/login",
        { email, password }
      );
      if (data.success) {
        appDispatch(saveUser({ token: data.token, userData: data.data }));
        navigate(-1);
        toast.success(data.message, { position: toast.POSITION.TOP_CENTER });
        resetForm();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        (error as { response: { data: { message: string } } }).response.data
          .message,
        { position: toast.POSITION.TOP_CENTER }
      );
    } finally {
      setLoading(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  function togglePasswordVisibility() {
    setShowPassword((prevState: any) => !prevState);
  }
  return (
    <div className="flex relative bg-cover bg-center bg-[url('/src/assets/logo.png')]">
      <div className="backdrop-blur-sm backdrop-brightness-50 bg-white/60">
        <div className="absolute top-2 right-5 h-16 w-16... ">
          <Link className="position-absolute text-secondary text-lg" to={"/"}>
            Skip
          </Link>
        </div>
        <div className="flex  justify-center items-center h-screen w-screen">
          <div className="w-96 py-5 bg-base-100 card shadow-xl shadow-xl shadow-[#808080]">
            <Formik
              initialValues={{
                emailId: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleLogin(values.emailId, values.password, resetForm);
              }}
            >
              {({
                values,
                errors,
                handleSubmit,
                handleBlur,
                handleChange,
                touched,
              }) => (
                <form
                  className="flex flex-col items-center"
                  onSubmit={handleSubmit}
                >
                  <img src={appIcon} alt="app icon" width={150} height={150} />
                  <AuthField
                    type="email"
                    name="emailId"
                    label={"Email ID"}
                    imageUrl={emailIcon}
                    value={values.emailId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={touched.emailId}
                    error={errors.emailId}
                  />
                  <div className="mt-5 flex flex-col">
                    <div className="flex h-15 w-80 bg-[#F3F3F3] rounded">
                      <img
                        src={passwordIcon}
                        className="ml-3 h-8 w-6 object-fill self-center"
                      />
                      <div className="flex flex-col w-full">
                        <label className="ml-3 mt-1 text-[#808080] text-md">
                          Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password here"
                          className="input input-sm ml-0 max-w-xs bg-[#F3F3F3] w-auto outline-none focus:bg-[#F3F3F3] focus:outline-none focus:border-none appearance-none "
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="">
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="btn w-auto hover:border-none focus:outline-none hover:bg-transparent"
                        >
                          {showPassword ? (
                            <img src={OpenEyeSvg} className="h-10" />
                          ) : (
                            <img src={EyeSvg} className="h-10" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="mt-1  text-red-500 text-sm">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <div className="flex justify-end w-80 mt-2">
                    <Link className="text-[#A3A3A3] text-sm" to={"/forgotpass"}>
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="mt-8">
                    <button
                      className="btn w-80 text-[#fff] bg-gradient-to-r from-[#c36d91] from-10% to-[#f57fb0] to-90% .. "
                      type="submit"
                      disabled={loading}
                    >
                      SIGN IN
                    </button>
                  </div>
                  <Link
                    to={"/signup"}
                    type="button"
                    className="btn btn-ghost text-[#808080] w-92 mt-5 hover:bg-transparent"
                  >
                    New User?{" "}
                    <span className="text text-[#9AC5C1]">
                      Create an Account
                    </span>
                  </Link>
                </form>
              )}
            </Formik>
          </div>
          {loading && (
            <span className="loading loading-dots loading-lg z-10 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-400"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
