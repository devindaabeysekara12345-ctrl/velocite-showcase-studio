import heroCar from "@/assets/hero-car.jpg";
import type { Car } from "./cars";

export type CarSpec = { label: string; value: string };
export type CarSpecGroup = { title: string; specs: CarSpec[] };

export type CarDetail = {
  description: string;
  highlights: string[];
  gallery: string[]; // additional images beyond hero
  specGroups: CarSpecGroup[];
};

// Reuse hero car image + each car's primary image for a gallery feel.
// In production these would be real per-car shots.
const buildGallery = (primary: string): string[] => [primary, heroCar, primary];

export const carDetails: Record<string, CarDetail> = {
  "aether-gtx": {
    description:
      "The Aether GT‑X is the apex of the VELOCITÉ atelier. A monocoque pulled from a single piece of forged carbon, wrapped around a tri‑motor powertrain that delivers torque vectoring with surgical precision. Every surface is wind‑tunnel earned. Every stitch hand‑laid. 511 will exist.",
    highlights: [
      "Forged carbon monocoque",
      "Tri‑motor torque vectoring",
      "Active aero with F1‑spec DRS",
      "Bespoke commission program",
    ],
    gallery: buildGallery(""),
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Power", value: "1,200 HP" },
          { label: "Torque", value: "1,050 Nm" },
          { label: "0–60 mph", value: "1.9 s" },
          { label: "0–124 mph", value: "4.4 s" },
          { label: "Top Speed", value: "248 mph" },
          { label: "Quarter Mile", value: "8.6 s" },
        ],
      },
      {
        title: "Powertrain",
        specs: [
          { label: "Architecture", value: "Tri‑motor AWD" },
          { label: "Battery", value: "120 kWh structural" },
          { label: "Range (WLTP)", value: "412 mi" },
          { label: "Charging", value: "350 kW DC" },
          { label: "0–80%", value: "16 min" },
        ],
      },
      {
        title: "Chassis",
        specs: [
          { label: "Monocoque", value: "Forged carbon" },
          { label: "Weight (dry)", value: "1,420 kg" },
          { label: "Distribution", value: "47 / 53" },
          { label: "Suspension", value: "Active hydraulic" },
          { label: "Brakes", value: "Carbon‑ceramic, 410mm" },
        ],
      },
    ],
  },
  "apex-rs": {
    description:
      "Born for the apex. The RS strips weight, doubles downforce, and trades comfort for clarity. A track instrument honed for drivers who measure their lives in lap times.",
    highlights: [
      "Active rear wing — 800 kg downforce",
      "Race‑spec sequential gearbox",
      "Stripped carbon interior",
      "Track‑only configuration available",
    ],
    gallery: buildGallery(""),
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Power", value: "1,050 HP" },
          { label: "Torque", value: "920 Nm" },
          { label: "0–60 mph", value: "2.1 s" },
          { label: "Top Speed", value: "232 mph" },
          { label: "Downforce", value: "800 kg @ 200 mph" },
          { label: "Lateral G", value: "2.4 g" },
        ],
      },
      {
        title: "Powertrain",
        specs: [
          { label: "Architecture", value: "Twin‑motor RWD" },
          { label: "Battery", value: "95 kWh" },
          { label: "Range", value: "298 mi" },
          { label: "Cooling", value: "Track‑rated dual loop" },
        ],
      },
      {
        title: "Chassis",
        specs: [
          { label: "Weight (dry)", value: "1,290 kg" },
          { label: "Aero Package", value: "Active F1‑derived" },
          { label: "Suspension", value: "Pushrod, adjustable" },
          { label: "Tyres", value: "Slick‑capable Cup 2R" },
        ],
      },
    ],
  },
  "noir-grand": {
    description:
      "A continental grand tourer that erases distance. Hand‑stitched leather meets active noise cancellation and a torque curve that prefers conversation to violence. For the long road home.",
    highlights: [
      "Hand‑stitched Italian leather cabin",
      "Active noise cancellation",
      "Adaptive air suspension",
      "Bespoke luggage program",
    ],
    gallery: buildGallery(""),
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Power", value: "820 HP" },
          { label: "Torque", value: "780 Nm" },
          { label: "0–60 mph", value: "2.6 s" },
          { label: "Top Speed", value: "211 mph" },
        ],
      },
      {
        title: "Powertrain",
        specs: [
          { label: "Architecture", value: "Dual‑motor AWD" },
          { label: "Battery", value: "110 kWh" },
          { label: "Range", value: "468 mi" },
          { label: "Charging", value: "270 kW DC" },
        ],
      },
      {
        title: "Comfort",
        specs: [
          { label: "Seating", value: "2+2 grand tourer" },
          { label: "Suspension", value: "Adaptive air" },
          { label: "Cabin", value: "Active noise cancellation" },
          { label: "Audio", value: "1,400W reference system" },
        ],
      },
    ],
  },
  "zephyr-r": {
    description:
      "Open sky, exposed carbon, no compromise. The Zephyr R is a targa‑shelled roadster that puts the elements back into the equation. 99 examples. All spoken for.",
    highlights: [
      "Removable targa carbon roof",
      "Open‑gate manual transmission",
      "Limited to 99 worldwide",
      "Naturally aspirated 6.0L V12",
    ],
    gallery: buildGallery(""),
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Power", value: "720 HP" },
          { label: "Torque", value: "640 Nm" },
          { label: "0–60 mph", value: "2.4 s" },
          { label: "Top Speed", value: "198 mph" },
          { label: "Redline", value: "9,200 rpm" },
        ],
      },
      {
        title: "Powertrain",
        specs: [
          { label: "Engine", value: "6.0L V12 NA" },
          { label: "Transmission", value: "7‑speed open gate" },
          { label: "Drive", value: "RWD" },
        ],
      },
      {
        title: "Chassis",
        specs: [
          { label: "Roof", value: "Targa carbon" },
          { label: "Weight (dry)", value: "1,310 kg" },
          { label: "Suspension", value: "Magnetic ride" },
        ],
      },
    ],
  },
  "monolith-x": {
    description:
      "Brutalist silhouette, all‑terrain capability, electric soul. The Monolith X is a high‑performance utility vehicle that refuses to apologize for its presence — or its capability.",
    highlights: [
      "All‑terrain capability",
      "Quad‑motor architecture",
      "5,000 kg towing capacity",
      "Crab walk + tank turn",
    ],
    gallery: buildGallery(""),
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Power", value: "980 HP" },
          { label: "Torque", value: "1,400 Nm" },
          { label: "0–60 mph", value: "2.8 s" },
          { label: "Top Speed", value: "186 mph" },
          { label: "Towing", value: "5,000 kg" },
        ],
      },
      {
        title: "Powertrain",
        specs: [
          { label: "Architecture", value: "Quad‑motor AWD" },
          { label: "Battery", value: "180 kWh" },
          { label: "Range", value: "382 mi" },
          { label: "Charging", value: "350 kW DC" },
        ],
      },
      {
        title: "Off‑Road",
        specs: [
          { label: "Ground clearance", value: "320 mm" },
          { label: "Wading depth", value: "1,000 mm" },
          { label: "Crab walk", value: "Standard" },
          { label: "Tank turn", value: "Standard" },
        ],
      },
    ],
  },
  "soleil-restomod": {
    description:
      "A modern heart inside a classic skin. The Soleil 250 honors the silhouette of a 1968 icon while answering to a hand‑built electric powertrain. Every panel hand‑rolled. Fifty will exist.",
    highlights: [
      "Hand‑rolled aluminum bodywork",
      "Electric restomod powertrain",
      "Limited to 50 worldwide",
      "12‑month bespoke build",
    ],
    gallery: buildGallery(""),
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Power", value: "480 HP" },
          { label: "Torque", value: "560 Nm" },
          { label: "0–60 mph", value: "3.4 s" },
          { label: "Top Speed", value: "174 mph" },
        ],
      },
      {
        title: "Powertrain",
        specs: [
          { label: "Architecture", value: "Single‑motor RWD" },
          { label: "Battery", value: "75 kWh" },
          { label: "Range", value: "212 mi" },
        ],
      },
      {
        title: "Heritage",
        specs: [
          { label: "Body", value: "Hand‑rolled aluminum" },
          { label: "Build time", value: "12 months" },
          { label: "Production", value: "50 units" },
        ],
      },
    ],
  },
};

export function getCarWithDetail(car: Car) {
  const detail = carDetails[car.id];
  return {
    ...car,
    detail,
    gallery: [car.image, heroCar, car.image],
  };
}
