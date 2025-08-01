import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import bgImagePc from "@/public/herobg-pc.webp";
import bgImageIpad from "@/public/herobg-ipad.webp";
import bgImageMb from "@/public/herobg-mb.webp";

const Background = () => {
  const [bgImage, setBgImage] = useState(bgImagePc);

  const { width } = useWindowSize();

  useEffect(() => {
    if (width >= 992) {
      setBgImage(bgImagePc);
    } else if (width < 992 && width > 576) {
      setBgImage(bgImageIpad);
    } else {
      setBgImage(bgImageMb);
    }
  }, [width]);

  return (
    <Image
      src={bgImage}
      alt="hero-bg"
      placeholder="blur"
      quality={100}
      sizes="100vw"
      priority
      style={{
        width: "100%",
        height: "auto",
        zIndex: "-1",
      }}
    />
  );
};

export default Background;
