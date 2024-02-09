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

export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  date: string;
  role: string;
  phone: string;
  glutenintolerant: string;
  city: string;
  status: string;
  token: string;
  country_code?: any;
  device_token?: any;
  device_type?: any;
}

export interface LoginObject {
  success: boolean;
  message: string;
  token: string;
  data: UserData;
}

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
  const handleLogin = async (email: string, password: string) => {
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
    <div className="flex  justify-center items-center h-screen w-screen">
      <div className="w-96 py-5 bg-slate-200 card shadow-xl">
        <Formik
          initialValues={{
            emailId: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleLogin(values.emailId, values.password);
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

              <div className="mt-5 flex flex-col">
                <label className="ml-2 mb-2 text-lg font-medium">Email</label>
                <input
                  type="email"
                  name="emailId"
                  placeholder="Email here"
                  className="input input-bordered input-secondary w-80"
                  value={values.emailId}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="mt-1  text-red-500 text-sm">
                  {errors.emailId && touched.emailId && errors.emailId}
                </p>
              </div>

              <div className="mt-5 flex flex-col">
                <label className="ml-2 mb-2 text-lg font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered input-secondary w-80"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="mt-1 text-red-500 text-sm">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>

              <div className="mt-8">
                <button
                  className="btn btn-secondary w-52"
                  type="submit"
                  disabled={loading}
                >
                  Login
                </button>
              </div>
              <Link
                to={"/signup"}
                type="button"
                className="btn btn-ghost w-52 mt-5"
              >
                New Here? <span className="text-sky-500">Register</span>
              </Link>
            </form>
          )}
        </Formik>
      </div>
      {loading && (
        <span className="loading loading-dots loading-lg z-10 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-400"></span>
      )}
    </div>
  );
};

export default LoginPage;
