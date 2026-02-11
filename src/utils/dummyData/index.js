import {appIcons, appImages} from '../../assets';
import {Dimensions} from 'react-native';
import {vw} from '..';

const {width, height} = Dimensions.get('screen');
export const LogData = [
  {
    name: 'Grocery Carter',
    price: '164.00',
    status: 'Pending',
    pickupTime: '09:00 AM',
    deliveryTime: '09:00 AM',
    deliveryLocation: '105 William St, Chicago, US',
    pickupLocation: '7958 Swift Village',
    orderId: 'ORDER ID: IF-002',
    icon: appIcons?.packageIcon1,
    flagText: 'Pending',
  },
  {
    name: 'Grocery Carter',
    price: '164.00',
    status: 'Cancelled',
    pickupTime: '09:00 AM',
    deliveryTime: '09:00 AM',
    deliveryLocation: '105 William St, Chicago, US',
    pickupLocation: '7958 Swift Village',
    orderId: 'ORDER ID: IF-002',
    icon: appIcons?.packageIcon2,
    flagText: 'Cancelled',
  },
  {
    name: 'Grocery Carter',
    price: '164.00',
    status: 'Pending',
    pickupTime: '09:00 AM',
    deliveryTime: '09:00 AM',
    deliveryLocation: '105 William St, Chicago, US',
    pickupLocation: '7958 Swift Village',
    orderId: 'ORDER ID: IF-002',
    icon: appIcons?.packageIcon3,
    flagText: 'Pending',
  },
  {
    name: 'Grocery Carter',
    price: '164.00',
    status: 'Delivered',
    pickupTime: '09:00 AM',
    deliveryTime: '09:00 AM',
    deliveryLocation: '105 William St, Chicago, US',
    pickupLocation: '7958 Swift Village',
    orderId: 'ORDER ID: IF-002',
    icon: appIcons?.packageIcon2,
    flagText: 'Delivered',
  },
  {
    name: 'Grocery Carter',
    price: '164.00',
    status: 'Cancelled',
    pickupTime: '09:00 AM',
    deliveryTime: '09:00 AM',
    deliveryLocation: '105 William St, Chicago, US',
    pickupLocation: '7958 Swift Village',
    orderId: 'ORDER ID: IF-002',
    icon: appIcons?.packageIcon2,
    flagText: 'Cancelled',
  },
];

