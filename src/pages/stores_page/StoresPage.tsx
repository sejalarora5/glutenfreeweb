import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import AutoComplete from "react-google-autocomplete";
import FilterSvg from "../../assets/filter-6535.svg";
import LocationSvg from "../../assets/location.svg";
import { StoreFilterData } from "./types";
import NavDrawerComponent from "../../components/NavDrawerComponent";
import { RestaurantFilterData } from "../restaurants_page/types";

export interface Store {
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
  restaurant: Store[];
  meta: Meta;
}

export interface StoresData {
  success: boolean;
  data: Data;
}
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

const libraries: Libraries = ["places", "core", "maps", "marker"];

const StoresPage = () => {
  const [StoresData, setStoresData] = useState<StoresData>();
  const [restaurantsData, setRestaurantsData] = useState<RestaurantsData>();
  const [restaurantsChecked, setRestaurantsChecked] = useState<boolean>(true);
  const [position, setPosition] = useState({ latitude: -1, longitude: -1 });
  const [loading, setLoading] = useState(false);
  const [searchStore, setSearchStore] = useState("");
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [StoreFilterData, setStoreFilterData] =
    useState<StoreFilterData>();
  const [showModal, setShowModal] = useState(false);
  const [StoreFilterCheckedState, setStoreFilterCheckedState] =
    useState<Array<boolean>>([]);
  const [restaurantFilterData, setRestaurantFilterData] = useState<RestaurantFilterData>();
  const [restaurantFilterCheckedState, setRestauarantFilterCheckedState] =
    useState<Array<boolean>>([]);

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
    getStoreFilterData();
    getRestaurantFilterData
  }, []);

  useEffect(() => {
    if (position.latitude !== -1 && position.longitude !== -1) {
      // console.log("second use effect called");
      handleRestaurants();
    }
  }, [position]);

  const getStoreFilterData = async () => {
    try {
      const { data } = await axios.get<StoreFilterData>(
        `http://backend.glutenfreejio.com/api/get-filterlist?type=2`
      );
      setStoreFilterData(data);
      setStoreFilterCheckedState(
        new Array(data.data[0].cuisine.length).fill(false)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getRestaurantFilterData = async () => {
    try {
      const { data } = await axios.get<RestaurantFilterData>(
        `http://backend.glutenfreejio.com/api/get-filterlist?type=1`
      );
      setRestaurantFilterData(data);
      setRestauarantFilterCheckedState(
        new Array(data.data[0].cuisine.length).fill(false)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleStores = async () => {
    setRestaurantsChecked(false)
    try {
      setLoading(true);
      const url = `http://backend.glutenfreejio.com/api/get-shop?type=2&lat=${position.latitude
        }&lng=${position.longitude}&currentPage=${1}`;

      const { data } = await axios.get<StoresData>(url);

      console.log(JSON.stringify(data));
      setStoresData(data);
      console.log(data, 'data>>>>>>>>>>>')
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurants = async () => {
    setRestaurantsChecked(true)
    try {
      setLoading(true);

      const url = `http://backend.glutenfreejio.com/api/get-shop?type=1&lat=${position.latitude
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
    <div className="flex flex-row h-screen overflow-hidden">
      <div className="w-1/4 h-screen overflow-y-auto">
        <div className="navbar bg-base-100">
          <div className="flex-none">
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
                  {restaurantFilterData?.data[0].cuisine.map((it, index) => (
                    <li key={it.id}>
                      <label className="cursor-pointer label">
                        <span className="label-text">{it.name}</span>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-secondary"
                          checked={restaurantFilterCheckedState[index]}
                          onChange={() => {
                            setRestauarantFilterCheckedState((prev) =>
                              prev.map((item, _index) => (_index === index ? !item : item))
                            );
                          }}
                        />
                      </label>
                    </li>
                  ))}
                  {!restaurantFilterData && // Check if restaurantFilterData is falsy
                    StoreFilterData?.data[0].cuisine.map((it, index) => (
                      <li key={it.id}>
                        <label className="cursor-pointer label">
                          <span className="label-text">{it.name}</span>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-secondary"
                            checked={StoreFilterCheckedState[index]}
                            onChange={() => {
                              setStoreFilterCheckedState((prev) =>
                                prev.map((item, _index) => (_index === index ? !item : item))
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
          <div className="sm:flex-row flex-col">
            <div className="flex-none">
              <div className="drawer drawer-start z-10">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-8 h-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <NavDrawerComponent />
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
            {isLoaded && (
              <div className="flex flex-row">
                <img className="w-5 ml-5" src={LocationSvg} />
                <AutoComplete
                  defaultValue={restaurantsChecked ? restaurantsData?.data.restaurant[0].location : StoresData?.data.restaurant[0].location}
                  apiKey={'AIzaSyCxwZbZ0fWFCgM8xqY9pLmhdAsHd9h3iqw'}
                  className="input outline-none border-none"
                  style={{ outline: 'none', border: 'none' }}
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
              </div>
            )}
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="btn btn-square btn-ghost"
            >
              <img src={FilterSvg} />
            </button>
          </div>
        </div>
        <div className="my-2 text-center">
          <input
            value={restaurantsChecked ? searchRestaurant : searchStore}
            onChange={(it) => {
              restaurantsChecked ? setSearchRestaurant(it.target.value) :
                setSearchStore(it.target.value);
            }}
            type="text"
            placeholder="Search"
            className="input input-bordered input-md w-full max-w-xs"
          />

        </div>

        <div role="tablist" className="tabs tabs-bordered mx-2 ">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Restaurants"
            checked={restaurantsChecked}
            onClick={() => handleRestaurants()}
          />

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Grocery Stores"
            onClick={() => handleStores()}
          />
        </div>

        <div className="flex flex-row h-screen overflow-y-auto">
          <ul>
            {restaurantsChecked
              ? restaurantsData?.data?.restaurant
                .filter((it) => {
                  if (searchRestaurant === "") {
                    return it;
                  } else {
                    return it.name.toLowerCase().includes(searchRestaurant.toLowerCase());
                  }
                }).map((it) => (
                  <li key={it.id} className="my-3 mx-2">
                    <Card
                      image={it.banner}
                      title={it.name}
                      rating={it.rating}
                      location={it?.location}
                      onClick={() => {
                        console.log("card clicked with name " + it.name);
                      }}
                    />
                  </li>
                ))
              : StoresData?.data?.restaurant
                .filter((it) => {
                  if (searchStore === "") {
                    return it;
                  } else {
                    return it.name.toLowerCase().includes(searchStore.toLowerCase());
                  }
                })
                .map((it) => (
                  <li key={it.id} className="my-3 mx-2">
                    <Card
                      image={it.banner}
                      title={it.name}
                      rating={it.rating}
                      location={it?.location}
                      onClick={() => {
                        console.log("card clicked with name " + it.name);
                      }}
                    />
                  </li>
                ))}
          </ul>
        </div>
      </div>


      <div>
      </div>
      <div className="w-3/4 h-full">
        <div className="h-screen my-1 mx-1">
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
                restaurantsChecked ? (
                  restaurantsData?.data?.restaurant.map((Store, index) => (
                    <Marker
                      key={index}
                      position={{
                        lat: parseFloat(Store.lat),
                        lng: parseFloat(Store.lng),
                      }}
                    />
                  ))
                ) : (
                  StoresData?.data?.restaurant.map((Store, index) => (
                    <Marker
                      key={index}
                      position={{
                        lat: parseFloat(Store.lat),
                        lng: parseFloat(Store.lng),
                      }}
                    />
                  ))
                )
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

export default StoresPage;