import { useState, useEffect } from "react";

export const useProgressiveImage = (imageUrls) => {
  const [imageSrc, setImageSrc] = useState(imageUrls?.thumbnail);

  useEffect(() => {
    if (!imageUrls) return;

    const mediumImg = new Image();
    mediumImg.src = imageUrls?.medium;
    mediumImg.onload = () => setImageSrc(imageUrls?.medium);

    const largeImg = new Image();
    largeImg.src = imageUrls?.large;
    largeImg.onload = () => setImageSrc(imageUrls?.large);

    return () => {
      mediumImg.onload = null;
      largeImg.onload = null;
    };
  }, [imageUrls]);

  return imageSrc;
};
