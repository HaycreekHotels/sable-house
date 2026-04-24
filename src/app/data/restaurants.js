export const restaurants = [
  {
    id: 1,
    eyebrow: "Restaurant & Bar",
    title: "Oak Steak House",
    slug: "oak-steak-house",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1740&auto=format&fit=crop",
    imageAlt: "Elegant restaurant table at Sabal House",
    description:
      "The Sabal Room is a refined dining experience with seasonal dishes, intimate lighting, and a relaxed southern-inspired atmosphere.",
    hours: [
      "Daily, Breakfast & Brunch: 7AM - 2PM",
      "Daily, Dinner: 5PM - 10PM",
      "Daily, Happy Hour: 2PM - 5PM",
    ],
    reservationUrl: "https://example.com/book-table",
    menuSections: [
      {
        title: "Breakfast",
        items: [
          {
            name: "Seasonal Fruit & Yogurt Bowl",
            description:
              "Greek yogurt, local honey, fresh berries, toasted granola, and mint.",
            price: "$14",
          },
          {
            name: "Savannah Breakfast Plate",
            description:
              "Soft scrambled eggs, roasted potatoes, smoked bacon, and grilled sourdough.",
            price: "$18",
          },
          {
            name: "Garden Herb Omelet",
            description:
              "Three eggs, fresh herbs, goat cheese, mushrooms, and dressed greens.",
            price: "$17",
          },
        ],
      },
      {
        title: "Afternoon Tea",
        items: [
          {
            name: "Classic Tea Service",
            description:
              "Selection of teas served with tea sandwiches, scones, and preserves.",
            price: "$28",
          },
          {
            name: "Southern Sweet Plate",
            description:
              "Mini pastries, lemon cakes, praline bites, and seasonal fruit.",
            price: "$16",
          },
        ],
      },
      {
        title: "Bar",
        items: [
          {
            name: "House Spritz",
            description:
              "Sparkling wine, citrus, botanical aperitif, and fresh herbs.",
            price: "$15",
          },
          {
            name: "Local Cheese Board",
            description:
              "Regional cheeses, seasonal jam, crackers, pickled vegetables, and nuts.",
            price: "$24",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    eyebrow: "Cocktails & Lounge",
    title: "The Bar",
    slug: "the-bar",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1740&auto=format&fit=crop",
    imageAlt: "Cocktail bar at Sabal House",
    description:
      "Magnolia Bar offers handcrafted cocktails, small plates, and a cozy lounge setting made for slow evenings and easy conversation.",
    hours: [
      "Monday - Thursday: 4PM - 11PM",
      "Friday - Saturday: 3PM - 12AM",
      "Sunday: 3PM - 10PM",
    ],
    reservationUrl: "https://example.com/book-table",
    menuSections: [
      {
        title: "Cocktails",
        items: [
          {
            name: "Magnolia Old Fashioned",
            description:
              "Bourbon, demerara, bitters, orange oil, and a preserved cherry.",
            price: "$16",
          },
          {
            name: "Garden Gimlet",
            description:
              "Gin, lime, cucumber, basil, and a touch of elderflower.",
            price: "$15",
          },
          {
            name: "Sabal House Martini",
            description:
              "Vodka or gin, dry vermouth, orange bitters, and lemon twist.",
            price: "$17",
          },
        ],
      },
      {
        title: "Small Plates",
        items: [
          {
            name: "Crispy Potatoes",
            description:
              "Herb aioli, sea salt, cracked pepper, and fresh parsley.",
            price: "$12",
          },
          {
            name: "Shrimp Toast",
            description:
              "Toasted brioche, whipped herb cheese, chilled shrimp, and lemon.",
            price: "$18",
          },
          {
            name: "Charcuterie Board",
            description:
              "Cured meats, local cheese, pickles, mustard, crackers, and seasonal jam.",
            price: "$26",
          },
        ],
      },
      {
        title: "Zero-Proof",
        items: [
          {
            name: "Citrus & Rosemary Fizz",
            description: "Fresh citrus, rosemary syrup, soda, and orange peel.",
            price: "$10",
          },
          {
            name: "Blackberry Mint Cooler",
            description:
              "Blackberry, mint, lemon, simple syrup, and sparkling water.",
            price: "$10",
          },
        ],
      },
    ],
  },
];
