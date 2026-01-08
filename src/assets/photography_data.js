// Import all bento grid images
import img1 from "./bento_grid/1.jpeg";
import img2 from "./bento_grid/2.jpg";
import img4 from "./bento_grid/4.jpg";
import img5 from "./bento_grid/5.jpeg";
import img6 from "./bento_grid/6.jpeg";
import img7 from "./bento_grid/7.jpeg";
import img8 from "./bento_grid/8.jpg";
import img9 from "./bento_grid/9.jpg";
import img10 from "./bento_grid/10.jpeg";
import img12 from "./bento_grid/12.jpg";
import img13 from "./bento_grid/13.jpg";
import img14 from "./bento_grid/14.jpg";
import img15 from "./bento_grid/15.jpg";
import img16 from "./bento_grid/16.jpg";
import img17 from "./bento_grid/17.jpg";
import img18 from "./bento_grid/18.jpg";
import img19 from "./bento_grid/19.jpg";

// Photography data with grid positioning for asymmetric bento layout
// Added aspect ratios to prevent layout shifts and improve performance
const photography_data = [
  {
    id: 1,
    image: img1,
    gridColumn: "span 2",
    gridRow: "span 2",
    aspectRatio: 1, // Square
    alt: "Photography by Priyam Shah",
  },
  {
    id: 2,
    image: img2,
    gridColumn: "span 2",
    gridRow: "span 1",
    aspectRatio: 2, // Landscape
    alt: "Photography by Priyam Shah",
  },
  {
    id: 4,
    image: img4,
    gridColumn: "span 1",
    gridRow: "span 2",
    aspectRatio: 0.75, // Landscape
    alt: "Photography by Priyam Shah",
  },
  {
    id: 6,
    image: img6,
    gridColumn: "span 1",
    gridRow: "span 2",
    aspectRatio: 0.75, // Portrait
    alt: "Photography by Priyam Shah",
  },
  {
    id: 5,
    image: img5,
    gridColumn: "span 2",
    gridRow: "span 1",
    aspectRatio: 2, // Wide landscape
    alt: "Photography by Priyam Shah",
  },
  {
    id: 10,
    image: img10,
    gridColumn: "span 2",
    gridRow: "span 1",
    aspectRatio: 2, // Landscape
    alt: "Photography by Priyam Shah",
  },
  {
    id: 7,
    image: img7,
    gridColumn: "span 2",
    gridRow: "span 2",
    aspectRatio: 2, // Landscape
    alt: "Photography by Priyam Shah",
  },
  {
    id: 9,
    image: img9,
    gridColumn: "span 2",
    gridRow: "span 2",
    aspectRatio: 1, // Square
    alt: "Photography by Priyam Shah",
  },
  {
    id: 8,
    image: img8,
    gridColumn: "span 2",
    gridRow: "span 2",
    aspectRatio: 2, // Landscape
    alt: "Photography by Priyam Shah",
  },
  {
    id: 12,
    image: img12,
    gridColumn: "span 2",
    gridRow: "span 1",
    aspectRatio: 2, // Wide landscape
    alt: "Photography by Priyam Shah",
  },
  {
    id: 13,
    image: img13,
    gridColumn: "span 1",
    gridRow: "span 1",
    aspectRatio: 1.5, // Landscape
    alt: "Photography by Priyam Shah",
  },
  {
    id: 14,
    image: img14,
    gridColumn: "span 2",
    gridRow: "span 2",
    aspectRatio: 2, // Portrait
    alt: "Photography by Priyam Shah",
  },
  {
    id: 15,
    image: img15,
    gridColumn: "span 1",
    gridRow: "span 2",
    aspectRatio: 0.75, // Landscape
    alt: "Photography by Priyam Shah",
  },
  {
    id: 17,
    image: img17,
    gridColumn: "span 1",
    gridRow: "span 1",
    aspectRatio: 1.5, // Landscape
    alt: "Photography by Priyam Shah",
  },
  {
    id: 16,
    image: img16,
    gridColumn: "span 2",
    gridRow: "span 2",
    aspectRatio: 2, // Wide landscape
    alt: "Photography by Priyam Shah",
  },

  {
    id: 18,
    image: img18,
    gridColumn: "span 2",
    gridRow: "span 1",
    aspectRatio: 2, // Portrait
    alt: "Photography by Priyam Shah",
  },
  {
    id: 19,
    image: img19,
    gridColumn: "span 2",
    gridRow: "span 1",
    aspectRatio: 2, // Wide landscape
    alt: "Photography by Priyam Shah",
  },
];

export default photography_data;
