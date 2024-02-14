import { Link, useLocation } from 'react-router-dom'
import CustomInput from '../../components/CustomInput'
import Cloche from "../../assets/cloche.svg";
import Location from "../../assets/location1.svg";
import IDcard from "../../assets/id-card.svg";
import Briefcase from "../../assets/briefcase.svg";
import AutoComplete from "react-google-autocomplete";
import { useEffect, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import axios, { AxiosRequestConfig } from 'axios';
import { useSelector } from 'react-redux';
import { UserStateType } from '../../redux/userSlice/userSlice';
import { RootState } from '../../redux/store';

export interface Cuisine {
    id: number;
    name: string;
}

export interface Data {
    gluten: string;
    cuisine: Cuisine[];
}

export interface CusineFilterData {
    success: boolean;
    data: Data[];
}

export declare type Library =
    | "core"
    | "maps"
    | "places"
    | "geocoding"
    | "routes"
    | "marker"
    | "geometry"
    | "elevation"
    | "streetView"
    | "journeySharing"
    | "drawing"
    | "visualization";
export declare type Libraries = Library[];

const libraries: Libraries = ["places", "core", "maps", "marker"];


export const AddBusiness = () => {

    const data = useLocation();
    const businessType = data.state;



    const [position, setPosition] = useState({ latitude: -1, longitude: -1 });
    const [name, setName] = useState<string>();
    const [cusine, setCusine] = useState<string>();
    const [place, setPlace] = useState<string>();
    const [Cus, setCus] = useState<Cuisine[]>([]);
    const [cusineFilterData, setcusineFilterData] =
        useState<CusineFilterData>();
    const [showModal, setShowModal] = useState(false);
    const [cusineFilterCheckedState, setCusineFilterCheckedState] =
        useState<Array<boolean>>([]);
    const userSelector = useSelector<RootState>(
        (state) => state.userSlice
    ) as UserStateType;



    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: 'AIzaSyCxwZbZ0fWFCgM8xqY9pLmhdAsHd9h3iqw',
        libraries,
    });


    useEffect(() => {
        // console.log("first use effect called");
        navigator.geolocation.getCurrentPosition(
            (success) => {
                const { latitude, longitude } = success.coords;
                setPosition({ latitude, longitude });
                console.log(success.coords);
            },
            (err) => {
                console.log(err);
            }
        );
        getCusineFilterData()
    }, []);


    const updateSetCus = () => {
        const newSetCus = cusineFilterData?.data[0].cuisine
            .filter((_, index) => cusineFilterCheckedState[index])
            .map((it) => it) as Cuisine[]; // Type assertion to Cuisine[]

        setCus(newSetCus);
    };

    const getCusineFilterData = async () => {
        try {
            const { data } = await axios.get<CusineFilterData>(
                `${import.meta.env.VITE_BASE_URL}/api/get-filterlist?type=1`
            );
            console.log(data, "datadatadatadatadata")
            setcusineFilterData(data);
            setCusineFilterCheckedState(
                new Array(data.data[0].cuisine.length).fill(false)
            );
            console.log(cusineFilterData, "cusineFilterDatacusineFilterData")
        } catch (error) {
            console.log(error);
        }
    };



    const addBusiness = async () => {
        let dataa = {
            title: name,
            type: businessType === 'RESTAURANTS' ? 'Restaurant' : 'Grocery Store',
            location: place,
            categories: Cus[0].name.toString(),
            lng: position.longitude.toString(),
            lat: position.latitude.toString(),
            zip: '0000000'
        }

        console.log(dataa, "dataadataa")
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/add-business`,
                {
                    title: name,
                    type: businessType === 'RESTAURANTS' ? 'Restaurant' : 'Grocery Store',
                    location: place,
                    categories: Cus[0].name.toString(),
                    lng: position.longitude,
                    lat: position.latitude,
                    zip: '0000000'
                },
                {
                    headers: {
                        Authorization: userSelector.token,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(data, "data");
        } catch (e) {
            console.error(e);
        } finally {
            console.log('Done');
        }
    };


    console.log(userSelector.token, "userSelector.token")

    const filterModal = () => {
        return (
            <div>
                <dialog
                    open={showModal}
                    className="modal modal-bottom md:modal-middle"
                >
                    <div className="modal-box w-full md:w-96 h-auto md:h-96">
                        <button
                            onClick={() => { updateSetCus(), setShowModal(false) }}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>

                        <h3 className="font-bold text-lg">Filter</h3>
                        <ul>
                            {cusineFilterData?.data[0].cuisine.map((it, index) => (
                                <li key={it.id}>
                                    <label className="cursor-pointer label">
                                        <span className="label-text">{it.name}</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-secondary"
                                            checked={cusineFilterCheckedState[index]}
                                            onChange={() => {
                                                setCusineFilterCheckedState((prev) =>
                                                    prev.map((item, _index) =>
                                                        _index === index ? !item : item
                                                    )
                                                );
                                            }}
                                        />
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </dialog>
            </div>
        )
    }

    return (
        <div>
            <div className="navbar bg-base-100 shadow-lg">
                <div className="navbar-start">
                    <Link to={'/suggestBusiness'} >
                        <div role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                        </div>
                    </Link>
                </div>
                <div className='navbar-center -ml-20'>
                    <span className="text-xl">Suggest a Business</span>
                </div>
            </div>

            <div className='flex items-center justify-center h-screen'>
                <div className='bg-gray-100 p-10 shadow-lg rounded-lg' style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', width: '300px' }}>
                    <div className='flex flex-col items-center justify-center'>
                        <CustomInput
                            placeholder={'Business Type'}
                            value={businessType === 'RESTAURANTS' ? 'Restaurant' : 'Grocery Store'}
                            icon={<img src={Briefcase} alt="Business Type" />}
                        />
                        <CustomInput
                            placeholder={'Name'}
                            icon={<img src={IDcard} alt="Name" />}
                            value={name}
                            onChange={(it) => setName(it.target.value)}
                        />
                        <CustomInput
                            value={Cus[0]?.name}
                            onClick={() => {
                                setShowModal(true);
                            }}

                            placeholder={'Add Cusine'}
                            icon={<img src={Cloche} alt="Add Cusine" />}
                        />

                        {isLoaded &&
                            <div className="relative my-3 flex items-cente">
                                <span className="absolute h-8 w-8 inset-y-3 left-0 pl-2">
                                    <img src={Location} alt="Location" />
                                </span>
                                {/* Styling the AutoComplete component */}
                                <AutoComplete
                                    defaultValue={''}
                                    apiKey={'AIzaSyCxwZbZ0fWFCgM8xqY9pLmhdAsHd9h3iqw'}
                                    className="pl-10 pr-4 py-3 bg-gray-200 border rounded-md focus:outline-none shadow-md focus:border-gray-300"
                                    onPlaceSelected={(place) => {
                                        const position = place.geometry?.location;
                                        if (
                                            position?.lat() !== undefined &&
                                            position.lng() !== undefined
                                        ) {
                                            setPosition({
                                                latitude: position.lat(),
                                                longitude: position.lng(),
                                            })
                                            setPlace(place?.formatted_address)
                                        }
                                    }}
                                />
                            </div>
                        }


                    </div>
                    <div className="relative flex justify-center my-3">
                        <button
                            onClick={() => {
                                if (name !== '' && place !== '' && Cus.length > 0) {
                                    addBusiness()
                                } else {
                                    alert('Please fill all the details');
                                }
                            }}
                            className="px-4 py-3 bg-[#b87290] text-white rounded-md w-56"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            {filterModal()}
        </div>
    )
}
