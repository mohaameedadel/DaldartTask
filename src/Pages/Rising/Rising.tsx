import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { useEffect, useState } from "react";
import { FaRegComments } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { HiMiniMinus } from "react-icons/hi2";
import { GoPlusCircle } from "react-icons/go";
import { IChildrenData } from "../../Interfaces/post";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function Rising() {
  const [after, setAfter] = useState("null");
  const navigate = useNavigate();

  // !! without fire base
  // const { data, isPending } = useQuery({
  //   queryKey: ["getRisingPosts", `${after}`],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       `https://www.reddit.com/r/Egypt/rising.json?limit=10&after=${after}`
  //     );
  //     return res.data;
  //   },
  // });

  const { data, isPending } = useQuery({
    queryKey: ["getRisingPosts", `${after}`],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://www.reddit.com/r/Egypt/rising.json?limit=10&after=${after}`
        );

        const postsCollection = collection(db, "redditRisingPosts");

        const promises = res.data.data.children.map((child: IChildrenData) =>
          addDoc(postsCollection, {
            author: child.data.author,
            id: child.data.id,
            title: child.data.title,
            selftext: child.data.selftext,
          })
        );

        await Promise.all(promises);

        return res.data;
      } catch (error) {
        console.error("Error fetching and storing posts: ", error);
        throw new Error("Error fetching data");
      }
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
          {data.data.children.map((child: IChildrenData) => (
            <div
              data-aos="fade-up"
              onClick={() => navigate(`/details/${child.data.id}`)}
              className="bg-white p-4 my-4 shadow cursor-pointer"
              key={child.data.id}
            >
              <div className="flex justify-start items-center my-2 border-b pb-3">
                <span className="w-10 h-10 rounded-full bg-main text-white font-semibold flex items-center justify-center me-2">
                  {child.data.author.slice(0, 1).toUpperCase()}
                </span>{" "}
                <h2>{child.data.author}</h2>
              </div>
              <h2 className="mb-2 mt-4 text-lg font-semibold">
                {child.data.title}
              </h2>
              {child.data.url_overridden_by_dest ? (
                <div className="img">
                  <img
                    src={child.data.thumbnail}
                    className="w-52 mx-auto my-4"
                    alt="post image"
                  />
                </div>
              ) : (
                ""
              )}
              {child.data.selftext && (
                <p className="overflow-hidden">{child.data.selftext}</p>
              )}
              <div className="flex justify-between items-center px-2 pt-2 text-gray-500 border-t mt-4">
                <span className="flex justify-center items-center">
                  <AiOutlineLike className="pe-1 text-xl" /> {child.data.score}
                </span>
                <span className="flex justify-center items-center">
                  <FaRegComments className="pe-1 text-xl" />{" "}
                  {child.data.num_comments}
                </span>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center col-span-4 my-4">
            <div className="flex items-center justify-between text-main  bg-gray-100 rounded-lg  w-1/2 mx-2">
              <button
                onClick={() => setAfter(data.data.before)}
                type="button"
                className="inline-flex items-center justify-center h-12 px-1 w-8 bg-gray-100 rounded-s-lg  hover:bg-gray-200  focus:outline-none focus:ring-2 focus:ring-gray-200 "
              >
                <HiMiniMinus className="text-main " />
                <span className="sr-only">Previous page</span>
              </button>
              <span className="flex-shrink-0 mx-1 text-md font-medium space-x-0.5 rtl:space-x-reverse">
                Pages
              </span>
              <button
                onClick={() => setAfter(data.data.after)}
                type="button"
                className="inline-flex items-center justify-center h-12 px-1 w-8 bg-gray-100 rounded-e-lg  hover:bg-gray-200  focus:outline-none focus:ring-2 focus:ring-gray-200 "
              >
                <GoPlusCircle className="text-main " />
                <span className="sr-only">Next page</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
