import React from "react";
import { useSelector } from "react-redux";
import { ShopsDetailStateType } from "../redux/shopsDetailSlice/shopsDetailSlice";
import { RootState } from "../redux/store";
import { Rating } from "@smastrom/react-rating";
import Phone from '../assets/icons_svg/ic_phone.svg'
import WriteReview from '../assets/icons_svg/ic_cuisine.svg'


const ShopsDetailModal = () => {
  const shopsDetailSelector = useSelector<RootState>(
    (state) => state.shopsDetailSlice
  ) as ShopsDetailStateType;

  return (
    <div>
      <div>
        <figure>
          <img className="rounded-md" src={shopsDetailSelector.data.data.banner} />
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
          <div className="flex flex-row">

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopsDetailModal;
