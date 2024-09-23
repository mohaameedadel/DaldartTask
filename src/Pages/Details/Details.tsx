import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { ICommentData } from "../../Interfaces/comment";
import Loading from "../../Components/Loading/Loading";

export default function Details() {
  const { id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["getPostDetails", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://www.reddit.com/r/Egypt/comments/${id}/.json`
      );
      return res.data;
    },
  });
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  if (isPending) {
    return <Loading />;
  }
  return (
    <>
      <div className="container">
        <div className="lg:w-3/5 mx-auto">
          {data[0].data.children[0] && (
            <div
              data-aos="fade-down"
              className="bg-white p-4 my-4 shadow"
              key={data[0].data.children[0].data.id}
            >
              <div className="flex justify-start items-center my-2 border-b pb-3">
                  <span className="w-10 h-10 rounded-full bg-main text-white font-semibold flex items-center justify-center me-2">
                    {data[0].data.children[0].data.author.slice(0, 1).toUpperCase()}
                  </span>{" "}
                  <h2>{data[0].data.children[0].data.author}</h2>
                </div>
              <h2 className="mb-2 mt-4 text-lg font-semibold">
                {data[0].data.children[0].data.title}
              </h2>
              {data[0].data.children[0].data.url_overridden_by_dest ? (
                <div className="img">
                  <img
                    src={data[0].data.children[0].data.thumbnail}
                    className="w-52 mx-auto my-4"
                    alt="post image"
                  />
                </div>
              ) : (
                ""
              )}
              {data[0].data.children[0].data.selftext && (
                <p className="overflow-hidden">
                  {data[0].data.children[0].data.selftext}
                </p>
              )}
              <div className="flex justify-between items-center px-2 pt-2 text-gray-500 border-t mt-4">
                <span className="flex justify-center items-center">
                  <AiOutlineLike className="pe-1 text-xl" />{" "}
                  {data[0].data.children[0].data.score}
                </span>
                <span className="flex justify-center items-center">
                  <FaRegComments className="pe-1 text-xl" />
                  {data[0].data.children[0].data.num_comments}
                </span>
              </div>
            </div>
          )}
          <span className="block my-4 mx-auto w-fit bg-white px-5 py-2.5 rounded-lg font-semibold">
            Comments
          </span>
          {data[0].data.children.length > 0 &&
            data[1].data.children.map((child: ICommentData) => (
              <div
                data-aos="fade-up"
                key={child.data.id}
                className="bg-white my-4 p-4 rounded-md"
              >
                <div className="flex justify-start items-center my-2">
                  <span className="w-10 h-10 rounded-full bg-main text-white font-semibold flex items-center justify-center me-2">
                    {child.data.author.slice(0, 1).toUpperCase()}
                  </span>{" "}
                  <h2>{child.data.author}</h2>
                </div>
                <p className="overflow-hidden">{child.data.body}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
