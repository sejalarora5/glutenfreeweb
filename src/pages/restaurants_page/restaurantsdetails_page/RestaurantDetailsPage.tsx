import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { UserStateType } from "../../../redux/userSlice/userSlice";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { libraries } from "../RestaurantsPage";

export interface Restaurant_rating {
  id: number;
  userid: string;
  title: string;
  name: string;
  date: string;
  comment: string;
  star: string;
  restaurantid: number;
  image: string;
}

export interface Data {
  name: string;
  description: string;
  banner: string;
  location: string;
  lat: string;
  lng: string;
  zip: string;
  cuisine: string;
  phone_number: string;
  glutenfacility: boolean;
  status: string;
  type: string;
  opening_hours: string;
  website?: any;
  restaurant_rating: Restaurant_rating;
  rating_count: number;
  avg_count: number;
  bookmark: boolean;
}

export interface RestaurantDetailsObject {
  success: boolean;
  data: Data;
}

const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();
  const [restaurantsDetailsData, setRestaurantsDetailsData] =
    useState<RestaurantDetailsObject>();
  const [loading, setLoading] = useState(false);
  const userSelector = useSelector<RootState>(
    (state) => state.userSlice
  ) as UserStateType;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    libraries,
  });

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      setLoading(true);
      const url =
        userSelector.token !== ""
          ? `${import.meta.env.VITE_BASE_URL}/api/single-shop?restaurantid=${
              restaurantId as string
            }&userId=${userSelector.userData.id}&bookmark=1`
          : `${import.meta.env.VITE_BASE_URL}/api/single-shop?restaurantid=${
              restaurantId as string
            }&bookmark=0`;
      const { data } = await axios.get<RestaurantDetailsObject>(url);
      setRestaurantsDetailsData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {restaurantsDetailsData !== undefined && (
        <div>
          <figure className="">
            <img src={restaurantsDetailsData.data.banner} />
          </figure>
          <h2 className="font-semibold text-2xl m-5">
            {restaurantsDetailsData.data.name}
          </h2>
          <p className="text-lg font-medium mx-5">
            {restaurantsDetailsData.data.location}
          </p>
          <div className="flex flex-row items-center justify-between m-5 sm:w-1/2">
            <Rating
              style={{ maxWidth: 150 }}
              value={restaurantsDetailsData.data.avg_count}
              readOnly
            />
            <h3 className="text-sm font-medium">
              {"Phone:- " + restaurantsDetailsData.data.phone_number}
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
              viewBox="0 0 48 48"
            >
              <path
                fill="#F44336"
                d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"
              ></path>
            </svg>
          </div>
          <h4 className="text-sm mx-5 mb-5">
            {restaurantsDetailsData.data.cuisine}
          </h4>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{
                height: window.innerHeight / 2,
                flex: 1,
                borderRadius: 8,
              }}
              center={{
                lat: parseFloat(restaurantsDetailsData.data.lat),
                lng: parseFloat(restaurantsDetailsData.data.lng),
              }}
              zoom={14}
            >
              <Marker
                key={restaurantsDetailsData.data.zip.toString()}
                position={{
                  lat: parseFloat(restaurantsDetailsData.data.lat),
                  lng: parseFloat(restaurantsDetailsData.data.lng),
                }}
              />
            </GoogleMap>
          )}
        </div>
      )}

      {loading && (
        <span className="loading loading-dots loading-lg z-10 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-400"></span>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
