import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import AutoComplete from "react-google-autocomplete";
import FilterSvg from "../../assets/filter-6535.svg";
import { RestaurantFilterData } from "./types";
import { useNavigate } from "react-router-dom";

export interface Restaurant {
  id: number;
  distance: number;
  name: string;
  description: string;
  banner: string;
  location: string;
  lat: string;
  lng: string;
  zip: string;
  cuisine: string;
  phone_number: string;
  glutenfacility: string;
  opening_hours: string;
  website?: any;
  most_celiac?: any;
  rating: number;
}

export interface Meta {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  count: number;
}

export interface Data {
  restaurant: Restaurant[];
  meta: Meta;
}

export interface RestaurantsData {
  success: boolean;
  data: Data;
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

export const libraries: Libraries = ["places", "core", "maps", "marker"];

const RestaurantsPage = () => {
  const [restaurantsData, setRestaurantsData] = useState<RestaurantsData>();
  const [position, setPosition] = useState({ latitude: -1, longitude: -1 });
  const [loading, setLoading] = useState(false);
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [restaurantFilterData, setRestaurantFilterData] =
    useState<RestaurantFilterData>();
  const [showModal, setShowModal] = useState(false);
  // const [showRestaurantDetail, setShowRestaurantDetail] = useState(false);
  const [restaurantFilterCheckedState, setRestauarantFilterCheckedState] =
    useState<Array<boolean>>([]);

  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    libraries,
  });

  useEffect(() => {
    console.log("first use effect called");
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
    getRestaurantFilterData();
  }, []);

  useEffect(() => {
    if (position.latitude !== -1 && position.longitude !== -1) {
      console.log("second use effect called");
      handleRestaurants();
    }
  }, [position]);

  const getRestaurantFilterData = async () => {
    try {
      const { data } = await axios.get<RestaurantFilterData>(
        `${import.meta.env.VITE_BASE_URL}/api/get-filterlist?type=1`
      );
      setRestaurantFilterData(data);
      setRestauarantFilterCheckedState(
        new Array(data.data[0].cuisine.length).fill(false)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestaurants = async () => {
    try {
      setLoading(true);

      const url = `${import.meta.env.VITE_BASE_URL}/api/get-shop?type=1&lat=${
        position.latitude
      }&lng=${position.longitude}&currentPage=${1}`;

      const { data } = await axios.get<RestaurantsData>(url);

      console.log(JSON.stringify(data));
      setRestaurantsData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="navbar bg-base-100">
          <div className="flex-none">
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="btn btn-square btn-ghost"
            >
              <img src={FilterSvg} />
            </button>

            <dialog
              open={showModal}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>

                <h3 className="font-bold text-lg">Filter</h3>

                <ul>
                  {
                    //todo
                    restaurantFilterData?.data[0].cuisine.map((it, index) => {
                      return (
                        <li key={it.id}>
                          {
                            <label className="cursor-pointer label">
                              <span className="label-text">{it.name}</span>
                              <input
                                type="checkbox"
                                className="checkbox checkbox-secondary"
                                checked={restaurantFilterCheckedState[index]}
                                onChange={() => {
                                  setRestauarantFilterCheckedState((prev) =>
                                    prev.map((item, _index) =>
                                      _index === index ? !item : item
                                    )
                                  );
                                }}
                              />
                            </label>
                          }
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            </dialog>
          </div>
          <div className="sm:flex-row flex-col">
            {isLoaded && (
              <AutoComplete
                defaultValue={restaurantsData?.data.restaurant[0].location}
                apiKey={import.meta.env.VITE_MAPS_KEY}
                className="input input-bordered mx-5"
                onPlaceSelected={(place) => {
                  const position = place.geometry?.location;
                  if (
                    position?.lat() !== undefined &&
                    position.lng() !== undefined
                  ) {
                    setPosition({
                      latitude: position.lat(),
                      longitude: position.lng(),
                    });
                  }
                }}
              />
            )}

            <input
              value={searchRestaurant}
              onChange={(it) => {
                setSearchRestaurant(it.target.value);
              }}
              placeholder="Search Restaurants"
              className="input input-bordered"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="h-screen no-scrollbar overflow-y-auto">
          <ul>
            {restaurantsData !== undefined &&
              restaurantsData.data.restaurant
                .filter((it) => {
                  if (searchRestaurant === "") {
                    return it;
                  } else {
                    return it.name
                      .toLowerCase()
                      .includes(searchRestaurant.toLowerCase());
                  }
                })
                .map((it) => {
                  console.log(it.rating);
                  return (
                    <li key={it.id} className="my-5 mx-10">
                      <Card
                        image={it.banner}
                        title={it.name}
                        rating={it.rating}
                        onClick={() => {
                          navigate("/restaurantsDetails/" + it.id.toString());
                          console.log("card clicked with name " + it.name);
                        }}
                      />
                    </li>
                  );
                })}
          </ul>
        </div>
        <div className="h-screen flex-1 my-5 mr-5">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{
                height: window.innerHeight,
                flex: 1,
                borderRadius: 8,
              }}
              center={{
                lat: position.latitude,
                lng: position.longitude,
              }}
              zoom={12}
            >
              {
                //todo marker
                restaurantsData?.data.restaurant.map((restaurant, index) => {
                  return (
                    <Marker
                      key={index}
                      position={{
                        lat: parseFloat(restaurant.lat),
                        lng: parseFloat(restaurant.lng),
                      }}
                    />
                  );
                })
              }
            </GoogleMap>
          )}
        </div>
      </div>
      {loading && (
        <span className="loading loading-dots loading-lg z-10 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-400"></span>
      )}
    </div>
  );
};

export default RestaurantsPage;
