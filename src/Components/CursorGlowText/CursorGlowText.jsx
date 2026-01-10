import { useEffect, useRef, useState } from "react";
import "./CursorGlowText.css";

const CursorGlowText = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [svgMousePos, setSvgMousePos] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);

  // SVG path data from priyam_footer.svg
  const fillPath =
    "M116 296.4C102.933 296.4 90.9332 293.867 79.9999 288.8C69.0666 283.733 60.1332 276.8 53.1999 268C46.2666 258.933 42.2666 248.667 41.1999 237.2V155.2C42.2666 143.733 46.2666 133.333 53.1999 124C60.1332 114.667 69.0666 107.333 79.9999 102C90.9332 96.6667 102.933 94 116 94C134.4 94 150.667 98.4 164.8 107.2C179.2 116 190.4 128 198.4 143.2C206.667 158.4 210.8 175.733 210.8 195.2C210.8 214.667 206.667 232 198.4 247.2C190.4 262.4 179.2 274.4 164.8 283.2C150.667 292 134.4 296.4 116 296.4ZM3.9999 374.4V98H65.1999V148L55.1999 195.2L64.3999 242.4V374.4H3.9999ZM104.8 241.2C113.6 241.2 121.2 239.2 127.6 235.2C134.267 231.2 139.467 225.733 143.2 218.8C146.933 211.867 148.8 204 148.8 195.2C148.8 186.133 146.933 178.133 143.2 171.2C139.467 164.267 134.267 158.933 127.6 155.2C121.2 151.2 113.733 149.2 105.2 149.2C96.6666 149.2 89.0666 151.2 82.3999 155.2C75.9999 158.933 70.9332 164.267 67.1999 171.2C63.4666 178.133 61.5999 186.133 61.5999 195.2C61.5999 204 63.3332 211.867 66.7999 218.8C70.5332 225.733 75.7332 231.2 82.3999 235.2C89.0666 239.2 96.5332 241.2 104.8 241.2ZM241.891 292.4V98H303.091V292.4H241.891ZM303.091 185.6L277.491 165.6C282.557 142.933 291.091 125.333 303.091 112.8C315.091 100.267 331.757 94 353.091 94C362.424 94 370.557 95.4667 377.491 98.4C384.691 101.067 390.957 105.333 396.291 111.2L359.891 157.2C357.224 154.267 353.891 152 349.891 150.4C345.891 148.8 341.357 148 336.291 148C326.157 148 318.024 151.2 311.891 157.6C306.024 163.733 303.091 173.067 303.091 185.6ZM412.594 292.4V98H473.794V292.4H412.594ZM443.394 71.2C433.794 71.2 425.794 68 419.394 61.6C413.26 54.9333 410.194 46.9333 410.194 37.6C410.194 28 413.26 20 419.394 13.6C425.794 7.20002 433.794 4.00002 443.394 4.00002C452.994 4.00002 460.86 7.20002 466.994 13.6C473.127 20 476.194 28 476.194 37.6C476.194 46.9333 473.127 54.9333 466.994 61.6C460.86 68 452.994 71.2 443.394 71.2ZM576.891 293.2L496.891 98H562.891L613.691 252.8H589.291L641.291 98H707.291L624.091 293.2H576.891ZM526.891 374.4L585.291 248.4L624.091 293.2L589.691 374.4H526.891ZM804.341 296.4C786.474 296.4 770.474 292 756.341 283.2C742.474 274.4 731.407 262.4 723.141 247.2C715.141 232 711.141 214.667 711.141 195.2C711.141 175.733 715.141 158.4 723.141 143.2C731.407 128 742.474 116 756.341 107.2C770.474 98.4 786.474 94 804.341 94C817.407 94 829.141 96.5333 839.541 101.6C850.207 106.667 858.874 113.733 865.541 122.8C872.207 131.6 875.941 141.733 876.741 153.2V237.2C875.941 248.667 872.207 258.933 865.541 268C859.141 276.8 850.607 283.733 839.941 288.8C829.274 293.867 817.407 296.4 804.341 296.4ZM816.741 241.2C829.807 241.2 840.341 236.933 848.341 228.4C856.341 219.6 860.341 208.533 860.341 195.2C860.341 186.133 858.474 178.133 854.741 171.2C851.274 164.267 846.207 158.933 839.541 155.2C833.141 151.2 825.674 149.2 817.141 149.2C808.607 149.2 801.007 151.2 794.341 155.2C787.941 158.933 782.741 164.267 778.741 171.2C775.007 178.133 773.141 186.133 773.141 195.2C773.141 204 775.007 211.867 778.741 218.8C782.474 225.733 787.674 231.2 794.341 235.2C801.007 239.2 808.474 241.2 816.741 241.2ZM857.941 292.4V240L867.141 192.8L857.941 145.6V98H917.941V292.4H857.941ZM961.031 292.4V98H1022.23V292.4H961.031ZM1085.43 292.4V178.8C1085.43 168.933 1082.36 161.333 1076.23 156C1070.36 150.4 1063.03 147.6 1054.23 147.6C1048.1 147.6 1042.63 148.933 1037.83 151.6C1033.03 154 1029.16 157.467 1026.23 162C1023.56 166.533 1022.23 172.133 1022.23 178.8L998.631 168.4C998.631 152.933 1001.96 139.733 1008.63 128.8C1015.3 117.6 1024.36 109.067 1035.83 103.2C1047.3 97.0667 1060.23 94 1074.63 94C1088.23 94 1100.36 97.0667 1111.03 103.2C1121.96 109.333 1130.63 117.867 1137.03 128.8C1143.43 139.733 1146.63 152.8 1146.63 168V292.4H1085.43ZM1209.83 292.4V178.8C1209.83 168.933 1206.76 161.333 1200.63 156C1194.76 150.4 1187.43 147.6 1178.63 147.6C1172.5 147.6 1167.03 148.933 1162.23 151.6C1157.43 154 1153.56 157.467 1150.63 162C1147.96 166.533 1146.63 172.133 1146.63 178.8L1111.43 174C1111.96 157.467 1115.83 143.333 1123.03 131.6C1130.5 119.6 1140.23 110.4 1152.23 104C1164.5 97.3333 1178.23 94 1193.43 94C1208.36 94 1221.56 97.2 1233.03 103.6C1244.76 109.733 1253.96 118.667 1260.63 130.4C1267.56 141.867 1271.03 155.733 1271.03 172V292.4H1209.83Z";

  // Track mouse position within container
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Convert mouse position to SVG coordinate space
  useEffect(() => {
    if (svgRef.current && containerRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Convert screen coordinates to SVG viewBox coordinates (1276x379)
      const svgX =
        ((mousePosition.x - (svgRect.left - containerRect.left)) /
          svgRect.width) *
        1276;
      const svgY =
        ((mousePosition.y - (svgRect.top - containerRect.top)) /
          svgRect.height) *
        379;

      setSvgMousePos({ x: svgX, y: svgY });
    }
  }, [mousePosition]);

  return (
    <div ref={containerRef} className="cursor-glow-text-container">
      <svg ref={svgRef} viewBox="0 0 1276 379" className="cursor-glow-text-svg">
        <defs>
          {/* Clip path using the text shape */}
          <clipPath id="textClip">
            <path d={fillPath} />
          </clipPath>

          {/* Base gradient for the text */}
          <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="base-gradient-start" />
            <stop offset="100%" className="base-gradient-end" />
          </linearGradient>

          {/* Fill glow gradient - follows cursor */}
          <radialGradient
            id="fillGlow"
            cx={svgMousePos.x}
            cy={svgMousePos.y}
            r="350"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" className="fill-glow-inner" />
            <stop offset="25%" className="fill-glow-mid" />
            <stop offset="45%" className="fill-glow-outer" />
            <stop offset="100%" className="fill-glow-outer" />
          </radialGradient>

          {/* Stroke glow gradient - follows cursor */}
          <radialGradient
            id="strokeGlow"
            cx={svgMousePos.x}
            cy={svgMousePos.y}
            r="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" className="stroke-glow-inner" />
            <stop offset="20%" className="stroke-glow-mid" />
            <stop offset="40%" className="stroke-glow-outer" />
            <stop offset="100%" className="stroke-glow-outer" />
          </radialGradient>

          {/* Blur filter for soft glow */}
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="50" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Filter for outer stroke effect */}
          <filter id="outerStroke" x="-20%" y="-20%" width="140%" height="140%">
            <feMorphology
              operator="dilate"
              radius="2"
              in="SourceGraphic"
              result="dilated"
            />
            <feGaussianBlur stdDeviation="1" in="dilated" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Mask for stroke - only show outer stroke */}
        <defs>
          <mask id="strokeMask">
            <rect x="0" y="0" width="1276" height="379" fill="black" />
            <path d={fillPath} fill="black" stroke="white" strokeWidth="4" />
            <path d={fillPath} fill="black" />
          </mask>
        </defs>

        {/* Layer 1: Outer stroke with cursor glow */}
        <g>
          <rect
            x={svgMousePos.x - 300}
            y={svgMousePos.y - 300}
            width="600"
            height="600"
            fill="url(#strokeGlow)"
            mask="url(#strokeMask)"
            style={{
              opacity: isHovering ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        </g>

        {/* Layer 2: Base filled text */}
        <path d={fillPath} fill="url(#baseGradient)" />

        {/* Layer 3: Fill glow effect - clipped to text shape */}
        <g clipPath="url(#textClip)">
          <rect
            x={svgMousePos.x - 350}
            y={svgMousePos.y - 350}
            width="700"
            height="700"
            fill="url(#fillGlow)"
            filter="url(#softGlow)"
            style={{
              opacity: isHovering ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        </g>
      </svg>
    </div>
  );
};

export default CursorGlowText;
