export const offersPageIntro = {
  eyebrow: "Special Stays at Sabal House",
  title: "Packages & Offers",
  description:
    "Find a little more to love about your time in Savannah. Explore seasonal offers and thoughtfully arranged stays at Sabal House, made for moments worth lingering over.",
};

export const FEATURED_OFFER_ID = "black-friday-invitation";

export const packageOffers = [
  {
    id: "black-friday-invitation",
    category: "offer",
    tabs: ["offers"],
    featured: true,
    eyebrow: "Featured Offer",
    title: "A Black Friday Invitation",
    description:
      "We've been looking forward to welcoming you to Sabal House. And with our doors opening soon, we thought we'd begin with a little gesture of Southern hospitality.",
    image:
      "https://sabal-house.b-cdn.net/offers%20and%20pacakges/Heritage%20Double%20Queen%20with%20Fireplace%20-%20wide.png",
    imageAlt:
      "Guestroom at Sabal House, with plush bedding and a brick fireplace",
    // Already used by the existing Sabal House Black Friday popup.
    bookingUrl:
      "https://bookings.sabalhouse.com/book/dates-of-stay?pl=l54q58756h55o58o51a50f51o50950855358v50100&RatePlanId=11780260",
    visibleThrough: "2026-12-03",
    bookBy: "December 3, 2026",
    stayDates: "December 15, 2026 – November 30, 2027",
    details: [
      { label: "Offer", value: "40% Off Stay" },
      { label: "Welcome", value: "Bottle of Prosecco" },
    ],
    inclusions: [
      {
        title: "40% Off Stay",
        description: "A special savings offer on your stay at Sabal House.",
      },
      {
        title: "Bottle of Prosecco",
        description: "A welcoming bottle of Prosecco.",
      },
    ],
  },
  {
    id: "midnight-in-savannah",
    category: "package",
    tabs: ["offers", "packages"],
    eyebrow: "New Year's Eve at Sabal House",
    title: "Midnight in Savannah",
    description:
      "There's something special about welcoming a new year in Savannah. For our very first New Year's Eve, we're putting together a celebration filled with thoughtful details, a memorable evening out, and a few Southern traditions to take home with you.",
    image:
      "https://sabal-house.b-cdn.net/offers%20and%20pacakges/SH_Hay%20Creek%20x%20Sabal%20House%20Email.png",
    imageAlt: "Savannah oak trees dressed in warm twinkling lights",
    // TODO: replace with the rate-plan URL if there is a specific package booking link.
    bookingUrl: "",
    visibleThrough: "2027-01-02",
    stayDates: "December 31, 2026 – January 2, 2027",
    lengthOfStay: "Two nights",
    availability: "Limited, subject to partner restaurant dining availability.",
    inclusions: [
      {
        title: "Two-Night Stay at Sabal House",
        description:
          "Includes a pre-arrival concierge call to coordinate the details of your stay.",
      },
      {
        title: "A Champagne Welcome",
        description:
          "Champagne on ice upon arrival, accompanied by a commemorative Sabal House New Year's Eve keepsake.",
      },
      {
        title: "New Year's Eve Dinner for Two",
        description:
          "A prix-fixe dinner at a partner restaurant, or dining credit toward an à la carte experience, with round-trip transportation if needed.",
      },
      {
        title: "A Thoughtful Turndown",
        description:
          "Return to a refreshed room, complete with robes laid out, drapes drawn, and a New Year's recovery kit with bottled water, electrolytes, and morning-after essentials.",
      },
      {
        title: "A Slow Morning in Savannah",
        description:
          "New Year's Day breakfast delivered to your room, featuring cornbread muffins, croissants, fresh fruit, and coffee.",
      },
      {
        title: "Bloody Mary Gift Kit",
        description:
          "A take-home collection featuring Bloody Mary mix, miniature vodka bottles, Southern garnishes, cocktail accessories, Savannah coasters, and a Sabal House tote.",
      },
      {
        title: "Luck for the New Year",
        description:
          "A Southern-inspired gift featuring black-eyed peas, cornbread mix, collard greens seeds, local hot sauce, and a Hoppin' John recipe.",
      },
      {
        title: "A Private Savannah Experience",
        description:
          "A special New Year's Eve Yuletide tour of the historic downtown, exploring holiday traditions of the 1800s.",
      },
      {
        title: "A Little More Time",
        description:
          "Enjoy New Year's Day evening at your leisure and late checkout at 1 PM.",
      },
    ],
  },
  {
    id: "santa-tuck-ins",
    category: "package",
    tabs: ["offers", "packages"],
    eyebrow: "A Little Christmas Magic",
    title: "Santa Tuck-Ins",
    description:
      "As Christmas Eve draws near, make room for one more cherished holiday tradition. A special visit from Santa, milk and cookies before bedtime, and the delight of seeing little faces light up. A lovely way to spend the evening together and make a memory your family will carry home.",
    image: "https://sabal-house.b-cdn.net/offers%20and%20pacakges/NewSanta.png",
    imageAlt: "Santa Claus visiting Sabal House during the holiday season",
    bookingUrl: "", // TODO: add the booking URL for this package when available.
    // No dates were supplied in the mockup. Confirm with the hotel before publishing.
    stayDates: "Holiday dates to be confirmed",
    availability: "Please confirm dates and availability with Sabal House.",
    inclusions: [
      {
        title: "Santa Tuck-In Visit",
        description:
          "A special visit from Santa, with milk and cookies before bedtime.",
      },
    ],
  },
];

/** Savannah-local current date; server rendering never relies on the host UTC zone. */
export function savannahToday(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (key) => parts.find((part) => part.type === key)?.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

/** Do not display promotions once their published validity has passed. */
export function activePackageOffers(
  today = savannahToday(),
  offers = packageOffers,
) {
  return offers.filter(
    (offer) => !offer.visibleThrough || offer.visibleThrough >= today,
  );
}
