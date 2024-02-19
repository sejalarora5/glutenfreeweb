import { useSelector } from "react-redux";
import { ShopsDetailStateType } from "../redux/shopsDetailSlice/shopsDetailSlice";
import { RootState } from "../redux/store";
import { Rating } from "@smastrom/react-rating";
import Phone from "../assets/icons_svg/ic_phone.svg";
import WriteReview from "../assets/icons/ic_add_business.png";
import AddBookMark from "../assets/icons/bookmark.png";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { libraries } from "../pages/shops_page/ShopsPage";
import ReviewCard from "./ReviewCard";
import { useState } from "react";

import BackArrow from "../assets/icons_svg/ic_back_nav_black.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { UserStateType } from "../redux/userSlice/userSlice";
import { ShopsStateType } from "../redux/shopsSlice/shopsSlice";

const ShopsDetailModal = () => {
  const shopsDetailSelector = useSelector<RootState>(
    (state) => state.shopsDetailSlice
  ) as ShopsDetailStateType;

  const userSelector = useSelector<RootState>(
    (state) => state.userSlice
  ) as UserStateType;
  const shopSelector = useSelector<RootState>(
    (state) => state.shopsSlice
  ) as ShopsStateType;

  const [writeReview, setWriteReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComments] = useState("");
  const [file, setFile] = useState<FileList | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    libraries,
  });

  const handleWriteReview = async () => {
    try {
      if (title.length < 1) {
        toast("Please enter a title");
        return;
      }

      if (comment.length < 1) {
        toast("Please enter a comment");
        return;
      }

      if (rating < 1) {
        toast("Pleas rate the shop");
        return;
      }

      if (file === null) {
        toast("Please select a file");
        return;
      }

      const base64 = file[0].name;
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/add-rating`,
        {
          userId: userSelector.userData.id.toString(),
          restaurantId: shopSelector.data.data.restaurant.toString(),
          rating: rating.toString(),
          comment: comment,
          title: title,
          image: base64?.toString(),
        },
        {
          headers: {
            Authorization: userSelector.token,
          },
        }
      );
      console.log(data , ' write a review') 
      toast("Review submitted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (writeReview) {
    return (
      <div>
        <div className="btn btn-ghost" onClick={() => setWriteReview(false)}>
          <img className="h-5" src={BackArrow} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <input
            value={title}
            onChange={(it) => setTitle(it.target.value)}
            type="text"
            placeholder="Title"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            value={comment}
            onChange={(it) => setComments(it.target.value)}
            type="text"
            placeholder="Comment"
            className="input input-bordered mt-5 w-full max-w-xs"
          />

          <Rating
            value={rating}
            onChange={setRating}
            className="mt-5"
            style={{ maxWidth: 150 }}
          />
          <input
            onChange={(it) => setFile(it.target.files)}
            type="file"
            accept="image/*"
            className="file-input w-full mt-5 max-w-xs"
          />

          <button
            onClick={handleWriteReview}
            className="btn btn-secondary mt-5"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

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
              <div
                onClick={() => setWriteReview(true)}
                className="flex flex-col justify-center items-center"
              >
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
