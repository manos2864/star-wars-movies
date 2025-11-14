import { FC, useState } from "react";
import styled from "@emotion/styled";
import NoImageAvailable from "@/assets/generic/no-image-available.jpg";
import variables from "@/styles/_exports.module.scss";

interface ImageProps {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Image: FC<ImageProps> = ({
  url,
  alt = "Image",
  width = 150,
  height = 200,
}) => {
  const [src, setSrc] = useState(url || NoImageAvailable);

  return (
    <ImageWrapper width={width} height={height}>
      <StyledImg src={src} alt={alt} onError={() => setSrc(NoImageAvailable)} />
    </ImageWrapper>
  );
};

export default Image;

const ImageWrapper = styled.div<{ width: number; height: number }>`
  inline-size: 80vw;
  block-size: 50vh;
  overflow: hidden;
  border-radius: ${variables.size4};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (width > ${variables.md}) {
    min-inline-size: ${({ width }) => width}px;
    min-block-size: ${({ height }) => height}px;
    max-inline-size: ${({ width }) => width}px;
    max-block-size: ${({ height }) => height}px;
  }
`;

const StyledImg = styled.img`
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease;

  @media (width > ${variables.md}) {
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;
