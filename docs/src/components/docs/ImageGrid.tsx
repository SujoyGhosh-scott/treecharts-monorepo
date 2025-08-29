import React from "react";
import { ImageGridItem } from "@/types/docs";

interface ImageGridProps {
  images: ImageGridItem[];
  gridConfig: {
    desktop: number;
    mobile: number;
    gap?: string;
    maxWidth?: string;
  };
  title?: string;
  description?: string;
}

export default function ImageGrid({
  images,
  gridConfig,
  title,
  description,
}: ImageGridProps) {
  const { desktop, mobile, gap = "20px", maxWidth = "300px" } = gridConfig;

  const gridStyles = {
    display: "grid",
    gap,
    gridTemplateColumns: `repeat(${mobile}, 1fr)`,
    justifyItems: "center",
    margin: "30px 0",
  };

  const desktopGridStyles = {
    [`@media (min-width: 768px)`]: {
      gridTemplateColumns: `repeat(${desktop}, 1fr)`,
    },
  };

  return (
    <div className="image-grid-container">
      {title && (
        <h3 className="text-xl font-medium mb-3 mt-6 text-white">{title}</h3>
      )}
      {description && (
        <p className="mb-4 leading-relaxed text-gray-200">{description}</p>
      )}

      <div
        className={`grid gap-5 justify-items-center my-8 
          grid-cols-${mobile} 
          md:grid-cols-${desktop}`}
        style={{ gap }}
      >
        {images.map((image, index) => (
          <div key={index} className="text-center">
            <img
              src={image.src}
              alt={image.alt}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{
                width: "100%",
                maxWidth,
                height: "auto",
              }}
            />
            {image.description && (
              <p className="mt-2 text-gray-300 text-xs font-light">
                {image.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
