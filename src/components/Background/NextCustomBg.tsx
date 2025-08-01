import Image from "next/image";
import React from "react";
import bgImagePc from "@/public/herobg-pc.webp";
import bgImageIpad from "@/public/herobg-ipad.webp";
import bgImageMb from "@/public/herobg-mb.webp";
import Box from "../commonStyled/Box";
import styled from "styled-components";

const PcBg = styled(Box)`
  width: 100%;
  height: 100%;
  @media (min-width: 992px) {
    display: block;
  }

  display: none;
`;

const IpadBg = styled(Box)`
  width: 100%;
  height: 100%;

  @media (min-width: 576px) and (max-width: 992px) {
    display: block;
  }

  display: none;
`;

const MbBg = styled(Box)`
  width: 100%;
  height: 100%;

  @media (max-width: 576px) {
    display: block;
  }

  display: none;
`;

const Background = () => {
  return (
    <>
      <PcBg>
        <Image
          src={bgImagePc}
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
      </PcBg>

      <IpadBg>
        <Image
          src={bgImageIpad}
          alt="hero-bg-ipad"
          placeholder="blur"
          quality={100}
          sizes="100vw"
          //   priority
          style={{
            width: "100%",
            height: "auto",
            zIndex: "-1",
          }}
        />
      </IpadBg>

      <MbBg>
        <Image
          src={bgImageMb}
          alt="hero-bg-mb"
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
      </MbBg>
    </>
  );
};

export default Background;
