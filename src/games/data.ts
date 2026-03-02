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
    { chemical: "Sodium Lauryl Sulfate (SLS)", safe: false, explanation: "SLS may irritate sensitive skin at higher concentrations and can carry 1,4-dioxane impurities from manufacturing.", alternative: "Use castile soap or plant-based surfactants." },
    { chemical: "White Vinegar", safe: true, explanation: "A naturally derived, low-concern cleaner that cuts grease effectively at normal dilutions.", alternative: "Great alternative to harsh synthetic cleaners." },
    { chemical: "Ammonia", safe: false, explanation: "A respiratory irritant at high concentrations — ventilate well and never mix with bleach.", alternative: "Use baking soda paste or lemon juice." },
    { chemical: "Castile Soap", safe: true, explanation: "Plant-derived and biodegradable — well-regarded for skin compatibility.", alternative: "Excellent base for homemade cleaners." },
    { chemical: "Chlorine Bleach", safe: false, explanation: "Releases irritating fumes in enclosed spaces; creates dangerous compounds when mixed with certain cleaners.", alternative: "Use hydrogen peroxide or oxygen bleach in well-ventilated areas." },
    { chemical: "Baking Soda", safe: true, explanation: "A gentle mineral abrasive that deodorizes effectively with very low risk profile.", alternative: "Scrubs surfaces without scratching." },
    { chemical: "Phthalates", safe: false, explanation: "Often hidden under 'fragrance' — classified as endocrine-disrupting chemicals by several regulatory bodies.", alternative: "Choose fragrance-free or naturally scented products." },
    { chemical: "Essential Oils", safe: true, explanation: "Plant-derived fragrance compounds with noted antimicrobial properties at appropriate concentrations.", alternative: "Add pleasant scents to DIY cleaners." },
  ],
  "Personal Care": [
    { chemical: "Parabens", safe: false, explanation: "Mild preservatives flagged by regulators for potential hormone-disrupting activity — cumulative exposure is the key concern.", alternative: "Prefer products using alternative preservative systems." },
    { chemical: "Coconut Oil", safe: true, explanation: "A well-studied emollient with low risk profile; noted for light antimicrobial properties.", alternative: "Good natural makeup remover and moisturizer." },
    { chemical: "Phthalates", safe: false, explanation: "Classified as endocrine-disrupting chemicals; commonly found undisclosed within synthetic fragrances.", alternative: "Choose phthalate-free cosmetics." },
    { chemical: "Aloe Vera", safe: true, explanation: "A well-tolerated botanical used topically for centuries, with low risk at standard cosmetic concentrations.", alternative: "Good for soothing minor skin irritation." },
    { chemical: "Formaldehyde", safe: false, explanation: "A known carcinogen at high exposures — classified as Group 1 by IARC. Found as a trace releaser in some nail and hair products.", alternative: "Look for formaldehyde-free labelling." },
    { chemical: "Shea Butter", safe: true, explanation: "A plant-derived fat with excellent skin compatibility and low sensitization risk.", alternative: "Alternative to petroleum-based moisturizers." },
    { chemical: "Sulfates", safe: false, explanation: "Effective cleansers that can strip the skin's natural oils at higher concentrations, causing dryness.", alternative: "Use gentle, sulfate-free shampoo formulas." },
    { chemical: "Jojoba Oil", safe: true, explanation: "A liquid wax that closely mimics skin sebum, with strong compatibility for most skin types.", alternative: "All-skin-type moisturizing option." },
  ],
  "Food & Kitchen": [
    { chemical: "BPA (Bisphenol A)", safe: false, explanation: "An industrial chemical that can leach from some plastics into food — flagged by regulators for potential hormonal effects.", alternative: "Use glass, stainless steel, or BPA-free containers." },
    { chemical: "Lemon Juice", safe: true, explanation: "A natural source of citric acid and vitamin C — low concern and used widely as a food ingredient.", alternative: "A natural preservative and flavoring agent." },
    { chemical: "Artificial Food Colors", safe: false, explanation: "Some synthetic dyes are linked to hyperactivity concerns in children and are restricted or labeled in the EU.", alternative: "Use beet juice, turmeric, or spirulina for color." },
    { chemical: "Sea Salt", safe: true, explanation: "A minimally processed mineral source with fewer additives than refined salt.", alternative: "A better alternative to heavily processed table salt." },
    { chemical: "High Fructose Corn Syrup", safe: false, explanation: "A highly processed sweetener associated with metabolic concerns when consumed in large amounts.", alternative: "Honey or maple syrup in moderation." },
    { chemical: "Organic Apple Cider Vinegar", safe: true, explanation: "Contains natural enzymes and beneficial acids — used widely as a food ingredient with a low risk profile.", alternative: "A natural digestive and culinary aid." },
    { chemical: "MSG", safe: false, explanation: "Generally recognized as safe (FDA GRAS) but can trigger sensitivity symptoms in a subset of people at high doses.", alternative: "Use herbs, spices, or nutritional yeast for umami." },
    { chemical: "Himalayan Pink Salt", safe: true, explanation: "A less-processed mineral salt with trace elements — similar nutritional profile to sea salt.", alternative: "Alternative to heavily refined table salt." },
  ],
  "Home & Garden": [
    { chemical: "Glyphosate", safe: false, explanation: "Classified as \"probably carcinogenic\" (IARC Group 2A) and linked to harm for pollinators at regular exposure levels.", alternative: "Manual weeding, mulching, or food-grade vinegar." },
    { chemical: "Diatomaceous Earth (Food Grade)", safe: true, explanation: "A naturally occurring mineral powder used as an organic pest control agent with low mammalian toxicity.", alternative: "Effective organic pest control option." },
    { chemical: "VOCs", safe: false, explanation: "Volatile organic compounds released from paints and finishes can cause respiratory irritation with prolonged indoor exposure.", alternative: "Choose low-VOC or zero-VOC labelled paints." },
    { chemical: "Beeswax", safe: true, explanation: "A natural, non-synthetic wax with excellent safety profile — widely used for wood finishing.", alternative: "Great natural alternative to synthetic polishes." },
    { chemical: "Synthetic Fragrances", safe: false, explanation: "'Fragrance' is often a blend of undisclosed chemicals, which may include classified endocrine disruptors like phthalates.", alternative: "Essential oils or certified fragrance-free alternatives." },
    { chemical: "Neem Oil", safe: true, explanation: "A plant-derived oil that biodegrades readily and shows low risk to beneficial insects when used as directed.", alternative: "Effective organic pest control." },
    { chemical: "Chlorpyrifos", safe: false, explanation: "A pesticide classified as a developmental neurotoxicant, banned or restricted in several countries due to risk to children.", alternative: "Integrated Pest Management (IPM) with natural predators." },
    { chemical: "Borax", safe: true, explanation: "An effective natural cleaner and pest deterrent when used as directed — store safely away from children.", alternative: "Natural cleaning and pest control option." },
  ],
  "Baby & Kids": [
    { chemical: "Talc", safe: false, explanation: "May carry asbestos contamination from mining — poses respiratory risk, particularly to infants.", alternative: "Choose talc-free powder or cornstarch-based alternatives." },
    { chemical: "Organic Coconut Oil", safe: true, explanation: "A gentle, plant-derived emollient widely used for infant skin with a strong safety profile.", alternative: "Safe and natural moisturizer for babies." },
    { chemical: "Flame Retardants", safe: false, explanation: "Certain flame retardant chemicals bioaccumulate and are flagged for developmental and hormonal concerns.", alternative: "Look for flame-retardant-free mattresses and furniture." },
    { chemical: "Organic Cotton", safe: true, explanation: "Grown without synthetic pesticides — lower chemical residue concern for sensitive infant skin.", alternative: "Preferred for baby clothing and bedding." },
    { chemical: "Lead", safe: false, explanation: "A well-documented developmental neurotoxicant — no safe level of exposure has been established for children.", alternative: "Use lead-free products and test paint in older homes." },
    { chemical: "Calendula", safe: true, explanation: "A botanically derived ingredient with a long track record of safe topical use, even on sensitive baby skin.", alternative: "Gentle and effective natural remedy." },
    { chemical: "Triclosan", safe: false, explanation: "An antibacterial agent linked to antibiotic resistance and flagged for endocrine-disrupting potential by regulators.", alternative: "Plain soap and water is equally effective." },
    { chemical: "Chamomile", safe: true, explanation: "A widely used botanical with a well-established safety profile for topical and mild internal use.", alternative: "Safe for baby products and gentle enough for newborns." },
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
