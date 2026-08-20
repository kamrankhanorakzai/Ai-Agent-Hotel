import peshawarImg from "@/assets/hotel-peshawar.jpg";
import lahoreImg from "@/assets/hotel-lahore.jpg";
import islamabadImg from "@/assets/hotel-islamabad.jpg";

export type Room = {
  tier: string;
  name: string;
  desc: string;
  price: number;
  sleeps: number;
};

export type Hotel = {
  id: string;
  city: string;
  name: string;
  tag: string;
  desc: string;
  address: string;
  phone: string;
  rating: number;
  from: number;
  available: boolean;
  image: string;
  rooms: Room[];
};

export const HOTELS: Hotel[] = [
  {
    id: "peshawar",
    city: "Peshawar",
    name: "Grand Pearl Hotel",
    tag: "Flagship · 15 rooms",
    desc: "The original house — hand-carved screens, green marble floors and four quiet storeys in the heart of the old city.",
    address: "12 Mall Road, Peshawar",
    phone: "+92-91-1234567",
    rating: 4.6,
    from: 50,
    available: true,
    image: peshawarImg,
    rooms: [
      { tier: "I", name: "Single", desc: "Cozy room with one single bed, ideal for solo travelers.", price: 50, sleeps: 1 },
      { tier: "II", name: "Double", desc: "Comfortable room with one double bed.", price: 75, sleeps: 2 },
      { tier: "III", name: "Twin", desc: "Two single beds, good for friends or colleagues.", price: 75, sleeps: 2 },
      { tier: "IV", name: "Deluxe", desc: "Spacious room with premium furnishings and a city view.", price: 120, sleeps: 3 },
      { tier: "V", name: "Suite", desc: "Luxury suite with a separate living area.", price: 200, sleeps: 4 },
      { tier: "VI", name: "Family Room", desc: "Large room suited for families with kids.", price: 150, sleeps: 5 },
    ],
  },
  {
    id: "lahore",
    city: "Lahore",
    name: "Pearl Residency",
    tag: "Business district · 22 rooms",
    desc: "Minutes from the airport and the business district, with generous work-friendly rooms and a members' lounge.",
    address: "45 Liberty Road, Lahore",
    phone: "+92-42-1234567",
    rating: 4.5,
    from: 60,
    available: true,
    image: lahoreImg,
    rooms: [
      { tier: "I", name: "Single", desc: "Compact room with a work desk, built for short business trips.", price: 60, sleeps: 1 },
      { tier: "II", name: "Double", desc: "Double bed room with a sitting nook.", price: 85, sleeps: 2 },
      { tier: "III", name: "Twin", desc: "Two single beds with a shared workspace.", price: 85, sleeps: 2 },
      { tier: "IV", name: "Executive", desc: "Business-tier room with lounge access included.", price: 140, sleeps: 3 },
      { tier: "V", name: "Suite", desc: "Corner suite with a private meeting nook.", price: 220, sleeps: 4 },
      { tier: "VI", name: "Family Room", desc: "Connecting layout option, popular with relatives traveling together.", price: 165, sleeps: 5 },
    ],
  },
  {
    id: "islamabad",
    city: "Islamabad",
    name: "Pearl Heights",
    tag: "Margalla views · 18 rooms",
    desc: "The newest house, set against the Margalla Hills with the collection's finest views from every upper floor.",
    address: "F-7 Markaz, Islamabad",
    phone: "+92-51-1234567",
    rating: 4.7,
    from: 70,
    available: false,
    image: islamabadImg,
    rooms: [
      { tier: "I", name: "Single", desc: "Hillside-facing single, smallest footprint in the collection.", price: 70, sleeps: 1 },
      { tier: "II", name: "Double", desc: "Double bed room with a private balcony.", price: 95, sleeps: 2 },
      { tier: "III", name: "Twin", desc: "Two single beds, both with hill views.", price: 95, sleeps: 2 },
      { tier: "IV", name: "Deluxe", desc: "Top-floor deluxe with full Margalla Hills view.", price: 150, sleeps: 3 },
      { tier: "V", name: "Suite", desc: "Our largest suite, with a wraparound balcony.", price: 260, sleeps: 4 },
      { tier: "VI", name: "Family Room", desc: "Family-sized room with two view-facing windows.", price: 180, sleeps: 5 },
    ],
  },
];

export const AMENITIES = [
  "Free WiFi",
  "Air Conditioning",
  "Mini Bar",
  "Flat-screen TV",
  "Private Balcony",
  "24h Room Service",
  "Coffee Maker",
  "In-room Safe",
  "Deep Soaking Bath",
  "City & Hill Views",
];

export const SERVICES = [
  { name: "Airport Pickup", desc: "One-way private airport transfer", price: "$25.00" },
  { name: "Spa & Hammam", desc: "Full-day spa, sauna and hammam access", price: "$40.00" },
  { name: "Laundry & Pressing", desc: "Same-day laundry and pressing", price: "$15.00" },
  { name: "Breakfast Buffet", desc: "Daily breakfast buffet, per person", price: "$12.00" },
];

export const REVIEWS = [
  {
    stars: 5,
    quote: "Excellent service and immaculate rooms. We will absolutely come back.",
    who: "Ahmed R.",
    where: "Grand Pearl, Peshawar",
  },
  {
    stars: 4,
    quote: "Great stay overall — the lounge is a genuinely quiet place to work.",
    who: "Sana M.",
    where: "Pearl Residency, Lahore",
  },
  {
    stars: 5,
    quote: "The suite was extraordinary, and the hill view at sunrise made the trip.",
    who: "John S.",
    where: "Pearl Heights, Islamabad",
  },
];
