import { Rating } from "@smastrom/react-rating";
import { FC } from "react";

type props = {
  image: string;
  title: string;
  rating: number;
  location?: string;
  onClick: () => void;
};

const Card: FC<props> = ({ image, title, rating, location, onClick }) => {
  return (
    <div
      className="card card-compact w-90 bg-base-100 shadow-xl"
      onClick={onClick}
    >
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{title}</h2>
        <Rating
          className="-mt-2"
          value={rating}
          style={{ maxWidth: 150 }}
          readOnly
        />
      </div>
    </div>
  );
};

export default Card;