export const preferenceData = {
  vibe: [
    'Trendsetter',
    'Health-focused',
    'Foodie',
    'Local supporter',
    'Adventurer',
    'Night owl',
  ],
  freeTime: [
    'Restaurants',
    'Cooking',
    'Outdoor',
    'Fitness',
    'Art & Culture',
    'Nightlife',
    'Local Shopping',
    'Festivals',
    'Gaming',
    'Coffee',
  ],
  food: [
    'Fast Food',
    'Pizza',
    'Asian Cuisine',
    'Healthy Food',
    'Mexican',
    'BBQ',
    'Brunch',
    'Desserts',
    'Coffee & Tea',
    'Juices & Smoothies',
  ],
  diet: [
    'No Restrictions',
    'Vegetarian',
    'Vegan',
    'Gluten-free',
    'Dairy-free',
    'Keto',
    'Pescatarian',
    'Low Carb',
    'Halal',
    'Kosher',
    'Paleo',
    'Nut-free',
    'Sugar-free',
    'Organic Only',
  ],
  drinks: [
    'Coffee',
    'Tea',
    'Bubble Tea',
    'Milkshakes',
    'Fresh Juices',
    'Smoothies',
    'Protein Shakes',
    'Cocktails',
    'Mocktails',
    'Beer',
    'Wine',
    'Whiskey',
    'Soda',
    'Energy Drinks',
    'Kombucha',
    'Iced Tea',
    'Coconut Water',
    'Sparkling Water',
  ],
  interests: [
    'Local Businesses',
    'Fitness Classes',
    'DIY',
    'Photography',
    'Gardening',
    'Travel',
    'Sneakerhead',
    'Tech Gadgets',
    'Volunteering',
  ],
};
export const couponData = [
  {
    id: 0,
    coupon_title: 'SMART GEAR',
    coupon_promo: '10% off - Smart Fitness...',
    coupon_desc: 'Get 10% off on all smart fitness tracker watches',
    coupon_image: appImages?.watch_image,
    validity: 'Offer valid till JULY 25, 2024',
    full_desc:
      "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:",
  },
  {
    id: 1,
    coupon_title: 'FOOD BUDDY',
    coupon_promo: '15% off - on all products..',
    coupon_desc:
      'Buy this coupon for a 15% discount on all restaurant products....',
    coupon_image: appImages?.burger_image,
    full_desc:
      "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:",
  },
  {
    id: 2,
    coupon_title: 'TECH GEAR',
    coupon_promo: '20% off - wireless Bluetooth',
    coupon_desc:
      'Experience crystal clear audio with our wireless bluetooth headphones.',
    coupon_image: appImages?.headphones_image,
    validity: 'Offer valid till JULY 25, 2024',
    full_desc:
      "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:",
  },
  {
    id: 3,
    coupon_title: 'FOOD BUDDY',
    coupon_promo: '15% off - on all products..',
    coupon_desc:
      'Buy this coupon for a 15% discount on all restaurant products....',
    coupon_image: appImages?.burger_image,
    validity: 'Offer valid till JULY 25, 2024',
    full_desc:
      "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:",
  },
  {
    id: 4,
    coupon_title: 'TECH GEAR',
    coupon_promo: '20% off - wireless Bluetooth',
    coupon_desc:
      'Experience crystal clear audio with our wireless bluetooth headphones.',
    coupon_image: appImages?.headphones_image,
    validity: 'Offer valid till JULY 25, 2024',
    full_desc:
      "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:",
  },
];
export const couponData2 = [
  {
    id: 0,
    coupon_title: 'HUBBY FOOD DEALS',
    coupon_promo: '15% off - on all products..',
    coupon_desc: 'Get 10% off on all smart fitness tracker watches',
    coupon_image: appImages?.couponDeal1,
    validity: 'Offer valid till JULY 25, 2024',
    // full_desc: "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:"
  },
  {
    id: 1,
    coupon_title: 'FOOD BUDDY',
    coupon_promo: '15% off - on all products..',
    coupon_desc:
      'Buy this coupon for a 15% discount on all restaurant products....',
    coupon_image: appImages?.burger_image,
    // full_desc: "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:"
  },
  {
    id: 2,
    coupon_title: 'HUBBY FOOD DEALS',
    coupon_promo: '15% off - on all products..',
    coupon_desc:
      'Experience crystal clear audio with our wireless bluetooth headphones.',
    coupon_image: appImages?.couponDeal2,
    validity: 'Offer valid till JULY 25, 2024',
    // full_desc: "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:"
  },
];
export const couponBenefits = [
  {
    id: 1,
    termNum: '1-',
    termDetail: 'Wireless headphones, speakers, and earbuds',
  },
  {
    id: 2,
    termNum: '2-',
    termDetail: 'Smartwatches, fitness trackers, and health monitors',
  },
  {
    id: 3,
    termNum: '3-',
    termDetail: 'Remote monitoring devices, hearing aids',
  },
  {
    id: 4,
    termNum: '4-',
    termDetail: 'Eliminates the need for cables, providing ease',
  },
];
export const couponConditions = [
  {
    id: 1,
    termNum: '1-',
    termDetail: 'Limit one coupon per customer',
  },
  {
    id: 2,
    termNum: '2-',
    termDetail:
      "Coupon is non-transferable & can't be combined with any other offer",
  },
  {
    id: 3,
    termNum: '3-',
    termDetail: "Coupon has no cash value & can't be redeemed for cash",
  },
];
export const dealItems = [
  {
    id: 1,
    image: appImages?.restaurant,
    title: 'RESTAURANTS & DINING',
    details: 'RESTAURANTS DETAILS',
  },
  {
    id: 2,
    image: appImages?.coffee_image,
    title: 'COFFEE & DESERTS',
    details: 'COFFEE DETAILS',
  },
  {
    id: 3,
    image: appImages?.automobile,
    title: 'AUTOMOBILE',
    details: 'AUTOMOBILE DETAILS',
  },
  {
    id: 4,
    image: appImages?.cleaningService,
    title: 'CLEANING SERVICES',
    details: 'SERVICE DETAILS',
  },
  {
    id: 5,
    image: appImages?.shop_image,
    title: 'SHOP',
    details: 'SHOP DETAILS',
  },
];
export const TicketListingData = [
  {
    id: '1',
    name: 'Lucille R. Ferris',
    timing: '30 August,11:00 AM',
    email: 'example@gmail.com',
    image: appImages?.profile1,
  },
];
export const shopditVouchers = [
  {
    id: 1,
    image: appImages?.discount1,
    discount: '10% discount voucher',
    points: '1000 Points',
  },
  {
    id: 2,
    image: appImages?.discount2,
    discount: '25% discount voucher',
    points: '4500 Points',
  },
  {
    id: 3,
    image: appImages?.discount3,
    discount: '20% discount voucher',
    points: '4000 Points',
  },
  {
    id: 4,
    image: appImages?.discount4,
    discount: '15% discount voucher',
    points: '3200 Points',
  },
  {
    id: 5,
    image: appImages?.discount5,
    discount: '40% discount voucher',
    points: '8400 Points',
  },
  {
    id: 6,
    image: appImages?.discount6,
    discount: '50% discount voucher',
    points: '10800 Points',
  },
];
export const restaurants = [
  {
    id: 1,
    name: 'FLAVORFUL HOUSE',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant1,
    icon: appIcons?.restaurantLogo,
    deliveryTime: '25-40 min',
  },
  {
    id: 2,
    name: 'SAVORY SPICE SHACK',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant2,
  },
  {
    id: 3,
    name: 'FRESH HARVEST EATERY',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant3,
  },
  {
    id: 4,
    name: 'FLAVOR FUSION',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant4,
  },
  {
    id: 5,
    name: 'CULINARY BITES',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant5,
  },
  {
    id: 6,
    name: 'URBAN BITES',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant6,
  },
];

