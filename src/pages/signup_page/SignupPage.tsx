import { Formik } from "formik";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import appIcon from "../../assets/appIcon.png";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";
import { SignUpObject } from "./type";
import AuthField from "../../components/AuthField";
import EyeSvg from "../../assets/icons_svg/eye-slash-fill.svg";
import OpenEyeSvg from "../../assets/icons_svg/eye_open5.svg";
import emailIcon from "../../assets/icons_svg/ic_email.svg";
import passwordIcon from "../../assets/icons_svg/ic_password.svg";
const SignupPage = () => {
  const navigate = useNavigate();

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        fullName: Yup.string().required().label("Full Name"),
        emailId: Yup.string().required().email().label("Email"),
        city: Yup.string().required().label("City"),
        password: Yup.string().required().min(6).label("Password"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required()
          .label("Confirm Password"),
      }),
    []
  );
  const [selectedValue, setSelectedValue] = useState("None");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (
    fullName: string,
    emailId: string,
    city: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      setIsSubmitting(true);
      const { data } = await axios.post<SignUpObject>(
        import.meta.env.VITE_BASE_URL + "/api/register",
        {
          name: fullName,
          email: emailId,
          password: password,
          confirm_password: confirmPassword,
          glutenintolerant: selectedValue,
          city: city,
        }
      );

      if (data.success) {
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error(
        (e as { response: { data: { message: string } } }).response.data
          .message,
        { position: toast.POSITION.TOP_CENTER }
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  function togglePasswordVisibility() {
    setShowPassword((prevState: any) => !prevState);
  }
  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword((prevState: any) => !prevState);
  }
  return (
    <div className="flex bg-cover overflow-hidden bg-no-repeat sm:h-screen lg:h-screen bg-center bg-[url('/src/assets/logo.png')]">
      <div className="backdrop-blur-sm backdrop-brightness-50 bg-white/60">
        <div className="flex justify-center w-screen">
          <div className="px-8 py-5 bg-base-100 card shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] mt-4">
            <Formik
              initialValues={{
                fullName: "",
                emailId: "",
                city: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleSignUp(
                  values.fullName,
                  values.emailId,
                  values.city,
                  values.password,
                  values.confirmPassword
                );
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
                  <img src={appIcon} alt="app icon" width={130} height={130} />
                  <div className="sm:flex sm:flex-row">
                    <div className="flex flex-col items-center">
                      <AuthField
                        type="text"
                        name="fullName"
                        label={"Full Name"}
                        imageUrl={emailIcon}
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isError={touched.fullName}
                        error={errors.fullName}
                      />
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
                      <div className="mt-4 flex flex-col">
                        <div className="flex h-13 w-80 bg-[#F3F3F3] rounded">
                          <img
                            src={passwordIcon}
                            className="ml-3 w-6 object-fill self-center"
                          />
                          <div className="flex flex-col w-full">
                            <label className="ml-3 mt-1 text-[#808080] text-md">
                              Password
                            </label>
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Password here"
                              className="input input-sm h-8 ml-0 max-w-xs bg-[#F3F3F3] w-auto outline-none focus:bg-[#F3F3F3] focus:outline-none focus:border-none appearance-none "
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
                                <img
                                  src={OpenEyeSvg}
                                  className="h-10 w-10 mt-3 outline-none"
                                />
                              ) : (
                                <img
                                  src={EyeSvg}
                                  className="h-10 w-10 mt-3 outline-none"
                                />
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="mt-1  text-red-500 text-sm">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-col">
                        <div className="flex h-13 w-80 bg-[#F3F3F3] rounded">
                          <img
                            src={passwordIcon}
                            className="ml-3 w-6 object-fill self-center"
                          />
                          <div className="flex flex-col w-full">
                            <label className="ml-3 mt-1 text-[#808080] text-md">
                              Confirm Password
                            </label>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              placeholder="Confirm Password"
                              className="input input-sm ml-0 h-8 max-w-xs bg-[#F3F3F3] w-auto outline-none focus:bg-[#F3F3F3] focus:outline-none focus:border-none appearance-none "
                              value={values.confirmPassword}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="">
                            <button
                              type="button"
                              onClick={toggleConfirmPasswordVisibility}
                              className="btn w-auto hover:border-none focus:outline-none hover:bg-transparent"
                            >
                              {showConfirmPassword ? (
                                <img
                                  src={OpenEyeSvg}
                                  className="h-10 w-10 mt-3 outline-none"
                                />
                              ) : (
                                <img
                                  src={EyeSvg}
                                  className="h-10 w-10 mt-3 outline-none"
                                />
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="mt-1  text-red-500 text-sm">
                          {errors.confirmPassword &&
                            touched.confirmPassword &&
                            errors.confirmPassword}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:ml-5">
                      <AuthField
                        type="text"
                        name="city"
                        label={"City"}
                        imageUrl={emailIcon}
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isError={touched.city}
                        error={errors.city}
                      />
                      <div className="mt-4">
                        <h4 className="w-80 font-medium">
                          ARE YOU COELIAC OR GLUTEN INTOLERANT?
                        </h4>
                        <div className="form-control flex items-start">
                          <label className="flex items-start label cursor-pointer">
                            <input
                              type="radio"
                              name="glutenCoeliac"
                              value={"Coeliac"}
                              className="radio radio-secondary mr-3"
                              checked={selectedValue === "Coeliac"}
                              onChange={() => {
                                setSelectedValue("Coeliac");
                              }}
                            />
                            <span className="label-text font-medium">
                              Coeliac
                            </span>
                          </label>
                        </div>
                        <div className="form-control flex items-start">
                          <label className="flex items-start label cursor-pointer">
                            <input
                              type="radio"
                              name="glutenCoeliac"
                              value={"Gluten Intolerant"}
                              className="radio radio-secondary mr-3"
                              checked={selectedValue === "Gluten Intolerant"}
                              onChange={() => {
                                setSelectedValue("Gluten Intolerant");
                              }}
                            />
                            <span className="label-text font-medium">
                              Gluten Intolerant
                            </span>
                          </label>
                        </div>
                        <div className="form-control flex items-start">
                          <label className="flex items-start label cursor-pointer">
                            <input
                              type="radio"
                              value={"None"}
                              name="glutenCoeliac"
                              className="radio radio-secondary mr-3"
                              checked={selectedValue === "None"}
                              onChange={() => {
                                setSelectedValue("None");
                              }}
                            />
                            <span className="label-text font-medium">None</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mt-8">
                      <button
                        className="btn w-80 text-[#fff] bg-gradient-to-r from-[#c36d91] from-10% to-[#f57fb0] to-90% .. "
                        type="submit"
                        disabled={isSubmitting}
                      >
                        SIGN UP
                      </button>
                    </div>
                    <Link
                      to={"/login"}
                      type="button"
                      className="btn btn-ghost text-[#808080] w-92 mt-2 hover:bg-transparent"
                    >
                      Already have an account?{" "}
                      <span className="text text-[#9AC5C1]">Sign In</span>
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </div>
          {isSubmitting && (
            <span className="loading loading-dots loading-lg z-10 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-400"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
