import { FC } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import filledStarIcon from "@/assets/icons/fill-star.svg";
import emptyStarIcon from "@/assets/icons/empty-star.svg";
import variables from "@/styles/_exports.module.scss";

interface StarsProps {
  rating: number | null;
  size?: number;
}

const Rating: FC<StarsProps> = ({ rating, size = 20 }) => {
  const averageRating = typeof rating !== "number" ? 0 : rating;

  return (
    <RatingWrapper
      role="img"
      aria-label={`Rating: ${averageRating.toFixed(1)} out of 10`}
    >
      {[...Array(10)].map((_, i) => {
        const isFilled = averageRating >= i + 1;
        const icon = isFilled ? filledStarIcon : emptyStarIcon;

        return (
          <AnimatedStar
            key={i + "-" + averageRating}
            src={icon}
            width={size}
            height={size}
            delay={isFilled ? i * 0.05 : 0}
          />
        );
      })}
    </RatingWrapper>
  );
};

export default Rating;

const RatingWrapper = styled.div`
  display: flex;
  gap: ${variables.size2};
  align-items: center;
`;

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const AnimatedStar = styled.img<{ delay?: number }>`
  animation: ${fadeInScale} 0.3s ease forwards;
  animation-delay: ${({ delay }) => delay || 0}s;
`;
