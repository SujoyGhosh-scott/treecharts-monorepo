"use client";

import React, { useState, useEffect } from "react";
import { AngularIcon, JSIcon, ReactIcon, TSIcon, VueIcon } from "./icons";

const TreeChartsAnimation = () => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [containerWidth, setContainerWidth] = useState(500);

  useEffect(() => {
    const updateWidth = () => {
      if (typeof window !== "undefined") {
        // Use more of the available width on mobile, less conservative padding
        const padding = window.innerWidth < 768 ? 24 : 48; // Less padding on mobile
        setContainerWidth(Math.min(500, window.innerWidth - padding));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsTyping(true);

      const typeText = (text, startFrom = 0) => {
        return new Promise((resolve) => {
          let charIndex = startFrom;
          const typingInterval = setInterval(() => {
            if (charIndex <= text.length) {
              setCurrentText(text.slice(0, charIndex));
              charIndex++;
            } else {
              clearInterval(typingInterval);
              resolve();
            }
          }, 100);
        });
      };

      const eraseToBase = (fromText, baseLength) => {
        return new Promise((resolve) => {
          let charIndex = fromText.length;
          const eraseInterval = setInterval(() => {
            if (charIndex >= baseLength) {
              setCurrentText(fromText.slice(0, charIndex));
              charIndex--;
            } else {
              clearInterval(eraseInterval);
              resolve();
            }
          }, 50);
        });
      };

      const animationLoop = async () => {
        await typeText("treecharts");
        await new Promise((resolve) => setTimeout(resolve, 2000));

        await typeText("treecharts-react", "treecharts".length);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        await eraseToBase("treecharts-react", "treecharts".length);
        await new Promise((resolve) => setTimeout(resolve, 300));
        // await typeText("treecharts-angular", "treecharts".length);
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // await eraseToBase("treecharts-angular", "treecharts".length);
        // await new Promise((resolve) => setTimeout(resolve, 300));
        // await typeText("treecharts-vue", "treecharts".length);
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // await eraseToBase("treecharts-vue", "treecharts".length);
        setIsTyping(false);
        setIsComplete(true);
      };

      animationLoop();
    }, 1000);

    return () => clearTimeout(startDelay);
  }, []);

  const containerHeight = 450; // Increased from 400 to accommodate TypeScript circle
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const capsuleHeight = 50;
  const smallCircleRadius = Math.max(25, Math.min(30, containerWidth * 0.08)); // Larger minimum radius
  const lineThickness = Math.max(3, containerWidth < 400 ? 4 : 3); // Thicker lines on mobile

  const getContainerWidth = (text) => {
    const baseWidth = 70;
    const charWidth = 10;
    return baseWidth + text.length * charWidth;
  };

  const smallCircles = [
    {
      x: centerX - containerWidth * 0.18,
      y: centerY - containerWidth * 0.2,
      icon: "React",
    },
    {
      x: centerX + containerWidth * 0.2,
      y: centerY - containerWidth * 0.16,
      icon: "Vue",
    },
    {
      x: centerX + containerWidth * 0.19,
      y: centerY + containerWidth * 0.19,
      icon: "Angular",
    },
    {
      x: centerX - containerWidth * 0.19,
      y: centerY + containerWidth * 0.17,
      icon: "JS",
    },
  ];

  const typescriptCircle = {
    x: centerX - containerWidth * 0.03,
    y: centerY + containerWidth * 0.32,
    icon: "TS",
  };
  const jsCircle = smallCircles[3];

  const IconComponent = ({ icon, x, y }) => {
    const logoSources = {
      React: ReactIcon,
      Angular: AngularIcon,
      Vue: VueIcon,
      JS: JSIcon,
      TS: TSIcon,
    };

    const isComingSoon = icon === "Angular" || icon === "Vue";

    return (
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: x - 14,
          top: y - 14,
          width: 28,
          height: 28,
        }}
      >
        <img
          src={logoSources[icon]}
          alt={icon}
          style={{
            width: "24px",
            height: "24px",
            filter: isComingSoon
              ? "blur(2px) grayscale(50%) opacity(0.6)"
              : "none",
          }}
        />
        {isComingSoon && (
          <div
            className="absolute text-xs font-semibold text-white bg-black bg-opacity-80 px-2 py-1 rounded whitespace-nowrap"
            style={{
              left: "200%",
              top: "20px",
              transform: "translateX(-50%)",
              fontSize: "10px",
              zIndex: 10,
            }}
          >
            Coming Soon
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-full max-w-full overflow-hidden">
      <div
        className="relative max-w-full mx-auto"
        style={{ width: containerWidth, height: containerHeight }}
      >
        {/* Small circles */}
        {smallCircles.map((circle, index) => (
          <div
            key={`small-circle-${index}`}
            className="absolute border-2 border-white rounded-full"
            style={{
              left: circle.x - smallCircleRadius,
              top: circle.y - smallCircleRadius,
              width: smallCircleRadius * 2,
              height: smallCircleRadius * 2,
            }}
          />
        ))}

        {/* Lines to small circles */}
        {smallCircles.map((circle, index) => {
          const dx = circle.x - centerX;
          const dy = circle.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

          return (
            <div
              key={`small-line-${index}`}
              className="absolute bg-white"
              style={{
                left: centerX,
                top: centerY - lineThickness / 2,
                width: distance - smallCircleRadius,
                height: lineThickness,
                transformOrigin: "0 50%",
                transform: `rotate(${angle}deg)`,
              }}
            />
          );
        })}

        {/* TypeScript circle */}
        <div
          className="absolute border-2 border-white rounded-full"
          style={{
            left: typescriptCircle.x - smallCircleRadius,
            top: typescriptCircle.y - smallCircleRadius,
            width: smallCircleRadius * 2,
            height: smallCircleRadius * 2,
          }}
        />

        {/* Line from JavaScript to TypeScript */}
        {(() => {
          const dx = typescriptCircle.x - jsCircle.x;
          const dy = typescriptCircle.y - jsCircle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

          return (
            <div
              className="absolute bg-white"
              style={{
                left: jsCircle.x + (dx / distance) * smallCircleRadius,
                top:
                  jsCircle.y +
                  (dy / distance) * smallCircleRadius -
                  lineThickness / 2,
                width: distance - smallCircleRadius * 2,
                height: lineThickness,
                transformOrigin: "0 50%",
                transform: `rotate(${angle}deg)`,
              }}
            />
          );
        })()}

        {/* Central shape */}
        {!isTyping && !isComplete && currentText === "" ? (
          <div
            className="absolute bg-white rounded-full transition-all duration-500 ease-in-out"
            style={{
              left: centerX - 25,
              top: centerY - 25,
              width: 50,
              height: 50,
            }}
          />
        ) : (
          <div
            className="absolute bg-white transition-all duration-300 ease-out"
            style={{
              left: centerX - getContainerWidth(currentText) / 2,
              top: centerY - capsuleHeight / 2,
              width: getContainerWidth(currentText),
              height: capsuleHeight,
              borderRadius: capsuleHeight / 2,
            }}
          />
        )}

        {/* Central text */}
        <div
          className="absolute flex items-center justify-center text-xl font-semibold text-black"
          style={{
            left: centerX - getContainerWidth(currentText) / 2,
            top: centerY - 12,
            width: getContainerWidth(currentText),
            height: 24,
          }}
        >
          {currentText}
          {isTyping && currentText.length > 0 && (
            <span className="animate-pulse ml-1">|</span>
          )}
        </div>

        {/* Framework icons */}
        {smallCircles.map((circle, index) => (
          <IconComponent
            key={`icon-${index}`}
            icon={circle.icon}
            x={circle.x}
            y={circle.y}
          />
        ))}

        <IconComponent
          icon={typescriptCircle.icon}
          x={typescriptCircle.x}
          y={typescriptCircle.y}
        />
      </div>
    </div>
  );
};

export default TreeChartsAnimation;
