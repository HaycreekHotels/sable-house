export const faqCategories = [
  { id: "rates", label: "Rates, Fees & Dining" },
  { id: "arrival", label: "Arrival, Parking & Transportation" },
  { id: "pets", label: "Pets & Service Animals" },
  { id: "rooms", label: "Rooms & Accessibility" },
  { id: "location", label: "Location & Exploring Savannah" },
  { id: "services", label: "Guest Services" },
  { id: "cancellations", label: "Reservations & Cancellations" },
  { id: "policies", label: "House Policies" },
];

export const featuredFaqIds = [
  "where-located",
  "check-in",
  "check-out",
  "destination-fee",
  "parking",
  "pets-allowed",
  "standard-cancellation",
  "accessible-rooms",
];

export const faqs = [
  {
    id: "destination-fee",
    category: "rates",
    question: "Does Sabal House charge a destination fee?",
    answer:
      "Yes. A nightly Destination Fee of $40 plus tax is applied to all reservations.",
  },
  {
    id: "destination-inclusions",
    category: "rates",
    question: "What is included in the Sabal House destination fee?",
    answer: "The Sabal House Destination Fee includes:",
    bullets: [
      "Daily 30-minute guided walking tour",
      "Access to The Unmarked Door digital Savannah experience",
      "Complimentary Savannah Trolley Tour passes",
      "Exclusive local shopping offers",
      "Complimentary access to Fitness on Broughton",
      "Complimentary Sabal Spoke bicycle rentals, based on availability",
      "Local transportation service, based on availability",
      "Complimentary in-room morning coffee delivery",
      "Complimentary high-speed Wi-Fi",
      "Priority seating at Oak Steakhouse*",
      "Exclusive guest dining benefits at Oak Steakhouse*",
      "Hydration stations throughout Sabal House",
      "Curated pillow menu, based on availability",
    ],
    note: "*Oak Steakhouse is anticipated to open in February 2027.",
  },
  {
    id: "credit-card-fee",
    category: "rates",
    question: "Does Sabal House charge a credit card convenience fee?",
    answer:
      "Yes. A 0.5% convenience fee is charged on all credit card purchases.",
  },
  {
    id: "breakfast",
    category: "rates",
    question: "Is breakfast included at Sabal House?",
    answer:
      "No. Breakfast is not included with the room rate. Oak Steakhouse offers an à la carte menu for breakfast to our hotel guests.",
  },
  {
    id: "security-deposit",
    category: "rates",
    question: "Does Sabal House require a security deposit?",
    answer:
      "Yes. Sabal House authorizes an additional $100 per night on the guest’s method of payment at check-in. Unused funds are released after departure. Depending on your bank or card issuer, it may take 7–10 business days for the funds to become available.",
  },
  {
    id: "st-patricks-deposit",
    category: "rates",
    question: "Is the security deposit higher during St. Patrick’s Day?",
    answer:
      "Yes. For stays during Savannah’s St. Patrick’s Day period, the security deposit increases to $200 per night.",
  },
  {
    id: "taxes",
    category: "rates",
    question: "What taxes and fees apply to my stay?",
    answer:
      "Applicable taxes and fees include Georgia state and local tax of 7%, Savannah hotel/motel excise tax of 8%, and the Georgia state hotel/motel fee of $5 per occupied room night.",
  },

  // Arrival, parking and transportation
  {
    id: "parking",
    category: "arrival",
    question: "Does Sabal House offer parking?",
    answer:
      "Valet parking is available 24 hours a day for $50 per night per vehicle. Hourly valet parking is available for restaurant guests.",
  },
  {
    id: "ev-charging",
    category: "arrival",
    question: "Does Sabal House offer EV charging?",
    answer:
      "No, Sabal House does not offer EV charging. EV charging stations are available in Savannah at various city garages and street-side locations.",
  },
  {
    id: "oversized-parking",
    category: "arrival",
    question: "Does Sabal House have oversized vehicle parking?",
    answer:
      "No. Sabal House does not offer oversized vehicle parking. The clearance is 6’9”.",
  },
  {
    id: "check-in",
    category: "arrival",
    question: "What time is check-in at Sabal House?",
    answer: "Check-in begins at 4:00 PM.",
  },
  {
    id: "check-out",
    category: "arrival",
    question: "What time is check-out at Sabal House?",
    answer: "Check-out is at 11:00 AM.",
  },
  {
    id: "early-check-in",
    category: "arrival",
    question: "Can I check in early?",
    answer:
      "Early check-in may be available based on occupancy and room availability. Additional fees may apply.",
  },
  {
    id: "late-check-out",
    category: "arrival",
    question: "Can I request a late check-out?",
    answer:
      "Late check-out may be available based on occupancy and room availability. Additional fees may apply.",
  },
  {
    id: "minimum-age",
    category: "arrival",
    question: "What is the minimum age to check in at Sabal House?",
    answer:
      "Guests must be at least 21 years old to check in. A valid government-issued photo ID and credit card are required at check-in.",
  },
  {
    id: "airport-transportation",
    category: "arrival",
    question: "Does Sabal House offer airport transportation?",
    answer:
      "No. Sabal House does not provide airport shuttle service. Guests may arrange transportation through rideshare, taxi, or private car service.",
  },

  // Pets
  {
    id: "pets-allowed",
    category: "pets",
    question: "Is Sabal House pet-friendly?",
    answer:
      "Yes. Sabal House welcomes well-behaved dogs in designated Heritage Pet-Friendly Rooms. Pet-friendly accommodations are limited and subject to availability.",
  },
  {
    id: "pet-policy",
    category: "pets",
    question: "What is the Sabal House pet policy?",
    answer:
      "Sabal House allows one dog up to 50 pounds, or two dogs with a combined weight of up to 75 pounds, in designated Heritage Pet-Friendly Rooms. A non-refundable pet fee of $175 per stay applies. Dogs may not be left unattended in the guestroom at any time. Additional cleaning or damage charges may apply if the policy is not followed.",
  },
  {
    id: "reserve-pet-room",
    category: "pets",
    question: "Do I need to request a pet-friendly room in advance?",
    answer:
      "Yes. Guests traveling with a dog must request a designated Heritage Pet-Friendly Room when making the reservation. Pet-friendly rooms are limited and subject to availability.",
  },
  {
    id: "other-pets",
    category: "pets",
    question: "Are cats or other pets allowed?",
    answer:
      "No. Only dogs are permitted. Service animals are always welcome in accordance with the Americans with Disabilities Act.",
  },

  // Rooms and accessibility
  {
    id: "refrigerators",
    category: "rooms",
    question: "Do rooms at Sabal House have refrigerators?",
    answer: "Yes. All guestrooms include a mini refrigerator.",
  },
  {
    id: "microwaves",
    category: "rooms",
    question: "Do rooms at Sabal House have microwaves?",
    answer: "No. Guestrooms do not include microwaves.",
  },
  {
    id: "coffee-makers",
    category: "rooms",
    question: "Do rooms at Sabal House have coffee makers?",
    answer: "Yes. Guestrooms include Nespresso coffee makers.",
  },
  {
    id: "rollaway-beds",
    category: "rooms",
    question: "Are rollaway beds available?",
    answer: "No. Rollaway beds are not available.",
  },
  {
    id: "cribs",
    category: "rooms",
    question: "Are cribs available?",
    answer:
      "Yes. Pack ’n Plays are available upon request and based on availability.",
  },
  {
    id: "extra-person-fee",
    category: "rooms",
    question: "Does Sabal House charge an extra person fee?",
    answer:
      "No. Sabal House does not charge an extra person fee. Room occupancy limits still apply.",
  },
  {
    id: "accessible-rooms",
    category: "rooms",
    question: "Does Sabal House offer accessible rooms?",
    answer:
      "Yes. Accessible rooms are available. Please contact the hotel directly before arrival so our team can help ensure your needs are met.",
  },
  {
    id: "elevators",
    category: "rooms",
    question: "Does Sabal House have elevators?",
    answer:
      "There are two easily accessible elevators in the Sabal House building and one located in the President’s Quarters building.",
  },
  {
    id: "stairs",
    category: "rooms",
    question: "Does Sabal House have stairs?",
    answer:
      "Yes, both buildings have stairs. The Heritage Loft Suite’s bedroom is only accessible by stairs.",
  },

  // Location and exploring Savannah
  {
    id: "airport-distance",
    category: "location",
    question:
      "How far is Sabal House from Savannah/Hilton Head International Airport?",
    answer:
      "Savannah/Hilton Head International Airport (SAV) is the nearest airport, located at 400 Airways Avenue, Savannah, GA. The airport is approximately 13 miles from Sabal House, depending on the route and traffic.",
  },
  {
    id: "where-located",
    category: "location",
    question: "Where is Sabal House located?",
    answer:
      "Sabal House is located at 225 E. President Street in Savannah, Georgia, adjacent to Oglethorpe Square and across the street from the Owens-Thomas House & Slave Quarters museum, near the Historic District’s attractions, restaurants, shops, and walkable squares.",
  },
  {
    id: "walkable",
    category: "location",
    question: "Is Sabal House walkable to restaurants and attractions?",
    answer:
      "Yes. Located at 225 East President Street in Savannah’s Historic District, Sabal House sits near Oglethorpe Square and adjacent to the Owens-Thomas House & Slave Quarters, placing guests in one of the city’s most walkable and historic neighborhoods. From the hotel, guests can easily explore Savannah’s iconic squares, restaurants, shops, museums, River Street, Broughton Street, the Savannah Civic Center, and nearby Savannah College of Art and Design.",
  },

  // Guest services and lost and found
  {
    id: "lost-item",
    category: "services",
    question: "What should I do if I left something behind at Sabal House?",
    answer:
      "If you believe you left an item behind at Sabal House, please submit a lost item report through our lost and found partner, iLeftMyStuff.",
    link: {
      href: "https://www.ileftmystuff.com/",
      label: "Visit iLeftMyStuff",
    },
  },
  {
    id: "report-lost-item",
    category: "services",
    question: "How do I report a lost item?",
    answer:
      "To report a lost item, visit www.iLeftMyStuff.com, select “Find My Stuff!”, enter Sabal House’s 5-digit Hotel Client Identification Number [insert ID], and complete the form with your contact information, stay details, and a description of the missing item. Please include as much detail as possible, such as your room number, checkout date, item color, brand, size, or any identifying features.",
    // TODO: Replace [insert ID] with the client-provided 5-digit number, then
    // remove this flag so the full instructions are published.
    status: "needs-review",
  },
  {
    id: "lost-item-follow-up",
    category: "services",
    question: "What happens after I submit a lost item report?",
    answer:
      "Once your report is received, the Sabal House team will review it and contact you if the item is located. If found, shipping may be arranged directly through iLeftMyStuff. Sabal House is not responsible for lost or misplaced items, and shipping costs are the responsibility of the guest.",
  },
  {
    id: "ship-packages",
    category: "services",
    question: "Can I ship a package to Sabal House before my stay?",
    answer:
      "Yes. Packages may be delivered to Sabal House before arrival, but the guest name on the package must match the name on the reservation. Packages may be held for up to 10 days.",
  },
  {
    id: "business-center",
    category: "services",
    question: "Does Sabal House have a business center?",
    answer: "No. Sabal House does not have a business center.",
  },
  {
    id: "front-desk",
    category: "services",
    question: "Does Sabal House have a front desk?",
    answer: "Yes. The front desk is staffed 24 hours a day.",
  },

  // Reservations and cancellation policies
  {
    id: "standard-cancellation",
    category: "cancellations",
    question: "What is the cancellation policy at Sabal House?",
    answer:
      "Reservations may be canceled without penalty until 4:00 PM Eastern Time, 72 hours prior to arrival. Reservations canceled after that time, or reservations that do not arrive as scheduled, will be charged a cancellation fee equal to one night’s room and tax.",
  },
  {
    id: "advance-purchase",
    category: "cancellations",
    question: "Are Advance Purchase reservations refundable?",
    answer:
      "No. Advance Purchase reservations are non-refundable and are charged in full at the time of booking. Advance Purchase reservations may not be canceled, changed, or refunded.",
  },
  {
    id: "high-demand",
    category: "cancellations",
    question:
      "Does Sabal House have special cancellation policies for high-demand dates?",
    answer:
      "Yes. Special event and high-demand dates may have separate deposit, cancellation, minimum stay, and non-refundable policies. These dates may include, but are not limited to, Savannah St. Patrick’s Day, New Year’s Eve, SCAD Commencement, holiday weekends, festivals, and other citywide demand periods. The cancellation policy shown at the time of booking will apply to the reservation.",
  },
  {
    id: "st-patricks-cancellation",
    category: "cancellations",
    question: "What is the cancellation policy for Savannah St. Patrick’s Day?",
    answer:
      "Reservations during Savannah’s St. Patrick’s Day period are subject to special event terms. A non-refundable deposit equal to one night’s room and tax will be charged at the time of booking. The remaining balance will be due 30 days prior to arrival and become non-refundable at that time. Cancellations, early departures, date changes, and no-shows during this period will result in a charge of the full stay, including applicable taxes and fees. Minimum stay requirements apply.",
  },
  {
    id: "other-events-cancellation",
    category: "cancellations",
    question:
      "What is the cancellation policy for New Year’s Eve, SCAD Commencement, and other high-demand dates?",
    answer:
      "Select high-demand dates, including New Year’s Eve, SCAD Commencement, holiday weekends, festivals, and major Savannah events, may require an advance deposit, minimum length of stay, or extended cancellation notice. Reservations canceled within the restricted cancellation period, shortened after booking, or not used as scheduled may be charged one night’s room and tax or the full stay, depending on the rate plan and event policy.",
  },
  {
    id: "which-cancellation",
    category: "cancellations",
    question:
      "How do I know which cancellation policy applies to my reservation?",
    answer:
      "The cancellation policy displayed at the time of booking and included in your confirmation email is the policy that applies to your reservation. Special offers, Advance Purchase rates, group rates, and high-demand dates may have different terms than the standard cancellation policy.",
  },

  // Property and conduct policies
  {
    id: "smoking",
    category: "policies",
    question: "Is smoking allowed at Sabal House?",
    answer:
      "No. Sabal House is a completely smoke-free property, including all guestrooms, suites, balconies, porches, and interior spaces. Smoking, vaping, and marijuana use are not permitted anywhere on the property. If evidence of smoking or vaping is found, a $350 deep cleaning fee will be charged to the guest folio.",
  },
  {
    id: "parties",
    category: "policies",
    question: "Does Sabal House allow parties or events in guestrooms?",
    answer:
      "No. Guestrooms are intended for registered hotel guests only. Parties, events, and disruptive gatherings are not permitted. The hotel reserves the right to evict disruptive guests.",
  },
  {
    id: "quiet-hours",
    category: "policies",
    question: "Are quiet hours observed at Sabal House?",
    answer:
      "Yes. To preserve the comfort of all guests and the character of our historic property, Sabal House observes quiet hours from 10:00 PM to 8:00 AM. During this time, guests are asked to keep noise to a minimum in guestrooms, hallways, balconies, porches, courtyards, and shared spaces. Parties, disruptive gatherings, and excessive noise are not permitted at any time.",
  },
];
