import { Users, Award, ShieldCheck, Leaf, HeartHandshake, ShoppingCart } from "lucide-react";

export const coreValues = [
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive network of like‑minded individuals committed to chemical‑free living.",
    color: 'green'
  },
  {
    icon: Award,
    title: "Quality & Safety",
    description: "Setting the highest standards for safety, purity, and effectiveness.",
    color: 'yellow'
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    description: "Clear, honest information about every product, ingredient, and process.",
    color: 'blue'
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Minimizing environmental impact through eco‑friendly practices.",
    color: 'green'
  },
  {
    icon: HeartHandshake,
    title: "Trust",
    description: "Building lasting relationships with customers and partners.",
    color: 'purple'
  },
  {
    icon: ShoppingCart,
    title: "Convenience",
    description: "Making safe, quality products easily accessible to everyone.",
    color: 'blue'
  }
] as const;
