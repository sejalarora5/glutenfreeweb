import { Formik } from "formik";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import emailIcon from "../../assets/icons_svg/ic_email.svg";
import AuthField from "../../components/AuthField";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        emailId: Yup.string().required().email().label("Email"),
      }),
    []
  );
  const [loading, setLoading] = useState(false);
  const handleForgotPass = async (email: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/forgot-password",
        { email }
        // true
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
                emailId: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleForgotPass(values.emailId);
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
                    Forgot Password
                  </h2>
                  <h2 className="text text-large text-center text-[#515C6F] font-medium w-80">
                    Please enter your registered email address to reset your
                    password
                  </h2>
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
                  <div className="mt-8">
                    <button
                      className="btn w-80 text-[#fff] bg-gradient-to-r from-[#c36d91] from-10% to-[#f57fb0] to-90% .. "
                      type="submit"
                      disabled={loading}
                    >
                      RESET PASSWORD
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

export default ForgotPassword;
