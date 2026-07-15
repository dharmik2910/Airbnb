import { url } from "inspector";

export interface Photo {
  id: string;
  url: string;
  alt: string;
  room?: string;
}

export const photos: Photo[] = [
  { id: 'p1', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80', alt: 'Outdoor jacuzzi terrace', room: 'Terrace' },
  { id: 'p2', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', alt: 'Lounge seating area', room: 'Living room' },
  { id: 'p3', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80', alt: 'Wooden jacuzzi tub', room: 'Jacuzzi' },
  { id: 'p4', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80', alt: 'Bedroom with curtains', room: 'Bedroom' },
  { id: 'p5', url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80', alt: 'Exterior of apartment building', room: 'Exterior' },
  { id: 'p6', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80', alt: 'Dining area', room: 'Dining room' },
  { id: 'p7', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', alt: 'Full kitchen', room: 'Kitchen' },
  { id: 'p8', url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80', alt: 'Full bathroom', room: 'Bathroom' },
  { id: 'p9', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80', alt: 'Gym', room: 'Gym' },
  { id: 'p10', url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80', alt: 'Pool', room: 'Pool' },
];

export const photoRooms = [
  {
    id: 'living-room-1',
    label: 'Living room 1',
    tags: ['Sofa', 'Air conditioning', 'Ceiling fan', 'TV'],
    cover: photos[1].url,
    images: [photos[1].url],
  },
  {
    id: 'living-room-2',
    label: 'Living room 2',
    tags: ['Outdoor jacuzzi', 'Lounge seating', 'Ceiling fan'],
    cover: photos[0].url,
    images: [photos[0].url, photos[2].url],
  },
  {
    id: 'full-kitchen',
    label: 'Full kitchen',
    tags: ['Refrigerator', 'Stove', 'Cookware', 'Dishwasher'],
    cover: photos[6].url,
    images: [photos[6].url],
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    tags: ['1 queen bed', 'Air conditioning', 'Wardrobe'],
    cover: photos[3].url,
    images: [photos[3].url],
  },
  {
    id: 'full-bathroom',
    label: 'Full bathroom',
    tags: ['Shower', 'Hot water', 'Toiletries'],
    cover: photos[7].url,
    images: [photos[7].url],
  },
  {
    id: 'gym',
    label: 'Gym',
    tags: ['Free weights', 'Treadmill', 'Open 24 hours'],
    cover: photos[8].url,
    images: [photos[8].url],
  },
  {
    id: 'exterior',
    label: 'Exterior',
    tags: ['Building entrance', 'Elevator', 'Security'],
    cover: photos[4].url,
    images: [photos[4].url],
  },
  {
    id: 'pool',
    label: 'Pool',
    tags: ['Shared pool', 'Loungers', 'Poolside seating'],
    cover: photos[9].url,
    images: [photos[9].url],
  },
  {
    id: 'additional-photos',
    label: 'Additional photos',
    tags: ['Dining area'],
    cover: photos[5].url,
    images: [photos[5].url],
  },
];

export interface Amenity {
  icon: string;
  label: string;
}

export interface AmenityCategory {
  category: string;
  items: Amenity[];
}

export const amenityCategories: AmenityCategory[] = [
  {
    category: 'Bathroom',
    items: [
      { label: 'Hair dryer', icon: 'hairdryer' },
      { label: 'Shampoo', icon: 'shampoo' },
      { label: 'Hot water', icon: 'hotwater' },
    ],
  },
  {
    category: 'Bedroom and laundry',
    items: [
      { label: 'Washer', icon: 'washer' },
      { label: 'Essentials', icon: 'essentials' },
      { label: 'Hangers', icon: 'hangers' },
      { label: 'Iron', icon: 'iron' },
    ],
  },
  {
    category: 'Entertainment',
    items: [
      { label: 'TV', icon: 'tv' },
      { label: 'Books and reading material', icon: 'books' },
    ],
  },
  {
    category: 'Heating and cooling',
    items: [
      { label: 'Air conditioning', icon: 'ac' },
      { label: 'Heating', icon: 'heating' },
    ],
  },
  {
    category: 'Home safety',
    items: [
      { label: 'Smoke alarm', icon: 'smokealarm' },
      { label: 'Fire extinguisher', icon: 'fireext' },
      { label: 'First aid kit', icon: 'firstaid' },
    ],
  },
  {
    category: 'Internet and office',
    items: [
      { label: 'Wifi', icon: 'wifi' },
      { label: 'Dedicated workspace', icon: 'workspace' },
    ],
  },
  {
    category: 'Kitchen and dining',
    items: [
      { label: 'Kitchen', icon: 'kitchen' },
      { label: 'Refrigerator', icon: 'fridge' },
      { label: 'Microwave', icon: 'microwave' },
      { label: 'Cooking basics', icon: 'cookingbasics' },
      { label: 'Dishes and silverware', icon: 'dishes' },
      { label: 'Coffee maker', icon: 'coffeemaker' },
    ],
  },
  {
    category: 'Location features',
    items: [{ label: 'Private entrance', icon: 'privateentrance' }],
  },
  {
    category: 'Outdoor',
    items: [
      { label: 'Patio or balcony', icon: 'patio' },
      { label: 'Outdoor dining area', icon: 'outdoordining' },
      { label: 'Garden view', icon: 'gardenview' },
    ],
  },
  {
    category: 'Parking and facilities',
    items: [
      { label: 'Free parking on premises', icon: 'parking' },
      { label: 'Pool', icon: 'pool' },
      { label: 'Hot tub', icon: 'hottub' },
      { label: 'Gym', icon: 'gym' },
      { label: 'Elevator', icon: 'elevator' },
    ],
  },
  {
    category: 'Services',
    items: [
      { label: 'Pets allowed', icon: 'pets' },
      { label: 'Cleaning available during stay', icon: 'cleaning' },
      { label: 'Long-term stays allowed', icon: 'longterm' },
      { label: 'Self check-in', icon: 'selfcheckin' },
    ],
  },
];

// Flat list used for the small preview grid on the listing page
export const amenities: Amenity[] = amenityCategories.flatMap((c) => c.items);

export const reviews = [
  {
    id: 'r1',
    name: 'Amit',
    date: '2 months on Airbnb',
    postedAgo: '1 week ago',
    rating: 5,
    text: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.',
  },
  {
    id: 'r2',
    name: 'Aheesh',
    date: '3 years on Airbnb',
    postedAgo: '2 weeks ago',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80',
    text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
  },
  {
    id: 'r3',
    name: 'Priya',
    date: '1 year on Airbnb',
    postedAgo: '3 weeks ago',
    rating: 5,
    text: 'Gorgeous 1BHK, the outdoor jacuzzi at night was magical. Would absolutely book again on our next Goa trip.',
  },
  {
    id: 'r4',
    name: 'Rohan',
    date: '6 months on Airbnb',
    postedAgo: '1 month ago',
    rating: 4,
    text: 'Great value and very cozy. A couple of small maintenance things but nothing that affected the stay overall.',
  },
];

export const guestFavourite = {
  overallDistribution: [
    { stars: 5, pct: 96 },
    { stars: 4, pct: 4 },
    { stars: 3, pct: 0 },
    { stars: 2, pct: 0 },
    { stars: 1, pct: 0 },
  ],
  categories: [
    { label: 'Cleanliness', score: 5.0, icon: 'sparkle' },
    { label: 'Accuracy', score: 5.0, icon: 'check' },
    { label: 'Check-in', score: 5.0, icon: 'search' },
    { label: 'Communication', score: 5.0, icon: 'bubble' },
    { label: 'Location', score: 4.8, icon: 'map' },
    { label: 'Value', score: 4.8, icon: 'tag' },
  ],
  tags: [
    { label: 'Comfort', count: 6, emoji: '🛏️', color: 'bg-rose-100' },
    { label: 'Accuracy', count: 5, emoji: '✅', color: 'bg-green-100' },
    { label: 'Hot tub', count: 5, emoji: '🛁', color: 'bg-pink-100' },
    { label: 'Condition', count: 4, emoji: '💅', color: 'bg-rose-50' },
    { label: 'Hospitality', count: 8, emoji: '🎁', color: 'bg-purple-100' },
    { label: 'Cleanliness', count: 4, emoji: '🧴', color: 'bg-sky-100' },
    { label: 'Amenities', count: 2, emoji: '🖼️', color: 'bg-orange-100' },
  ],
};

export const listing = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  propertyType: 'Entire serviced apartment',
  location: 'Candolim, India',
  rating: 4.95,
  reviewCount: 19,
  isSuperhost: false,
  isGuestFavourite: true,
  guests: 3,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  host: {
    name: 'Mirashya Homes',
    joined: '2 years hosting',
    avatar: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&q=80',
    isLogo: true,
  },
  currency: '₹',
  pricePerNight: 5700,
  totalForStay: 28499,
  nightsForTotal: 5,
  defaultCheckIn: '10/18/2026',
  defaultCheckOut: '10/23/2026',
  freeCancellationDate: '17 October',
  description:
    "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK apartment with a private outdoor jacuzzi, just minutes from Candolim beach. Unwind in the wooden hot tub under the stars, enjoy the shared pool and gym downstairs, and explore North Goa's best beaches, shacks and nightlife — all within easy reach.",
  highlights: [
    { title: 'Outdoor entertainment', desc: 'The pool and alfresco dining are great for summer trips.', icon: 'hottub' },
    { title: 'Designed for staying cool', desc: 'Beat the heat with the A/C and ceiling fan.', icon: 'fan' },
    { title: 'Self check-in', desc: 'You can check in with the building staff.', icon: 'door' },
  ],
};

export const hostStats = {
  reviewCount: 1463,
  rating: 4.68,
  yearsHosting: 2,
  responseRate: 100,
  responseTime: 'within an hour',
  isVerified: true,
  bornDecade: 'Born in the 80s',
  school: 'NICMAR GOA',
};

export const coHosts = [
  { id: 'c1', name: 'Sharath', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { id: 'c2', name: 'Aman Dev Pahwa', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80' },
  { id: 'c3', name: 'Maria Karen Priyanka', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80' },
  { id: 'c4', name: 'Simran', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80' },
  { id: 'c5', name: 'Pallavi', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { id: 'c6', name: 'Sanyukta', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80' },
  { id: 'c7', name: 'Shruti', avatar: null },
  { id: 'c8', name: 'Amisha', avatar: null },
];

export const sleepingArrangements = [
  { room: 'Bedroom 1', beds: '1 king bed' },
  { room: 'Bedroom 2', beds: '1 queen bed' },
  { room: 'Bedroom 3', beds: '2 single beds' },
  { room: 'Bedroom 4', beds: '1 queen bed, 1 sofa bed' },
];

export const houseRules = [
  'Check-in after 2:00 pm',
  'Checkout before 11:00 am',
  '3 guests maximum',
];

export const safetyAndProperty = [
  'Carbon monoxide alarm not reported',
  'Smoke alarm not reported',
  'Exterior security cameras on property',
];

export const cancellationPolicy = {
  summary: 'Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.',
};

export const nearbyListings = [
  {
    id: 'n1',
    title: 'Beautiful Studio with a view to die for',
    location: 'Goa, India',
    price: 23600,
    rating: 4.91,
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  },
  {
    id: 'n2',
    title: 'NAQAB - 1BHK with private pool',
    location: 'Goa, India',
    price: 42218,
    rating: 4.95,
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  },
  {
    id: 'n3',
    title: 'Greentique Luxury Flat with plunge pool',
    location: 'Calangute, Goa',
    price: 44506,
    rating: 4.94,
    url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  },
  {
    id: 'n4',
    title: 'The Tropical Studio | 5 mins to Beach',
    location: 'Goa, India',
    price: 22824,
    rating: 4.96,
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  },
  {
    id: 'n5',
    title: 'Luxury Casa Bella 1BHK with plunge pool',
    location: 'Calangute, Goa',
    price: 39942,
    rating: 4.95,
    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  },
  {
    id: 'n6',
    title: 'Greentique Luxury Flat with plunge pool',
    location: 'Calangute, Goa',
    price: 44506,
    rating: 4.94,
    url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  },
  {
    id: 'n7',
    title: 'The Tropical Studio | 5 mins to Beach',
    location: 'Goa, India',
    price: 22824,
    rating: 4.96,
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  },
  {
    id: 'n8',
    title: 'Luxury Casa Bella 1BHK with plunge pool',
    location: 'Calangute, Goa',
    price: 39942,
    rating: 4.95,
    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  },
];