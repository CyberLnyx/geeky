import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div
      className="w-dvw flex flex-col items-center justify-center bg-black px-4 sm:px-0"
      style={{ height: "calc(100dvh - 144px)" }}
    >
      <h1
        className="text-center text-white"
        style={{ fontSize: "clamp(1.5rem, 10vw, 60px)" }}
      >
        Page Not Found!!!
      </h1>
      <p className="my-10 text-center text-white text-sm sm:text-base md:text-xl">
        The Page you are looking for could not be found.
      </p>
      <Link to={"/"} className="underline text-[var(--base-color)]">
        Go Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
