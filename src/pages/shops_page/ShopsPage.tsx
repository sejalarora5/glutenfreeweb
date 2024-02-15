import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ShopsStateType, fetchShops } from "../../redux/shopsSlice/shopsSlice";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  ShopsFilterStateType,
  fetchShopsFilter,
} from "../../redux/shopsFilterSlice/shopsFilterSlice";
import FilterSvg from "../../assets/filter-6535.svg";
import AutoComplete from "react-google-autocomplete";
import NavDrawerComponent from "../../components/NavDrawerComponent";
import Card from "../../components/Card";
import { UserStateType } from "../../redux/userSlice/userSlice";
import {
  ShopsDetailStateType,
  fetchShopsDetail,
} from "../../redux/shopsDetailSlice/shopsDetailSlice";
import Cross from "../../assets/icons_svg/ic_cross.svg";
import ShopsDetailModal from "../../components/ShopsDetailModal";

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

const ShopsPage = () => {
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    libraries,
  });

  const [position, setPosition] = useState({ latitude: -1, longitude: -1 });
  const [isRestaurant, setIsRestaurant] = useState(true);
  const [filterModal, setFilterModal] = useState(false);
  const [searchShop, setSearchShop] = useState("");
  const [detailModal, setDetailModal] = useState<number | "close">("close");
  const [restaurantFilterCheckedState, setRestauarantFilterCheckedState] =
    useState<Array<boolean>>([]);

  const appDispatch = useDispatch<AppDispatch>();

  const shopsSelector = useSelector<RootState>(
    (state) => state.shopsSlice
  ) as ShopsStateType;

  const shopsFilterSelector = useSelector<RootState>(
    (state) => state.shopsFilterSlice
  ) as ShopsFilterStateType;

  const shopsDetailSelector = useSelector<RootState>(
    (state) => state.shopsDetailSlice
  ) as ShopsDetailStateType;

  const userSelector = useSelector<RootState>(
    (state) => state.userSlice
  ) as UserStateType;

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
  }, []);

  useEffect(() => {
    if (position.latitude !== -1 && position.longitude !== -1) {
      console.log("second use effect called");
      appDispatch(
        fetchShops({
          latitude: position.latitude,
          longitude: position.longitude,
          type: isRestaurant ? 1 : 2,
        })
      );
    }
    appDispatch(fetchShopsFilter(isRestaurant ? 1 : 2));
  }, [position, isRestaurant]);

  return (
    <div>
      <div className="flex flex flex-row justify-center">
        <div className="w-96 mx-5">
          <div className="flex flex-col items-center">
            <div className="flex flex-row mt-2">
              <div className="flex-none">
                <div className="drawer drawer-start z-10">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    <label
                      htmlFor="my-drawer-4"
                      className="btn btn-square btn-ghost"
                    >
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
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                {isLoaded && (
                  <AutoComplete
                    defaultValue={
                      shopsSelector.data.success === true
                        ? shopsSelector.data.data.restaurant[0].location
                        : ""
                    }
                    apiKey={import.meta.env.VITE_MAPS_KEY}
                    className="input input-ghost mx-5"
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
              </div>
              <div className="flex-none">
                <button
                  onClick={() => {
                    setFilterModal(true);
                  }}
                  className="btn btn-square btn-ghost"
                >
                  <img src={FilterSvg} />
                </button>

                <dialog
                  open={filterModal}
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <button
                      onClick={() => {
                        setFilterModal(false);
                      }}
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>

                    <h3 className="font-bold text-lg">Filter</h3>

                    <ul>
                      {
                        //todo
                        shopsFilterSelector.data.success &&
                          shopsFilterSelector.data.data[0].cuisine.map(
                            (it, index) => {
                              return (
                                <li key={it.id}>
                                  {
                                    <label className="cursor-pointer label">
                                      <span className="label-text">
                                        {it.name}
                                      </span>
                                      <input
                                        type="checkbox"
                                        className="checkbox checkbox-secondary"
                                        checked={
                                          restaurantFilterCheckedState[index]
                                        }
                                        onChange={() => {
                                          setRestauarantFilterCheckedState(
                                            (prev) =>
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
                            }
                          )
                      }
                    </ul>
                  </div>
                </dialog>
              </div>
            </div>

            <div className="my-2 ">
              <input
                value={searchShop}
                onChange={(it) => {
                  setSearchShop(it.target.value);
                }}
                placeholder="Search"
                className="input input-bordered w-80"
              />
            </div>
          </div>
          <div>
            <div role="tablist" className="tabs tabs-bordered">
              <a
                onClick={() => setIsRestaurant(true)}
                role="tab"
                className={
                  isRestaurant ? "tab tab-active text-pink-400" : "tab"
                }
              >
                Restaurants
              </a>
              <a
                onClick={() => setIsRestaurant(false)}
                role="tab"
                className={
                  isRestaurant ? "tab" : "tab tab-active text-pink-400"
                }
              >
                Grocery Stores
              </a>
            </div>
            <ul className="h-screen no-scrollbar overflow-y-auto">
              {shopsSelector.data.success &&
                shopsSelector.data.data.restaurant
                  .filter((it) =>
                    it.name.toLowerCase().includes(searchShop.toLowerCase())
                  )
                  .map((it) => (
                    <li key={it.id} className="my-4">
                      <Card
                        image={it.banner}
                        rating={it.rating}
                        title={it.name}
                        onClick={() => {
                          setDetailModal(it.id);
                          appDispatch(
                            fetchShopsDetail({
                              token: userSelector.token,
                              userId: userSelector.userData.token,
                              restaurantId: it.id,
                            })
                          );
                        }}
                      />
                    </li>
                  ))}
            </ul>

            <dialog
              open={detailModal !== "close"}
              id="detailModal"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <div>
                  <div className="modal-action">
                    <svg
                      className="swap-on fill-current btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 512 512"
                      onClick={() => setDetailModal("close")}
                    >
                      <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                  </div>
                  <ShopsDetailModal />
                </div>
              </div>
            </dialog>
          </div>
        </div>
        <div className="h-screen flex-1 my-5 mr-5 hidden sm:flex">
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
                shopsSelector.data.data.restaurant.map((shops, index) => {
                  return (
                    <Marker
                      key={index}
                      position={{
                        lat: parseFloat(shops.lat),
                        lng: parseFloat(shops.lng),
                      }}
                    />
                  );
                })
              }
            </GoogleMap>
          )}
        </div>
      </div>
      {(shopsSelector.loading || shopsDetailSelector.loading) && (
        <span className="loading loading-dots loading-lg z-10 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-400"></span>
      )}
    </div>
  );
};

export default ShopsPage;
