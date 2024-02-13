import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ShopsStateType, fetchShops } from "../../redux/shopsSlice/shopsSlice";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { fetchShopsFilter } from "../../redux/shopsFilterSlice/shopsFilterSlice";
import FilterSvg from "../../assets/filter-6535.svg";
import AutoComplete from "react-google-autocomplete";

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

  const appDispatch = useDispatch<AppDispatch>();

  const shopsSelector = useSelector<RootState>(
    (state) => state.shopsSlice
  ) as ShopsStateType;

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
      <div className="flex flex-row justify-center">
        <div>
          <div className="flex flex-row w-96 bg-red-400">
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
                    }
                  </ul>
                </div>
              </dialog>
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
            </div>
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
      {shopsSelector.loading && (
        <span className="loading loading-dots loading-lg z-10 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-400"></span>
      )}
    </div>
  );
};

export default ShopsPage;
