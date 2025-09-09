import { Droplets, User, UtensilsCrossed, TreePine, Baby } from "lucide-react";

export interface Product {
  name: string;
  category: "safe" | "harmful";
  type: string;
  correct?: boolean;
}

export const categoryConfig = {
  "Cleaning Products": {
    color: "blue",
    icon: Droplets,
    bgGradient: "from-blue-50 to-blue-100",
    borderColor: "border-blue-300",
    textColor: "text-blue-800",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    buttonActiveColor: "bg-blue-600",
    progressColor: "bg-blue-500",
  },
  "Personal Care": {
    color: "purple",
    icon: User,
    bgGradient: "from-purple-50 to-purple-100",
    borderColor: "border-purple-300",
    textColor: "text-purple-800",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    buttonActiveColor: "bg-purple-600",
    progressColor: "bg-purple-500",
  },
  "Food & Kitchen": {
    color: "orange",
    icon: UtensilsCrossed,
    bgGradient: "from-orange-50 to-orange-100",
    borderColor: "border-orange-300",
    textColor: "text-orange-800",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
    buttonActiveColor: "bg-orange-600",
    progressColor: "bg-orange-500",
  },
  "Home & Garden": {
    color: "emerald",
    icon: TreePine,
    bgGradient: "from-emerald-50 to-emerald-100",
    borderColor: "border-emerald-300",
    textColor: "text-emerald-800",
    buttonColor: "bg-emerald-600 hover:bg-emerald-700",
    buttonActiveColor: "bg-emerald-600",
    progressColor: "bg-emerald-500",
  },
  "Baby & Kids": {
    color: "pink",
    icon: Baby,
    bgGradient: "from-pink-50 to-pink-100",
    borderColor: "border-pink-300",
    textColor: "text-pink-800",
    buttonColor: "bg-pink-600 hover:bg-pink-700",
    buttonActiveColor: "bg-pink-600",
    progressColor: "bg-pink-500",
  },
} as const;

export const quizData = {
  "Cleaning Products": [
    { chemical: "Sodium Lauryl Sulfate (SLS)", safe: false, explanation: "SLS can irritate skin and may contain 1,4‑dioxane impurities.", alternative: "Use castile soap or plant‑based surfactants." },
    { chemical: "White Vinegar", safe: true, explanation: "Natural, non‑toxic cleaner that cuts grease.", alternative: "Great alt to harsh cleaners." },
    { chemical: "Ammonia", safe: false, explanation: "Respiratory irritant; never mix with bleach.", alternative: "Use baking soda paste or lemon juice." },
    { chemical: "Castile Soap", safe: true, explanation: "Biodegradable and gentle on skin.", alternative: "Excellent base for homemade cleaners." },
    { chemical: "Chlorine Bleach", safe: false, explanation: "Releases toxic fumes; dangerous mixes.", alternative: "Use hydrogen peroxide / oxygen bleach." },
    { chemical: "Baking Soda", safe: true, explanation: "Gentle abrasive that deodorizes.", alternative: "Scrubs without scratches." },
    { chemical: "Phthalates", safe: false, explanation: "Often hidden in ‘fragrance’; endocrine disruptors.", alternative: "Choose fragrance‑free or natural scents." },
    { chemical: "Essential Oils", safe: true, explanation: "Natural fragrance & antimicrobial props.", alternative: "Add pleasant scents to cleaners." },
  ],
  "Personal Care": [
    { chemical: "Parabens", safe: false, explanation: "May disrupt hormones.", alternative: "Prefer paraben‑free products." },
    { chemical: "Coconut Oil", safe: true, explanation: "Moisturizes; antimicrobial.", alternative: "Good makeup remover." },
    { chemical: "Phthalates", safe: false, explanation: "Hormone disruptors in fragrances.", alternative: "Choose phthalate‑free cosmetics." },
    { chemical: "Aloe Vera", safe: true, explanation: "Soothes skin naturally.", alternative: "Good for minor burns." },
    { chemical: "Formaldehyde", safe: false, explanation: "Known carcinogen in some nail/hair products.", alternative: "Pick formaldehyde‑free options." },
    { chemical: "Shea Butter", safe: true, explanation: "Deep moisturization without synthetics.", alternative: "Alt to petroleum moisturizers." },
    { chemical: "Sulfates", safe: false, explanation: "Harsh; strip natural oils.", alternative: "Use gentle sulfate‑free shampoo." },
    { chemical: "Jojoba Oil", safe: true, explanation: "Mimics skin sebum.", alternative: "All‑skin‑type moisturizer." },
  ],
  "Food & Kitchen": [
    { chemical: "BPA (Bisphenol A)", safe: false, explanation: "Can leach; disrupts hormones.", alternative: "Use glass/stainless/BPA‑free." },
    { chemical: "Lemon Juice", safe: true, explanation: "Natural citric acid; vitamin C.", alternative: "Natural preservative/flavor." },
    { chemical: "Artificial Food Colors", safe: false, explanation: "Linked to hyperactivity/allergies.", alternative: "Use beet/turmeric etc." },
    { chemical: "Sea Salt", safe: true, explanation: "Natural minerals; fewer additives.", alternative: "Better than refined salt." },
    { chemical: "High Fructose Corn Syrup", safe: false, explanation: "Tied to metabolic issues.", alternative: "Honey/maple in moderation." },
    { chemical: "Organic Apple Cider Vinegar", safe: true, explanation: "Enzymes/probiotics.", alternative: "Natural digestive aid." },
    { chemical: "MSG", safe: false, explanation: "May trigger symptoms for some.", alternative: "Use herbs/spices." },
    { chemical: "Himalayan Pink Salt", safe: true, explanation: "Trace minerals; less processed.", alternative: "Alt to refined salt." },
  ],
  "Home & Garden": [
    { chemical: "Glyphosate", safe: false, explanation: "Probable carcinogen; harms insects.", alternative: "Manual weeding, mulching, vinegar." },
    { chemical: "Diatomaceous Earth (Food Grade)", safe: true, explanation: "Natural pest control (food grade).", alternative: "Effective organic option." },
    { chemical: "VOCs", safe: false, explanation: "Cause respiratory issues.", alternative: "Pick low/zero‑VOC paints." },
    { chemical: "Beeswax", safe: true, explanation: "Non‑toxic wood protection.", alternative: "Great natural polish." },
    { chemical: "Synthetic Fragrances", safe: false, explanation: "Undisclosed chems incl. phthalates.", alternative: "Essential oils / fragrance‑free." },
    { chemical: "Neem Oil", safe: true, explanation: "Biodegradable; safe for beneficials.", alternative: "Organic pest control." },
    { chemical: "Chlorpyrifos", safe: false, explanation: "Neurotoxic; harms children’s development.", alternative: "IPM with natural predators." },
    { chemical: "Borax", safe: true, explanation: "Effective cleaner/pest control if used properly.", alternative: "Store safely." },
  ],
  "Baby & Kids": [
    { chemical: "Talc", safe: false, explanation: "May contain asbestos; respiratory risk.", alternative: "Talc‑free/cornstarch powder." },
    { chemical: "Organic Coconut Oil", safe: true, explanation: "Gentle moisturizer for babies.", alternative: "Safe alternative." },
    { chemical: "Flame Retardants", safe: false, explanation: "Accumulate; development concerns.", alternative: "Retardant‑free mattresses/furniture." },
    { chemical: "Organic Cotton", safe: true, explanation: "No pesticides; better for skin.", alternative: "Prefer for baby clothes." },
    { chemical: "Lead", safe: false, explanation: "Affects brain development.", alternative: "Choose lead‑free; test old paint." },
    { chemical: "Calendula", safe: true, explanation: "Soothes and heals.", alternative: "Gentle remedy." },
    { chemical: "Triclosan", safe: false, explanation: "Antibacterial → resistance risk.", alternative: "Plain soap & water." },
    { chemical: "Chamomile", safe: true, explanation: "Calming; anti‑inflammatory.", alternative: "Safe in baby products." },
  ],
} as const;

