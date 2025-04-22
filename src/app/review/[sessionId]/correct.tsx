import React from "react";
import Lottie from "react-lottie";
import correct from "../../../assets/correct.json";

export default function Correct() {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: correct,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div>
        <Lottie 
          options={defaultOptions}
          height={55}
          width={55}
        />
      </div>
    );
  }