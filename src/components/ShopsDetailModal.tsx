import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ShopsDetailStateType } from "../redux/shopsDetailSlice/shopsDetailSlice";
import { RootState } from "../redux/store";
import { Rating } from "@smastrom/react-rating";
import Phone from "../assets/icons_svg/ic_phone.svg";
import WriteReview from "../assets/icons/ic_add_business.png";
import AddBookMark from "../assets/icons/bookmark.png";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { string } from "yup";
import { libraries } from "../pages/shops_page/ShopsPage";
import ReviewCard from "./ReviewCard";

const ShopsDetailModal = () => {
  const shopsDetailSelector = useSelector<RootState>(
    (state) => state.shopsDetailSlice
  ) as ShopsDetailStateType;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    libraries,
  });

  return (
    <div>
      {shopsDetailSelector.loading ? (
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <div>
          <figure>
            <img
              className="rounded-md"
              src={shopsDetailSelector.data.data.banner}
            />
          </figure>
          <div>
            <h2 className="text-xl font-semibold">
              {shopsDetailSelector.data.data.name}
            </h2>
            <Rating
              className="my-2"
              value={shopsDetailSelector.data.data.avg_count}
              readOnly
              style={{ maxWidth: 150 }}
            />
            <h4> {"Cuisine:- " + shopsDetailSelector.data.data.cuisine} </h4>

            <div className="my-2">
              {shopsDetailSelector.data.data.glutenfacility ? (
                <div className="rounded-box w-56 bg-green-400 px-5">
                  <p className="text-green-900">Dedicated gluten facility</p>
                </div>
              ) : (
                <div className="rounded-box bg-red-400 w-80 px-5">
                  <p className="text-red-900">
                    Dedicated gluten facility not available
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-row justify-between my-2">
              <div className="flex flex-col justify-center items-center">
                <img className="h-8" src={Phone} />
                <p>Phone</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img className="h-8" src={WriteReview} />
                <p>Write a review</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img className="h-8" src={AddBookMark} />
                <p>Add a bookmark</p>
              </div>
            </div>
            <div>
              <p className="text-md font-semibold">
                {shopsDetailSelector.data.data.location}
              </p>
            </div>
            <h2 className="text-2xl font-extrabold">
              {shopsDetailSelector.data.data.avg_count.toString().slice(0, 3)}
            </h2>
            <div>
              <div className="h-40 flex my-2">
                {isLoaded && (
                  <GoogleMap
                    mapContainerStyle={{
                      flex: 1,
                      borderRadius: 8,
                    }}
                    center={{
                      lat: parseFloat(shopsDetailSelector.data.data.lat),
                      lng: parseFloat(shopsDetailSelector.data.data.lng),
                    }}
                    zoom={12}
                  >
                    <Marker
                      key={shopsDetailSelector.data.data.lat}
                      position={{
                        lat: parseFloat(shopsDetailSelector.data.data.lat),
                        lng: parseFloat(shopsDetailSelector.data.data.lng),
                      }}
                    />
                  </GoogleMap>
                )}
              </div>
            </div>

            <div>
              <p>
                {`Based on ${shopsDetailSelector.data.data.rating_count} ratings. View All`}{" "}
              </p>
              <div className="h-1 bg-black" />
            </div>
          </div>
          <ReviewCard
            title={shopsDetailSelector.data.data.restaurant_rating.title}
            description={
              shopsDetailSelector.data.data.restaurant_rating.comment
            }
            date={shopsDetailSelector.data.data.restaurant_rating.date}
            image={shopsDetailSelector.data.data.restaurant_rating.image}
            name={shopsDetailSelector.data.data.restaurant_rating.name}
            ratings={parseFloat(
              shopsDetailSelector.data.data.restaurant_rating.star
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ShopsDetailModal;