import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import AutoComplete from "react-google-autocomplete";
import FilterSvg from "../../assets/filter-6535.svg";
import { StoreFilterData } from "./types";

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
  const [position, setPosition] = useState({ latitude: -1, longitude: -1 });
  const [loading, setLoading] = useState(false);
  const [searchStore, setSearchStore] = useState("");
  const [StoreFilterData, setStoreFilterData] =
    useState<StoreFilterData>();
  const [showModal, setShowModal] = useState(false);
  const [StoreFilterCheckedState, setStoreFilterCheckedState] =
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
  }, []);

  useEffect(() => {
    if (position.latitude !== -1 && position.longitude !== -1) {
      // console.log("second use effect called");
      handleStores();
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

  const handleStores = async () => {
    try {
      setLoading(true);
      const url = `http://backend.glutenfreejio.com/api/get-shop?type=2&lat=${
        position.latitude
      }&lng=${position.longitude}&currentPage=${1}`;

      const { data } = await axios.get<StoresData>(url);

      console.log(JSON.stringify(data));
      setStoresData(data);
      console.log(data,'data>>>>>>>>>>>')
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
                    StoreFilterData?.data[0].cuisine.map((it, index) => {
                      return (
                        <li key={it.id}>
                          {
                            <label className="cursor-pointer label">
                              <span className="label-text">{it.name}</span>
                              <input
                                type="checkbox"
                                className="checkbox checkbox-secondary"
                                checked={StoreFilterCheckedState[index]}
                                onChange={() => {
                                  setStoreFilterCheckedState((prev) =>
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
                defaultValue={StoresData?.data.restaurant[0].location}
                apiKey={'AIzaSyCxwZbZ0fWFCgM8xqY9pLmhdAsHd9h3iqw'}
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
              value={searchStore}
              onChange={(it) => {
                setSearchStore(it.target.value);
              }}
              placeholder="Search Stores"
              className="input input-bordered"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="h-screen no-scrollbar overflow-y-auto">
          <ul>
            {StoresData !== undefined &&
              StoresData.data.restaurant
                .filter((it) => {
                  if (searchStore === "") {
                    return it;
                  } else {
                    return it.name
                      .toLowerCase()
                      .includes(searchStore.toLowerCase());
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
                StoresData?.data.restaurant.map((Store, index) => {
                  return (
                    <Marker
                      key={index}
                      position={{
                        lat: parseFloat(Store.lat),
                        lng: parseFloat(Store.lng),
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

export default StoresPage;