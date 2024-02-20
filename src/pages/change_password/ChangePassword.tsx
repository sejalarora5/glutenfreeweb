import { Formik } from "formik";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import EyeSvg from "../../assets/icons_svg/eye-slash-fill.svg";
import OpenEyeSvg from "../../assets/icons_svg/eye_open5.svg";
import passwordIcon from "../../assets/icons_svg/ic_password.svg";
import { useSelector } from "react-redux";
import { UserStateType } from "../../redux/userSlice/userSlice";
import { RootState } from "../../redux/store";
const ChangePassword = () => {
  const navigate = useNavigate();
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        currentPassword: Yup.string()
          .required()
          .min(6)
          .label("Current Password"),
        newPassword: Yup.string().required().min(6).label("New Password"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword")], "Passwords must match")
          .required()
          .label("Confirm Password"),
      }),
    []
  );
  const userSelector = useSelector<RootState>(
    (state) => state.userSlice
  ) as UserStateType;
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  function toggleCurrentPasswordVisibility() {
    setShowCurrentPassword((prevState: any) => !prevState);
  }
  function toggleNewPasswordVisibility() {
    setShowNewPassword((prevState: any) => !prevState);
  }
  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword((prevState: any) => !prevState);
  }
  const [loading, setLoading] = useState(false);
  const handleChangePass = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/change-password",
        {
          userid: userSelector?.userData.id.toString(),
          oldpassword: currentPassword,
          password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: userSelector.userData.id.toString(),
          },
        }
      );
      if (data.success) {
        navigate("/");
        console.log("Successfully changed");
        toast.success(data.message, { position: toast.POSITION.TOP_CENTER });
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
  return (
    <div className="flex relative bg-cover bg-center bg-[url('/src/assets/logo.png')]">
      <div className="backdrop-blur-sm backdrop-brightness-50 bg-white/60">
        <div className="flex  justify-center items-center h-screen w-screen">
          <div className="w-96 py-5 bg-base-100 card shadow-xl shadow-xl shadow-[#808080]">
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleChangePass(
                  values.currentPassword,
                  values.newPassword,
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
                  <h2 className="text text-large font-bold mb-3">
                    Change Password
                  </h2>
                  <div className="mt-4 flex flex-col">
                    <div className="flex h-13 w-80 bg-[#F3F3F3] rounded">
                      <img
                        src={passwordIcon}
                        className="ml-3 w-6 object-fill self-center"
                      />
                      <div className="flex flex-col w-full">
                        <label className="ml-3 mt-1 text-[#808080] text-md">
                          Current Password
                        </label>
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          placeholder="Current Password"
                          className="input input-sm h-8 ml-0 max-w-xs bg-[#F3F3F3] w-auto outline-none focus:bg-[#F3F3F3] focus:outline-none focus:border-none appearance-none "
                          value={values.currentPassword}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="">
                        <button
                          type="button"
                          onClick={toggleCurrentPasswordVisibility}
                          className="btn w-auto hover:border-none focus:outline-none hover:bg-transparent"
                        >
                          {showCurrentPassword ? (
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
                      {errors.currentPassword &&
                        touched.currentPassword &&
                        errors.currentPassword}
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
                          New Password
                        </label>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          placeholder="New Password"
                          className="input input-sm ml-0 h-8 max-w-xs bg-[#F3F3F3] w-auto outline-none focus:bg-[#F3F3F3] focus:outline-none focus:border-none appearance-none "
                          value={values.newPassword}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="">
                        <button
                          type="button"
                          onClick={toggleNewPasswordVisibility}
                          className="btn w-auto hover:border-none focus:outline-none hover:bg-transparent"
                        >
                          {showNewPassword ? (
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
                      {errors.newPassword &&
                        touched.newPassword &&
                        errors.newPassword}
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
                  <div className="mt-8">
                    <button
                      className="btn w-80 text-[#fff] bg-gradient-to-r from-[#c36d91] from-10% to-[#f57fb0] to-90% .. "
                      type="submit"
                      disabled={loading}
                    >
                      CHANGE PASSWORD
                    </button>
                  </div>
                  <Link
                    to={"/"}
                    type="button"
                    className="btn btn-ghost text-[#808080] w-92 mt-5 hover:bg-transparent"
                  >
                    Cancel
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

export default ChangePassword;