export const sortingProducts: Product[] = [
  { name: "Conventional Bleach", category: "harmful", type: "Cleaning" },
  { name: "White Vinegar", category: "safe", type: "Cleaning" },
  { name: "Paraben Shampoo", category: "harmful", type: "Personal Care" },
  { name: "Castile Soap", category: "safe", type: "Personal Care" },
  { name: "BPA Plastic Bottles", category: "harmful", type: "Kitchen" },
  { name: "Glass Food Containers", category: "safe", type: "Kitchen" },
  { name: "Synthetic Air Freshener", category: "harmful", type: "Home" },
  { name: "Essential Oil Diffuser", category: "safe", type: "Home" },
  { name: "Talc Baby Powder", category: "harmful", type: "Baby Care" },
  { name: "Organic Cotton Onesie", category: "safe", type: "Baby Care" },
  { name: "Glyphosate Weed Killer", category: "harmful", type: "Garden" },
  { name: "Diatomaceous Earth", category: "safe", type: "Garden" },
];

export const memoryCards = [
  { id: 1, name: "Parabens", category: "harmful" },
  { id: 2, name: "Phthalates", category: "harmful" },
  { id: 3, name: "Formaldehyde", category: "harmful" },
  { id: 4, name: "Triclosan", category: "harmful" },
  { id: 5, name: "BPA", category: "harmful" },
  { id: 6, name: "Ammonia", category: "harmful" },
  { id: 7, name: "Chlorine Bleach", category: "harmful" },
  { id: 8, name: "Glyphosate", category: "harmful" },
  { id: 9, name: "Coconut Oil", category: "healthy" },
  { id: 10, name: "Aloe Vera", category: "healthy" },
  { id: 11, name: "Shea Butter", category: "healthy" },
  { id: 12, name: "Baking Soda", category: "healthy" },
  { id: 13, name: "White Vinegar", category: "healthy" },
  { id: 14, name: "Castile Soap", category: "healthy" },
  { id: 15, name: "Essential Oils", category: "healthy" },
  { id: 16, name: "Lemon Juice", category: "healthy" },
];