export const carMakes = [
  'General Motors (GM)',
  'Ford Motor Company',
  'Stellantis North America',
  'Tesla',
  'Rivian',
  'Lucid Motors',
  'Volkswagen Group',
  'BMW Group',
  'Mercedes-Benz Group AG',
  'Opel',
  'Toyota Motor Corporation',
  'Honda Motor Co.',
  'Nissan Motor Co.',
  'Mazda',
  'Subaru',
  'Mitsubishi Motors',
  'Suzuki',
  'Isuzu',
  'Hyundai Motor Company',
  'Kia Corporation',
  'Renault',
  'Peugeot',
  'Citroën',
  'DS Automobiles',
  'Fiat',
  'Alfa Romeo',
  'Lancia',
  'Ferrari',
  'Lamborghini',
  'Maserati',
  'Volvo Cars',
  'Polestar',
  'Saab',
  'Aston Martin',
  'Bentley',
  'Rolls-Royce',
  'Land Rover',
  'Jaguar Lotus',
  'Geely',
  'BYD (Build Your Dreams)',
  'Changan',
  'Great Wall Motors',
  'SAIC Motor',
  'NIO',
  'XPeng',
  'Li Auto',
  'Proton',
  'Perodua',
  'VinFast',
  'Koenigsegg',
  'Pagani',
  'Bugatti',
];
export const AdCategories = [
  {key: '1', value: "MEN'S FASHION"},
  {key: '2', value: 'MOBILE'},
  {key: '3', value: 'AUTOMOBILE'},
  {key: '4', value: 'FITNESS MACHINES'},
  {key: '5', value: 'HOME GARDEN'},
  {key: '6', value: 'GROCERY'},
  {key: '7', value: 'KIDS & TOYS'},
  {key: '8', value: 'COMPUTER & LAPTOPS'},
  {key: '9', value: "WOMEN'S FASHION"},
  {key: '10', value: 'BOOKS & HOBBIES'},
  {key: '11', value: 'BUSINESS EQUIPMENT'},
];

export const VehicleBodyTypes = [
  {key: '1', value: 'Sedan'},
  {key: '2', value: 'Hatchback'},
  {key: '3', value: 'Coupe'},
  {key: '4', value: 'Convertible'},
  {key: '5', value: 'SUV'},
  {key: '6', value: 'Crossover'},
  {key: '7', value: 'Pickup Truck'},
  {key: '8', value: 'Minivan'},
  {key: '9', value: 'Van'},
  {key: '10', value: 'Station Wagon'},
  {key: '11', value: 'Jeep'},
  {key: '12', value: 'Microcar'},
  {key: '13', value: 'Roadster'},
  {key: '14', value: 'Truck'},
];
export const marketplaceData = [
  {
    id: 1,
    name: "MEN'S FASHION",
    image: appImages?.marketplace1,
  },
  {
    id: 2,
    name: 'MOBILE',
    image: appImages?.marketplace2,
  },
  {
    id: 3,
    name: 'AUTOMOBILE',
    image: appImages?.marketplace3,
  },
  {
    id: 4,
    name: 'HOME GARDEN',
    image: appImages?.marketplace4,
  },
  {
    id: 5,
    name: 'GROCERY',
    image: appImages?.grocery,
  },
  {
    id: 6,
    name: 'FITNESS MACHINES',
    image: appImages?.marketplace5,
  },
  {
    id: 7,
    name: 'KIDS & TOYS',
    image: appImages?.marketplace6,
  },
  {
    id: 8,
    name: 'COMPUTER & LAPTOPS',
    image: appImages?.marketplace7,
  },
  {
    id: 9,
    name: "WOMEN'S FASHION",
    image: appImages?.marketplace8,
  },
  {
    id: 10,
    name: 'BOOKS & HOBBIES',
    image: appImages?.marketplace9,
  },
  {
    id: 11,
    name: 'BUISNESS EQUIPMENT',
    image: appImages?.marketplace10,
  },
];

