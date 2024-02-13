import React from "react";
import { useSelector } from "react-redux";
import { ShopsDetailStateType } from "../redux/shopsDetailSlice/shopsDetailSlice";
import { RootState } from "../redux/store";

const ShopsDetailModal = () => {
  const shopsDetailSelector = useSelector<RootState>(
    (state) => state.shopsDetailSlice
  ) as ShopsDetailStateType;

  return (
    <div>
      <div>
        <figure>
          <img src={shopsDetailSelector.data.data.banner} />
        </figure>
        <div>
          <h2 className="text-xl font-semibold">
            {shopsDetailSelector.data.data.name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ShopsDetailModal;
