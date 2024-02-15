import { FC } from "react";
import ReviewImage from "../assets/icons/user.png";
import { Rating } from "@smastrom/react-rating";

type props = {
  ratings: number;
  title: string;
  description: string;
  image: string;
  name: string;
  date: string;
};

const ReviewCard: FC<props> = ({
  ratings,
  title,
  description,
  image,
  name,
  date,
}) => {
  return (
    <div>
      <div className="flex flex-row  items-center">
        <figure>
          <img className="h-20 mr-5" src={ReviewImage} alt="" />
        </figure>
        <div>
          <Rating style={{maxWidth: 150}} className="mt-2" value={ratings} readOnly />
          <h3 className="mt-2 text-lg">{title}</h3>
          <p className="mt-2 text-md">{description}</p>
          <p className="mt-5 text-sm">{`${date} by ${name}`}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
