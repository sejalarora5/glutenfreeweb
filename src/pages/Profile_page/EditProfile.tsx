import CustomInput from '../../components/CustomInput'
import Location from "../../assets/location1.svg";
import Email from "../../assets/email.svg";
import User from "../../assets/user.svg";
import { useSelector } from 'react-redux';
import { UserStateType } from '../../redux/userSlice/userSlice';
import { RootState } from '../../redux/store';
import appIcon from "../../assets/appIcon.png";
import { useMemo, useState } from 'react';
import * as Yup from "yup";
import axios from 'axios';
import { toast } from 'react-toastify';

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

export const EditProfile = () => {

    const userSelector = useSelector<RootState>(
        (state) => state.userSlice
    ) as UserStateType;
    const [name, setName] = useState<string>(userSelector?.userData?.name || '');
    const [email, setEmail] = useState<string>(userSelector?.userData?.email);
    const [city, setCity] = useState<string>(userSelector?.userData?.city || '');
    const [selectedValue, setSelectedValue] = useState("None");


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

    const handleEditProfile = async () => {
        try {
            const { data } = await axios.post<SignUpObject>(
                import.meta.env.VITE_BASE_URL + "/api/edit-profile",
                {
                    name: name,
                    userid: userSelector?.userData?.id,
                    city: city,
                    glutenintolerant: selectedValue,
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
        }
    };

    return (
        <div>

            <div className='flex items-center justify-center h-screen md:py-2 py-5'>
                <div className='bg-gray-100 p-6 sm:p-16 lg:p-20 shadow-lg rounded-lg box-shadow-custom width-custom sm:width-mobile lg:width-web' >

                    <div className='flex flex-col items-center justify-center'>
                        <div className="flex items-center">
                            <img src={appIcon} alt="Logo" className="md:h-24 mb-8 -mt-3 md:-mt-10 h-14" />
                        </div>
                        <CustomInput
                            placeholder={'Full Name'}
                            value={name}
                            onChange={(it) => setName(it.target.value)}
                            icon={<img src={User} alt="Full Name" />}
                        />
                        <CustomInput
                            isReadOnly={true}
                            placeholder={'Email Id'}
                            icon={<img src={Email} alt="Email" />}
                            value={email}
                            onChange={(it) => setEmail(it.target.value)}
                        />
                        <CustomInput
                            value={city}
                            onChange={(it) => setCity(it.target.value)}
                            placeholder={'City'}
                            icon={<img src={Location} alt="Location" />}
                        />


                        <div className="mt-5">
                            <h3 className=" md:text-md text-sm w-72">ARE YOU COELIAC OR GLUTEN INTOLERANT ?</h3>
                            <div>
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
                    <div className="relative flex justify-center my-3 md:-mb-10">
                        <button
                        onClick={()=>handleEditProfile()}
                            // className="px-4 py-3 bg-[#b87290] text-white rounded-md w-56"
                            className="btn btn-primary pl-10 pr-10 py-3 md:text-md text-sm w-72 sm:w-64 md:w-72 lg:w-90 bg-[#b87290] text-white rounded-md focus:outline-none shadow-md font-semibold"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
