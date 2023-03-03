import React from "react";
import { Triangle } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center mt-5 items-center w-full h-4/6">
      <Triangle color="#DB4437" height={50} width={200} visible={true} />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
