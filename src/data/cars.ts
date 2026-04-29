import aether from "@/assets/car-aether.jpg";
import apex from "@/assets/car-apex.jpg";
import noir from "@/assets/car-noir.jpg";
import zephyr from "@/assets/car-zephyr.jpg";
import monolith from "@/assets/car-monolith.jpg";
import soleil from "@/assets/car-soleil.jpg";

export type CarCategory = "Hypercar" | "Track" | "GT" | "Roadster" | "SUV" | "Heritage";

export type Car = {
  id: string;
  name: string;
  series: string;
  category: CarCategory;
  year: number;
  hp: number;
  topSpeed: number;
  zeroToSixty: number;
  price: string;
  units: number;
  status: "Available" | "Reserved" | "Sold Out";
  image: string;
  tagline: string;
};

export const cars: Car[] = [
  {
    id: "aether-gtx",
    name: "Aether GT‑X",
    series: "Series 01",
    category: "Hypercar",
    year: 2026,
    hp: 1200,
    topSpeed: 248,
    zeroToSixty: 1.9,
    price: "€2.4M",
    units: 511,
    status: "Available",
    image: aether,
    tagline: "Hand‑forged carbon. Tri‑motor architecture.",
  },
  {
    id: "apex-rs",
    name: "Apex RS",
    series: "Series 02",
    category: "Track",
    year: 2026,
    hp: 1050,
    topSpeed: 232,
    zeroToSixty: 2.1,
    price: "€1.8M",
    units: 250,
    status: "Reserved",
    image: apex,
    tagline: "Track‑bred aero. Active downforce wing.",
  },
  {
    id: "noir-grand",
    name: "Noir Grand",
    series: "GT Collection",
    category: "GT",
    year: 2025,
    hp: 820,
    topSpeed: 211,
    zeroToSixty: 2.6,
    price: "€680K",
    units: 1200,
    status: "Available",
    image: noir,
    tagline: "Continental grand tourer. Hand‑stitched cabin.",
  },
  {
    id: "zephyr-r",
    name: "Zephyr R",
    series: "Open Series",
    category: "Roadster",
    year: 2026,
    hp: 720,
    topSpeed: 198,
    zeroToSixty: 2.4,
    price: "€540K",
    units: 99,
    status: "Sold Out",
    image: zephyr,
    tagline: "Open‑top thrill. Targa carbon shell.",
  },
  {
    id: "monolith-x",
    name: "Monolith X",
    series: "Utility 01",
    category: "SUV",
    year: 2026,
    hp: 980,
    topSpeed: 186,
    zeroToSixty: 2.8,
    price: "€420K",
    units: 800,
    status: "Available",
    image: monolith,
    tagline: "All‑terrain electric. Brutalist silhouette.",
  },
  {
    id: "soleil-restomod",
    name: "Soleil 250",
    series: "Heritage",
    category: "Heritage",
    year: 2025,
    hp: 480,
    topSpeed: 174,
    zeroToSixty: 3.4,
    price: "€890K",
    units: 50,
    status: "Reserved",
    image: soleil,
    tagline: "Restomod homage. Modern soul, classic skin.",
  },
];

export const categories: ("All" | CarCategory)[] = [
  "All",
  "Hypercar",
  "Track",
  "GT",
  "Roadster",
  "SUV",
  "Heritage",
];
