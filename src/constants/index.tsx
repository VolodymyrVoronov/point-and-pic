import { FileImage, Link, MapPinned } from "lucide-react";
import { type ReactNode } from "react";

export const URL_PARAMS_TO_CHECK = ["lat", "lng", "pic"];

export const STEPS: {
  id: number;
  step: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    id: 1,
    step: "Step 1",
    description: "Select place on the map you want to mark and share.",
    icon: <MapPinned size={50} />,
  },
  {
    id: 2,
    step: "Step 2",
    description: "Upload  or make a photo of the place.",
    icon: <FileImage size={50} />,
  },
  {
    id: 3,
    step: "Step 3",
    description: "Share the link with your friends.",
    icon: <Link size={50} />,
  },
];

export const BASE45_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
