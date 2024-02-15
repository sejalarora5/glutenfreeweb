import { Link, useLocation, useNavigate } from 'react-router-dom'
import CustomInput from '../../components/CustomInput'
import Location from "../../assets/location1.svg";
import Email from "../../assets/email.svg";
import User from "../../assets/user.svg";
import Stethoscope from "../../assets/stethoscope.svg";
import { useSelector } from 'react-redux';
import { UserStateType } from '../../redux/userSlice/userSlice';
import { RootState } from '../../redux/store';
import appIcon from "../../assets/appIcon.png";
import { useState } from 'react';


export const Profile = () => {

    const navigate = useNavigate();

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [city, setCity] = useState<string>();
    const [glutenintolerant, setGlutenintolerant] = useState<string>();
    const userSelector = useSelector<RootState>(
        (state) => state.userSlice
    ) as UserStateType;

    return (
        <div>

            <div className='flex items-center justify-center h-screen'>
                <div className='bg-gray-100 p-6 sm:p-16 lg:p-20 shadow-lg rounded-lg box-shadow-custom width-custom sm:width-mobile lg:width-web' >

                    <div className='flex flex-col items-center justify-center'>
                        <div className="flex items-center">
                            <img src={appIcon} alt="Logo" className="md:h-24 mb-8 -mt-3 h-14" />
                        </div>
                        <CustomInput
                            isReadOnly={true}
                            placeholder={'Full Name'}
                            value={userSelector?.userData?.name}
                            onChange={(it) => setName(it.target.value)}
                            icon={<img src={User} alt="Full Name" />}
                        />
                        <CustomInput
                            isReadOnly={true}
                            placeholder={'Email Id'}
                            icon={<img src={Email} alt="Email" />}
                            value={userSelector?.userData?.email}
                            onChange={(it) => setEmail(it.target.value)}
                        />
                        <CustomInput
                            isReadOnly={true}
                            value={userSelector?.userData?.city}
                            onChange={(it) => setCity(it.target.value)}
                            placeholder={'City'}
                            icon={<img src={Location} alt="Location" />}
                        />
                        <CustomInput
                            isReadOnly={true}
                            value={userSelector?.userData?.glutenintolerant}
                            onChange={(it) => setGlutenintolerant(it.target.value)}
                            placeholder={'City'}
                            icon={<img src={Stethoscope} alt="Location" />}
                        />

                    </div>
                    <div className="relative flex justify-center my-3">
                        <button
                        onClick={()=>navigate('/editProfile')}
                            // className="px-4 py-3 bg-[#b87290] text-white rounded-md w-56"
                            className="btn btn-primary pl-10 pr-10 py-3 md:text-md text-sm w-72 sm:w-64 md:w-72 lg:w-90 bg-[#b87290] text-white rounded-md focus:outline-none shadow-md font-semibold"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
