import Link from "next/link";
import React from "react";


const Search404 = ({ text = "This page is not available" }) => {
  return (
    <div className="w-full h-full">
      <div className="flex text-center flex-col font-normal items-center mt-5 gap-y-5 text-neutral-900 h-screen">
        <h2 className="text-3xl">{text}</h2>
        <p className="text-normal">
          The link you selected may not work or the page may have been deleted.{" "}
          <Link className="font-semibold text-cyan-600" href={"/"}>
            Return to Pictube.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Search404;
