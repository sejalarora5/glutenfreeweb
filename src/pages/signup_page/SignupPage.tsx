import { Formik } from "formik";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import appIcon from "../../assets/appIcon.png";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";

export interface Data {
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

export interface SignUpObject {
  success: boolean;
  message: string;
  token: string;
  data: Data;
}

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

  return (
    <div className="flex justify-center  w-screen">
      <div className="px-8 py-5 bg-slate-200 card shadow-xl mt-4">
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
              <img src={appIcon} alt="app icon" width={150} height={150} />
              <div className="sm:flex sm:flex-row">
                <div className="flex flex-col items-center">
                  <div className="mt-5">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className="input input-bordered input-secondary w-80 "
                      value={values.fullName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className="mt-1  text-red-500 text-sm ">
                      {errors.fullName && touched.fullName && errors.fullName}
                    </p>
                  </div>
                  <div className="mt-5">
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
                  <div className="mt-5">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      className="input input-bordered input-secondary w-80"
                      value={values.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className="mt-1  text-red-500 text-sm">
                      {errors.city && touched.city && errors.city}
                    </p>
                  </div>

                  <div className="mt-5">
                    <h4>ARE YOU COELIAC OR GLUTEN INTOLERANT</h4>
                    <div className="form-control mt-1">
                      <label className="label cursor-pointer">
                        <span className="label-text">Coeliac</span>
                        <input
                          type="radio"
                          name="glutenCoeliac"
                          value={"Coeliac"}
                          className="radio radio-secondary"
                          checked={selectedValue === "Coeliac"}
                          onChange={() => {
                            setSelectedValue("Coeliac");
                          }}
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Gluten Intolerant</span>
                        <input
                          type="radio"
                          name="glutenCoeliac"
                          value={"Gluten Intolerant"}
                          className="radio radio-secondary"
                          checked={selectedValue === "Gluten Intolerant"}
                          onChange={() => {
                            setSelectedValue("Gluten Intolerant");
                          }}
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">None</span>
                        <input
                          type="radio"
                          value={"None"}
                          name="glutenCoeliac"
                          className="radio radio-secondary"
                          checked={selectedValue === "None"}
                          onChange={() => {
                            setSelectedValue("None");
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:ml-5">
                  <div className="mt-5">
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
                  <div className="mt-5">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="input input-bordered input-secondary w-80"
                      value={values.confirmPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <p className="mt-1  text-red-500 text-sm">
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="mt-8">
                  <button
                    className="btn btn-secondary w-52"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Signup
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="btn btn-ghost w-52 mt-5"
                >
                  Back to login
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      {isSubmitting && (
        <span className="loading loading-dots loading-lg z-10 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-400"></span>
      )}
    </div>
  );
};

export default SignupPage;
