import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Spinner = () => {
  return (
    <ThreeCircles
      visible={true}
      height="100"
      width="100"
      color="#80CED7"
      ariaLabel="three-circles-loading"
      wrapperStyle={{
        position: "absolute",
        top: "calc(50% - 100px)",
        zIndex: "1"
      }}
      wrapperClass=""
    />
  );
};

export default Spinner;
