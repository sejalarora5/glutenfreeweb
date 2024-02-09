import { FC } from "react";

type props = {
  image: string;
  title: string;
  body: string;
  url: string;
};

const BlogsCard: FC<props> = ({ image, title, body, url }) => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">{title}</h2>
        <p className="line-clamp-3">{body}</p>
        <div className="card-actions justify-end">
          <a href={url} className="btn btn-ghost text-pink-400 text-lg">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
