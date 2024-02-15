import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  BlogsInitialStateType,
  fetchBlogs,
} from "../../redux/blogsSlice/blogsSlice";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import BlogsCard from "../../components/BlogsCard";

const BlogsPage = () => {
  const blogsSelector = useSelector<RootState>(
    (state) => state.blogsSlice
  ) as BlogsInitialStateType;

  const appDispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    appDispatch(fetchBlogs());
  }, []);

  return (
    <div>
      <Navbar />
      <h2 className="mt-14 mb-5 text-4xl text-pink-400 text-start mx-14">
        Blogs
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 place-items-center">
        {blogsSelector.data.success === true &&
          blogsSelector.data.data.rows
            .filter((it) => it.thumbnail !== "")
            .map((it) => (
              <li key={it.id} className="my-2.5">
                <BlogsCard
                  image={it.thumbnail}
                  title={it.title}
                  body={it.description.slice(3, -5)}
                  url={it.link}
                />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default BlogsPage;
