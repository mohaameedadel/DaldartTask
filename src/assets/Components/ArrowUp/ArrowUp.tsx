import { useEffect, useState } from "react";
import { FaArrowTurnUp } from "react-icons/fa6";

export default function ArrowUp() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        className={`${
          scrolled ? "block" : "hidden"
        } fixed bottom-5 right-5 w-10 h-10 bg-main text-white flex items-center justify-center rounded-full cursor-pointer`}
      >
        <FaArrowTurnUp className="bounce" />
      </div>
    </>
  );
}
