import React from "react";
import Lottie from "react-lottie";
import wrong from "../../../assets/wrong.json";

export default function Wrong() {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: wrong,
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
          speed={1.5}
        />
      </div>
    );
  }