export const dishes = [
  {
    id: 1,
    name: 'Lasagna',
    image: appImages?.dish1,
    price: '50.25',
    original: '68.25',
    type: 'Lasagna',
    extra: 'Extra Jalapenos, Extra Cheese',
  },
  {
    id: 2,
    name: 'Spaghetti Bolognese',
    image: appImages?.dish2,
    price: '48.95',
    original: '55.86',
    type: 'Pasta',
    extra: 'Extra Jalapenos, Extra Cheese',
  },
  {
    id: 3,
    name: 'Vitella Tonato',
    image: appImages?.dish3,
    price: '39.85',
    original: '45.10',
    type: 'Meat',
    extra: 'Extra Jalapenos, Extra Cheese',
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    image: appImages?.dish4,
    price: '68.20',
    type: 'Pizza',
    extra: 'Extra Jalapenos, Extra Cheese',
  },
  {
    id: 5,
    name: 'Vitella Tonato',
    image: appImages?.dish3,
    price: '39.85',
    original: '45.10',
    type: 'Meat',
    extra: 'Extra Jalapenos, Extra Cheese',
  },
  {
    id: 6,
    name: 'Pizza Margherita',
    image: appImages?.dish4,
    price: '68.20',
    type: 'Pizza',
    extra: 'Extra Jalapenos, Extra Cheese',
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    image: appImages?.dish4,
    price: '68.20',
    type: 'Pizza',
    extra: 'Extra Jalapenos, Extra Cheese',
  },
  {
    id: 5,
    name: 'Vitella Tonato',
    image: appImages?.dish3,
    price: '39.85',
    original: '45.10',
    type: 'Meat',
    extra: 'Extra Jalapenos, Extra Cheese',
  },
  {
    id: 6,
    name: 'Pizza Margherita',
    image: appImages?.dish4,
    price: '68.20',
    type: 'Pizza',
    extra: 'Extra Jalapenos, Extra Cheese',
  },
];
export const automobile = [
  {
    id: 1,
    name: 'CARS FOR SALE',
    image: appImages?.automobile1,
  },
  {
    id: 2,
    name: 'CAR SPARE PARTS',
    image: appImages?.automobile2,
  },
  {
    id: 3,
    name: 'CAR ACCESSORIES',
    image: appImages?.automobile3,
  },
  {
    id: 4,
    name: 'CAR RENTAL',
    image: appImages?.automobile4,
  },
];

export const toppings = [
  {id: 'topping1', label: 'Extra Cheese', checked: false, charges: '1.00'},
  {id: 'topping2', label: 'Extra Olives', checked: false, charges: '1.00'},
  {id: 'topping3', label: 'Extra Jalapenos', checked: false, charges: '1.00'},
  {id: 'topping4', label: 'Extra Mushrooms', checked: false, charges: '1.00'},
  {id: 'topping5', label: 'Extar Onions', checked: false, charges: '1.00'},
  {id: 'topping6', label: 'Extar Truffle Oil', checked: false, charges: '1.00'},
];

export const pizzaSizes = [
  {id: 'size1', label: 'Large Pizza', value: 'largePizza'},
  {id: 'size2', label: 'Medium Pizza', value: 'mediumPizza'},
  {id: 'size3', label: 'Small Pizza', value: 'smallPizza'},
];
export const dishSize = [
  {id: 1, label: 'Small', value: 'small'},
  {id: 2, label: 'Medium', value: 'medium'},
  {id: 3, label: 'Large', value: 'large'},
];

export const pizzaDough = [
  {id: 'dough1', label: 'Regular Dough', value: 'regular', charges: 'Free'},
  {id: 'dough2', label: 'Italian Dough', value: 'italian', charges: '5.00'},
];

export const FlippData = [
  {
    id: 1,
    title: 'Fresh Harvest Eaters',
    image: appImages?.flippBG1,
    icon: appIcons?.flippIcon1,
    deadline: 'Until Wednesday',
  },
  {
    id: 2,
    title: 'Flavorful house',
    image: appImages?.flippBG2,
    icon: appIcons?.flippIcon2,
    deadline: '04 Weeks Left',
  },
  {
    id: 1,
    title: 'Fresh Harvest Eaters',
    image: appImages?.flippBG3,
    icon: appIcons?.flippIcon1,
    deadline: 'Until Wednesday',
  },
  {
    id: 2,
    title: 'Flavorful house',
    image: appImages?.flippBG4,
    icon: appIcons?.flippIcon2,
    deadline: '04 Weeks Left',
  },
];

export const carData = [
  {
    id: 1,
    type: 'MERCEDES BENZ E CLASS',
    image: appImages?.car1,
    description:
      'The mercedes benz E class 2023 combines luxury & performance with a sleek design, cutting edge technology & premium amenties....',
    rate: '27,000',
    owner: 'James Anderson',
    location: 'Located in Los Angeles',
    number: '+1 (555) 987-6543',
    year: '2024',
    condition: 'EXCELENT',
    carColor: 'SILVER',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
  {
    id: 2,
    type: 'AUDI A4',
    image: appImages?.car2,
    description:
      'The Audi A4 2023 is a premium sedan known for its elegant design, refined interior, & advanced techno-logy. With a smooth driving experience...',
    rate: '47,000',
    owner: 'John Doe',
    location: 'Located in Chicago',
    number: '+1 (555) 987-6543',
    year: '2021',
    condition: 'GOOD',
    carColor: 'SILVER',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
  {
    id: 3,
    type: 'BMW X5',
    image: appImages?.car3,
    rate: '55,000',
    owner: 'James King',
    location: 'Located in Ohio',
    number: '+1 (555) 987-6543',
    year: '2024',
    condition: 'EXCELENT',
    carColor: 'SILVER',
    description:
      'The BMW X5 2022 is a luxury SUV that blends style, performance and comfort. With spacious interior, advanced technology & powerful...',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
  {
    id: 4,
    type: 'MERCEDES BENZ E CLASS',
    image: appImages?.car4,
    rate: '30,000',
    description:
      'The mercedes benz E class 2023 combines luxury & performance with a sleek design, cutting edge technology & premium amenties....',
    owner: 'Anderson Smith',
    location: 'Located in New York City',
    number: '+1 (555) 987-6543',
    year: '2023',
    condition: 'EXCELENT',
    carColor: 'SILVER',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
];
export const addData = [
  {
    id: 1,
    type: 'Mobile & Tablets',
    image: appImages?.mobileImage,
    description: 'Ads related to Mobile Phones, Tablets and other Accessories',
  },
  {
    id: 1,
    type: 'Cars',
    image: appImages?.car2,
    description: 'Ads related to Mobile Phones, Tablets and other Accessories',
  },
  {
    id: 1,
    type: 'Mens Fashion',
    image: appImages?.fashionImage,
    description: 'Ads related to Mobile Phones, Tablets and other Accessories',
  },
];

export const myAdData = [
  {
    id: 1,
    name: 'MERCEDES BENZ E CLASS',
    type: 'Cars',
    image: appImages?.car1,
    description:
      'The mercedes benz E class 2023 combines luxury & performance with a sleek design, cutting edge technology & premium amenties....',
    rate: '27,000',
    owner: 'James Anderson',
    location: 'Located in Los Angeles',
    number: '+1 (555) 987-6543',
    year: '2024',
    condition: 'EXCELENT',
    carColor: 'SILVER',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
  {
    id: 2,
    name: 'AUDI A4',
    type: 'Cars',
    image: appImages?.car2,
    description:
      'The Audi A4 2023 is a premium sedan known for its elegant design, refined interior, & advanced techno-logy. With a smooth driving experience...',
    rate: '47,000',
    owner: 'John Doe',
    location: 'Located in Chicago',
    number: '+1 (555) 987-6543',
    year: '2021',
    condition: 'GOOD',
    carColor: 'SILVER',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
  {
    id: 3,
    name: 'BMW X5',
    type: 'Cars',
    image: appImages?.car3,
    rate: '55,000',
    owner: 'James King',
    location: 'Located in Ohio',
    number: '+1 (555) 987-6543',
    year: '2024',
    condition: 'EXCELENT',
    carColor: 'SILVER',
    description:
      'The BMW X5 2022 is a luxury SUV that blends style, performance and comfort. With spacious interior, advanced technology & powerful...',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
  {
    id: 4,
    name: 'ZX 145 Mobile Phone',
    type: 'Mobile & Tablets',
    image: appImages?.mobileImage,
    description:
      'Goose Neck Flexible Phone Holder, Universal Lazy Mobile Phone Stand',
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24 / S24 Ultra',
    type: 'Mobile & Tablets',
    image: appImages?.mobileImage2,
    description:
      'The Samsung Galaxy A54 is available in 8GB RAM and 258GB storage.',
  },
  {
    id: 5,
    name: 'The Z FLIP Galaxy Phones',
    type: 'Mobile & Tablets',
    image: appImages?.mobileImage3,
    description:
      'Goose Neck Flexible Phone Holder, Universal Lazy Mobile Phone Stand',
  },
  {
    id: 6,
    name: 'ZX 145 Mobile Phone',
    type: 'Mens Fashion',
    image: appImages?.mobileImage,
    description:
      'Goose Neck Flexible Phone Holder, Universal Lazy Mobile Phone Stand',
  },
  {
    id: 7,
    name: 'Samsung Galaxy S24 / S24 Ultra',
    type: 'Mens Fashion',
    image: appImages?.mobileImage2,
    description:
      'The Samsung Galaxy A54 is available in 8GB RAM and 258GB storage.',
  },
  {
    id: 8,
    name: 'The Z FLIP Galaxy Phones',
    type: 'Mens Fashion',
    image: appImages?.mobileImage3,
    description:
      'Goose Neck Flexible Phone Holder, Universal Lazy Mobile Phone Stand',
  },
];

export const restaurantTiming = [
  {
    id: 1,
    timing: 'Monday - Sunday 11:00 AM till 20:00 PM',
    address: 'Flavourful House 123 Main Street, Anytown, USA',
    about:
      "'Flavorful Fare House' is a culinary haven, blending global flavors into innovative dishes. With a warm ambiance and top notch service, we create memorable dining experiences for every occassion. Come savor the artistry of food and hospitality with us!",
  },
];
export const reviewDetails = [
  {
    id: 1,
    image: appImages?.reviewImage,
    name: 'Harley Banner',
    review:
      "We stopped in during a recent visit and loved this place. It's small. It's unique. The staff was great the portions huge.",
    icon: appIcons?.yelp,
    iconWidth: width * 0.14,
    iconHeight: width * 0.1,
    type: 'yelp',
    backgroundColor: '#D32323',
    gap: vw * 3,
    color: 'white',
    reviewDate: 'December 31, 2024 via Yelp',
  },
  {
    id: 2,
    image: appImages?.reviewImage,
    name: 'James Anderson',
    review:
      'This place serves the best coffee in London. Their mocha is great. They have large select of pastries if you make it before noon.',
    icon: appIcons?.trustpilot,
    iconWidth: width * 0.19,
    iconHeight: width * 0.1,
    type: 'trustpilot',
    backgroundColor: '#00B67A',
    gap: vw * 3,
    color: 'white',
    reviewDate: 'April 12, 2024 via Trustpilot',
  },
  {
    id: 3,
    image: appImages?.reviewImage,
    name: 'Luis Maxwell',
    review:
      'Super fun atmosphere and great food! We found this cafe after doing a search for lunch near Balboa Park.',
    icon: appIcons?.gmaps,
    iconWidth: width * 0.08,
    iconHeight: width * 0.07,
    type: 'maps',
    backgroundColor: '#ffffff',
    gap: vw * 2,
    color: '#FFD700',
    reviewDate: 'August 20, 2024 via Google',
  },
];

export const GroceryType = [
  {
    id: 1,
    name: 'DEALS',
  },
  {
    id: 2,
    name: 'FRESH EXPRESS MART',
  },
  {
    id: 3,
    name: 'GROCERY SPOT',
  },
];
export const type = [
  {
    id: 1,
    name: 'AMERICAN',
  },
  {
    id: 2,
    name: 'MEDITERRANEAN',
  },
  {
    id: 3,
    name: 'MEXICAN',
  },
  {
    id: 4,
    name: 'ASIAN',
  },
];
export const jobType = [
  {
    id: 1,
    name: 'PROFESSIONAL SERVICES',
  },
  {
    id: 2,
    name: 'SHOP',
  },
  {
    id: 3,
    name: 'RESTAURANTS & DINING',
  },
  {
    id: 4,
    name: 'CLEANING SERVICES',
  },
];
export const restaurantGallery = [
  {
    id: 1,
    image: appImages?.restaurant1,
  },
  {
    id: 2,
    image: appImages?.gallery2,
  },
  {
    id: 3,
    image: appImages?.gallery3,
  },
  {
    id: 4,
    image: appImages?.gallery4,
  },
  {
    id: 5,
    image: appImages?.gallery5,
  },
  {
    id: 6,
    image: appImages?.gallery6,
  },
];
export const carGallery = [
  {
    id: 1,
    image: appImages?.carGallery1,
  },
  {
    id: 2,
    image: appImages?.carGallery2,
  },
  {
    id: 3,
    image: appImages?.carGallery3,
  },
  {
    id: 4,
    image: appImages?.carGallery4,
  },
  {
    id: 5,
    image: appImages?.carGallery5,
  },
  {
    id: 6,
    image: appImages?.carGallery6,
  },
];
export const paymentMethodData = [
  {
    id: 1,
    type: 'Mastercard',
    cardNumber: '************* 5120',
    icon: appIcons?.mastercard,
  },
  {
    id: 2,
    type: 'Visa',
    cardNumber: '************* 4021',
    icon: appIcons?.visa,
  },
  {
    id: 3,
    type: 'Google Pay',
    icon: appIcons?.gpay,
  },
  {
    id: 4,
    type: 'PayPal',
    icon: appIcons?.paypal,
  },
];

export const eventData = [
  {
    id: 1,
    day: '12',
    month: 'NOV',
    image: appImages?.event1,
    title: 'TECH STARTUP BOOTCAMP',
    company: 'Innovate Now Inc',
    rate: '50.00',
    dateTime: 'August 14, 2024',
    timing: '11:00 PM',
    address: 'Flavourful House 123 Main Street, Anytown, USA',
    bgImage: appImages?.eventDetails,
    participants: 'Quantity: 03',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 2,
    day: '04',
    month: 'JAN',
    image: appImages?.event2,
    title: 'MUSIC FESTIVAL 2024',
    company: 'Harmonic Events',
    rate: '299.00',
    dateTime: 'August 14, 2024',
    timing: '11:00 PM',
    address: 'Flavourful House 123 Main Street, Anytown, USA',
    bgImage: appImages?.eventDetails,
    participants: 'Quantity: 03',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 3,
    day: '12',
    month: 'NOV',
    image: appImages?.event3,
    title: 'WELLNESS EXPO',
    company: 'Harmony Productions',
    rate: '99.00',
    dateTime: 'August 14, 2024',
    timing: '11:00 PM',
    address: 'Flavourful House 123 Main Street, Anytown, USA',
    bgImage: appImages?.eventDetails,
    participants: 'Quantity: 03',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];
export const JobData = [
  {
    id: 1,
    image: appIcons?.job1,
    title: 'WEB DEVELOPER (ON-SITE)',
    company: 'Hatypo Studio',
    jobLevel: 'Expert',
    jobLocation: 'NEW YORK CITY',
    jobTime: 'APPLE INC',
    salary: '$4.5K/Monthly',
    position: 'EXPERT DEVELOPER',
    description:
      "Seeking a skilled software developer to join tech innovations Inc's dynamic team response include coding, testing and debugging software application",
  },
  {
    id: 2,
    image: appIcons?.job2,
    title: 'SENIOR UX DESIGNER',
    company: 'Eluxa Space',
    jobLevel: 'Expert',
    jobLocation: 'NEW YORK CITY',
    jobTime: 'FULL TIME',
    salary: '$4.5K/Monthly',
    position: 'EXPERT DEVELOPER',
    description:
      "Seeking a skilled software developer to join tech innovations Inc's dynamic team response include coding, testing and debugging software application",
  },
  {
    id: 3,
    image: appIcons?.job3,
    title: 'WEB DEVELOPER (ON-SITE)',
    company: 'Hatypo Studio',
    jobLevel: 'Expert',
    jobLocation: 'NEW YORK CITY',
    jobTime: 'APPLE INC',
    salary: '$4.5K/Monthly',
    position: 'EXPERT DEVELOPER',
    description:
      "Seeking a skilled software developer to join tech innovations Inc's dynamic team response include coding, testing and debugging software application",
  },
];

export const AllCouponData = [
  {
    id: 1,
    title: 'FOOD BUDDY',
    type: '20% OFF ON ALL PRODUCTS',
    description:
      'Buy this coupon for a 20% discount on all restaurant products, saving you $20.00. Enjoy our full menu, dine-in or takeout. Limited time offer!',
    expiry: '30 August, 2024',
    image: appImages?.couponImage1,
  },
  {
    id: 2,
    title: 'FOOD BUDDY',
    type: '15% OFF ON ALL PRODUCTS',
    description:
      'Buy this coupon for a 20% discount on all restaurant products, saving you $20.00. Enjoy our full menu, dine-in or takeout. Limited time offer!',
    expiry: '30 July, 2024',
    image: appImages?.couponImage2,
  },
  {
    id: 3,
    title: 'FOOD BUDDY',
    type: '25% OFF ON ALL PRODUCTS',
    description:
      'Buy this coupon for a 20% discount on all restaurant products, saving you $20.00. Enjoy our full menu, dine-in or takeout. Limited time offer!',
    expiry: '15 September, 2024',
    image: appImages?.couponImage3,
  },
];
export const notificationData = [
  {
    id: 1,
    notification:
      'New coupon you redeemed has been stored in your profile section',
    time: 'Just Now',
  },
];
export const notificationYesterdayData = [
  {
    id: 1,
    notification:
      'New coupon you redeemed has been stored in your profile section',
    time: '20 hours Ago',
  },
  {
    id: 2,
    notification: 'New coupons has arrived, take a look before it goes',
    time: '1 day ago',
  },
  {
    id: 3,
    notification:
      'New coupon you redeemed has been stored in your profile section',
    time: '2 day ago',
  },
];
export const termsData = [
  {
    id: 1,
    termNum: '1- ACCEPTANCE OF TERMS',
    termDetail:
      'By downloading, accessing, or using Shopdit, you agree to be bound by these Terms and Conditions. If you do not agree, do not use the app.',
  },
  {
    id: 2,
    termNum: '2- USER ELIGIBILITY',
    termDetail:
      'You must be at least 13 years old to use Shopdit. Certain features, such as creating marketplace listings, may require additional age verification according to local laws.',
  },
  {
    id: 3,
    termNum: '3- ACCOUNTS',
    termDetail:
      'You are responsible for maintaining the confidentiality of your account information and for all activities conducted through your account. You must provide accurate information when registering.',
  },
  {
    id: 4,
    termNum: '4- LOCATION',
    termDetail:
      'Shopdit may request access to your device’s location to provide location-based deals, coupons, events, and recommendations. You can choose to set a default location manually.',
  },
  {
    id: 5,
    termNum: '5- COUPONS AND DEALS',
    termDetail:
      'Coupons, deals, and offers are created by registered businesses. Redemption may require generating a QR code and presenting it at the business location. Shopdit is not responsible for any failure by businesses to honor coupons or deals.',
  },
  {
    id: 6,
    termNum: '6- PAYMENTS AND POINTS',
    termDetail:
      'Payments may be made with real money, Business Points, or Shopdit Points. Business Points and Shopdit Points are loyalty rewards only. They have no cash value, cannot be purchased, transferred, or exchanged for money. Points can be earned through purchases on the platform as described in the app. All payments and redemptions relate to physical goods or services.',
  },
  {
    id: 7,
    termNum: '7- EVENTS AND TICKETS',
    termDetail:
      'Event tickets purchased through Shopdit are for real-world events. You must show your booking in-person to attend. Shopdit is not responsible for event cancellations or changes; please check with the event organizer.',
  },
  {
    id: 8,
    termNum: '8- JOBS',
    termDetail:
      'Job listings are posted by businesses. You may submit your resume and apply directly through the app. Shopdit is not responsible for the recruitment process, hiring decisions, or employment agreements.',
  },
  {
    id: 9,
    termNum: '9- BUSINESS REWARDS AND CAMPAIGNS',
    termDetail:
      'Businesses may create special rewards and campaigns for their customers. Redemption may require QR codes or in-person verification. Shopdit is not responsible for any rewards or campaign fulfillment beyond facilitating access.',
  },
  {
    id: 10,
    termNum: '10- PEER-TO-PEER MARKETPLACE',
    termDetail:
      'Users can list items they no longer need and create ads. Other users may view these listings and contact the poster directly. Shopdit does not facilitate payments, deliveries, or transactions between users. Users are solely responsible for any agreements, transactions, or communications with other users.',
  },
  {
    id: 11,
    termNum: '11- USER-GENERATED CONTENT',
    termDetail:
      'Users may post content, including listings, reviews, or comments. Shopdit is not responsible for user-generated content. You agree not to post any content that violates laws, infringes intellectual property rights, or is harmful to others. A reporting feature is provided for inappropriate content.',
  },
  {
    id: 12,
    termNum: '12- INTELLECTUAL PROPERTY',
    termDetail:
      'Shopdit owns all rights to the app, software, logos, and branding. Content posted by businesses remains the property of the business. User-generated content remains the property of the user who posted it, but you grant Shopdit a license to display it in the app.',
  },
  {
    id: 13,
    termNum: '13- PRIVACY',
    termDetail:
      'Use of Shopdit is subject to our Privacy Policy. By using the app, you consent to Shopdit collecting and processing data as described in the Privacy Policy.',
  },
  {
    id: 14,
    termNum: '14- DISCLAIMERS',
    termDetail:
      'Shopdit provides the platform “as is” and makes no warranties about accuracy, reliability, or fitness for a particular purpose. Shopdit is not responsible for disputes between users, businesses, or event organizers.',
  },
  {
    id: 15,
    termNum: '15- LIMITATION OF LIABILITY',
    termDetail:
      'To the maximum extent permitted by law, Shopdit is not liable for indirect, incidental, or consequential damages resulting from use of the app. You agree to use the app at your own risk.',
  },
  {
    id: 16,
    termNum: '16- CHANGES TO TERMS',
    termDetail:
      'Shopdit may update these Terms from time to time. Updated terms will be posted in the app and take effect immediately. Continued use of the app constitutes acceptance of the updated Terms.',
  },
  {
    id: 17,
    termNum: '17- GOVERNING LAW',
    termDetail:
      'These Terms are governed by the laws of the jurisdiction in which Shopdit operates. Any disputes will be resolved in accordance with local law.',
  },
  {
    id: 18,
    termNum: '18- CONTACT US',
    termDetail:
      'If you have questions about these Terms, please contact us using the form found within the application.',
  },
];

