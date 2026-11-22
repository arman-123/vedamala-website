/* ──────────────────────────────────────────────────────────────────────────
   Vedamala Group · single source of truth for site content.
   Every page reads from here, so copy changes happen in one place.
   ────────────────────────────────────────────────────────────────────────── */

export const BRAND = {
  name: "Vedamala Group",
  short: "Vedamala",
  est: "2013",
  region: "Karnataka & Andhra Pradesh",
  tagline: "Building Excellence",
  intro: "Crafting landmark spaces across Karnataka and Andhra Pradesh since 2013.",
};

export const CONTACT = {
  phone: "+91 9538595685",
  phoneHref: "tel:+919538595685",
  phoneHours: "Mon–Sat 9AM–6PM",
  whatsapp: "919538595685",
  email: "marketing@svdevelopers.in",
  instagram: "@svdevelopersofficial",
  instagramHref: "https://www.instagram.com/svdevelopersofficial/",
  addressLine1: "1st Floor, 116, 10th Cross Rd, Binnamangala",
  addressLine2: "Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038",
  mapsHref: "https://maps.google.com/?q=116,10th+Cross+Rd,Binnamangala,Indiranagar,Bengaluru,Karnataka+560038",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/svdevelopersofficial/" },
    { label: "X", href: "https://x.com/SVDevelopersofc" },
    { label: "Reddit", href: "https://www.reddit.com/user/SVDevelopersOfficial/" },
  ],
};

export const HERO_STATS = [
  { value: "500+", label: "Homes delivered" },
  { value: "12+", label: "Years of trust" },
  { value: "2", label: "States" },
];

export const ABOUT = {
  paragraphs: [
    "Established in 2013, Vedamala Group has grown into a respected name in real estate and construction across Andhra Pradesh and Karnataka.",
    "We specialise in residential development, land layouts and premium construction, having completed 7 apartment projects and 6 residential layouts. Each project reflects our core values: quality, transparency, trust and timely delivery.",
  ],
  stats: [
    { value: "7", label: "Apartment projects" },
    { value: "6", label: "Residential layouts" },
    { value: "12+", label: "Years experience" },
    { value: "2013", label: "Established" },
  ],
  values: ["Quality Construction", "Transparency", "Trust & Integrity", "Timely Delivery", "Customer Focus", "Innovation"],
};

export const PURPOSE = {
  statement: "Elegance is not a privilege but a standard every family deserves.",
  mission:
    "At Vedamala Group, our mission is to craft beautiful, thoughtfully designed homes that bring the dream of luxury living within reach of every family. We believe that elegance is not a privilege but a standard every family deserves. Through quality construction, inspired design and an unwavering commitment to our communities, we build more than homes; we build a life worth living.",
  vision:
    "Our vision is a world where every family, regardless of background, has the opportunity to experience the comfort, beauty and pride that comes with calling a truly exceptional home their own. Vedamala Group strives to be the builder that bridges aspiration and reality, creating spaces where generations flourish and memories are made.",
};

export type ServiceIcon = "construction" | "apartments" | "townships" | "layouts" | "villas" | "marketing";
export const SERVICES: { title: string; icon: ServiceIcon; description: string }[] = [
  { title: "Construction", icon: "construction", description: "End-to-end construction services with quality craftsmanship and timely delivery for residential and commercial projects." },
  { title: "Apartments", icon: "apartments", description: "Premium apartment complexes designed for modern living with world-class amenities and sustainable features." },
  { title: "Townships", icon: "townships", description: "Integrated township development with residential, commercial and recreational spaces for complete urban living." },
  { title: "Layouts", icon: "layouts", description: "Well-planned residential and commercial layouts with proper infrastructure, utilities and legal approvals." },
  { title: "Villas", icon: "villas", description: "Luxurious independent villas with contemporary architecture, private gardens and premium finishes." },
  { title: "Real Estate Marketing", icon: "marketing", description: "Strategic property marketing solutions to maximise visibility and accelerate sales for your real estate projects." },
];

export const REASONS = [
  { title: "12+ Years of Trusted Delivery", description: "Delivering consistent and reliable projects for over a decade across Bengaluru and Andhra Pradesh." },
  { title: "Strong Regional Presence", description: "A growing footprint with successful developments across key regions of AP and Karnataka." },
  { title: "Transparent Documentation", description: "All projects follow clear and verified legal documentation with full RERA compliance." },
  { title: "Modern Design, Quality Materials", description: "Durable materials and innovative design practices in every development." },
  { title: "Customer-First Approach", description: "Dedicated service, responsive communication and on-time delivery." },
];

/* ── Projects ──────────────────────────────────────────────────────────── */

export type Project = {
  slug: string;
  name: string;
  /** optional line above the name, e.g. "Code Name" */
  prefix?: string;
  subtitle: string;
  location: string;
  status: string;
  image: string;
  summary: string;
  details?: string;
  facts: { value: string; label: string }[];
  highlights?: string[];
  /** internal page */
  page?: string;
  /** which lead form the project uses */
  lead?: "brochure" | "enquiry";
  mapsHref?: string;
  featured?: boolean;
};

export const AURORA_NAME = { prefix: "Code Name", name: "The Aurora", subtitle: "Luxury Residences" };
export const AURORA_FULL = "Code Name: The Aurora, Luxury Residences";

export const PROJECTS: Project[] = [
  {
    slug: "the-aurora",
    prefix: AURORA_NAME.prefix,
    name: AURORA_NAME.name,
    subtitle: AURORA_NAME.subtitle,
    location: "Hoskote, Bengaluru",
    status: "Now pre-launching",
    image: "/aurora%20pics/overview.png",
    summary:
      "A 2.6-acre masterplan with 81% open landscape, 23+ storey MIVAN-built towers and 45+ curated amenities, on Bangalore's fastest-appreciating eastern corridor. The project we have been building toward, in every sense.",
    facts: [
      { value: "2.6 acres", label: "Masterplan" },
      { value: "81%", label: "Open landscape" },
      { value: "45+", label: "Amenities" },
      { value: "23+", label: "Storeys" },
    ],
    page: "/aurora",
    lead: "brochure",
    mapsHref: "https://maps.app.goo.gl/2kKcgPPYZHWDuuRAA",
    featured: true,
  },
  {
    slug: "vc-enclave-kolar",
    name: "VC Enclave",
    subtitle: "Residential Layout, Kolar",
    location: "Honnenahalli Village, Kolar",
    status: "On sale",
    image: "/vcenclave.jpg",
    summary:
      "A RERA and KUDA-approved residential layout spanning 58,729 sq.m in Honnenahalli Village, Kolar, just off NH-4 between Bengaluru and Mulbagal. 258 plots across four site dimensions, with 54% residential land, dedicated parks and civic amenities. Vaastu-compliant, clear-title plots ready for your dream home.",
    facts: [
      { value: "258", label: "Total plots" },
      { value: "54.23%", label: "Residential area" },
      { value: "16 acres", label: "Total land" },
      { value: "10.91%", label: "Parks & green" },
    ],
    highlights: ["RERA & KUDA approved", "Vaastu-compliant plots", "Clear title", "Just off NH-4"],
    lead: "enquiry",
    featured: true,
  },
  {
    slug: "gopal-grand-residency",
    name: "Gopal Grand Residency",
    subtitle: "3 BHK Apartments",
    location: "B V Reddy Colony, Chittoor",
    status: "Ongoing",
    image: "https://i.ibb.co/gLFyyKh7/GGR.png",
    summary: "A landmark residential development redefining premium living in Chittoor, thoughtfully designed as the first luxury apartment project in the city.",
    details: "The project comprises 6 well-planned floors housing 22 exclusive apartments, ensuring privacy, low density and a close-knit community living experience.",
    facts: [{ value: "6", label: "Floors" }, { value: "22", label: "Units" }, { value: "1800 sq. ft.", label: "Area" }],
    highlights: ["First luxury apartment project in Chittoor", "Low-density development for enhanced privacy", "Modern elevation with premium materials", "Spacious balconies and ample natural light", "Designed for contemporary urban living"],
  },
  {
    slug: "vc-enclave-indiranagar",
    name: "VC Enclave",
    subtitle: "2 & 3 BHK Apartments",
    location: "Indiranagar, Bengaluru",
    status: "Completed 2024",
    image: "https://i.ibb.co/1tg897L5/VCE.png",
    summary: "An exclusive residential address in the prime neighbourhood of Indiranagar, designed for homeowners who value space, privacy and contemporary elegance.",
    details: "5 residential floors with only 20 exclusive apartments ensuring a low-density living environment, with a striking contemporary elevation, clean lines and rich material finishes.",
    facts: [{ value: "5", label: "Floors" }, { value: "20", label: "Units" }, { value: "1500–1800 sq. ft.", label: "Area" }],
    highlights: ["Apartment project in Indiranagar", "Low-density development for enhanced privacy", "Contemporary architecture with premium façade", "Wide balconies and cross ventilation", "High-quality construction and refined finishes"],
  },
  {
    slug: "sree-lakshmi-nilayam",
    name: "Sree Lakshmi Nilayam",
    subtitle: "3 & 4 BHK Residences",
    location: "Indiranagar, Bengaluru",
    status: "Completed 2020",
    image: "https://i.ibb.co/VY9Phqfj/SLN.png",
    summary: "An exclusive boutique residential development in Indiranagar, designed for homeowners seeking privacy, space and refined urban living.",
    details: "Only 3 homes across 5 floors, an ultra-low-density development offering villa-like living within an apartment format, including a signature 4 BHK penthouse of 5800 sq. ft.",
    facts: [{ value: "5", label: "Floors" }, { value: "3", label: "Units" }, { value: "1800–5800 sq. ft.", label: "Area" }],
    highlights: ["Boutique residential development", "Only 3 exclusive residences", "Ultra-spacious 4 BHK duplex penthouse", "Extremely low-density, villa-style living", "Contemporary architecture with premium finishes"],
  },
  {
    slug: "sv-aralia",
    name: "S V Aralia",
    subtitle: "2 & 3 BHK Apartments",
    location: "Whitefield, Bengaluru",
    status: "Completed 2013",
    image: "https://i.ibb.co/FqjQTsDn/SV.png",
    summary: "A well-planned residential community in Whitefield, one of Bengaluru's most established residential and IT corridors.",
    details: "4 residential floors with 42 apartments offering a balanced mix of 2 BHK and 3 BHK homes, close to major IT parks, schools, hospitals and public transport.",
    facts: [{ value: "4", label: "Floors" }, { value: "42", label: "Units" }, { value: "1200–1500 sq. ft.", label: "Area" }],
    highlights: ["Well-planned apartments in Whitefield", "Wide balconies and efficient layouts", "Good natural light and cross ventilation", "Quality construction with long-term durability", "Ideal for end-users and long-term investors"],
  },
  {
    slug: "slv-greens",
    name: "SLV Greens",
    subtitle: "2 & 3 BHK Apartments",
    location: "Whitefield, Bengaluru",
    status: "Completed 2014",
    image: "https://i.ibb.co/jmKGzKq/SVL.png",
    summary: "A thoughtfully planned residential apartment project in Whitefield, one of Bengaluru's prominent residential and IT hubs.",
    details: "4 residential floors with 80 apartments, a well-balanced mix of 2 BHK and 3 BHK homes, close to IT parks, schools, hospitals and shopping.",
    facts: [{ value: "4", label: "Floors" }, { value: "80", label: "Units" }, { value: "1200–1500 sq. ft.", label: "Area" }],
    highlights: ["Functional layouts with spacious living areas", "Wide balconies with good ventilation", "Quality construction with long-term durability", "Established residential community", "Convenient access to IT hubs and amenities"],
  },
  {
    slug: "ds-paradise",
    name: "D S Paradise",
    subtitle: "2 BHK Apartments",
    location: "Gottigere, Bengaluru",
    status: "Available",
    image: "https://i.ibb.co/3LCQh20/DSP.png",
    summary: "A thoughtfully designed residential apartment project in Gottigere, offering comfortable and practical homes for modern families.",
    details: "4 residential floors with 10 apartments, a low-density and peaceful living environment. All 2 BHK apartments of 1200 sq. ft. with efficient use of space and natural light.",
    facts: [{ value: "4", label: "Floors" }, { value: "10", label: "Units" }, { value: "1200 sq. ft.", label: "Area" }],
    highlights: ["Functional layouts with efficient space utilisation", "Good natural light and ventilation", "Quality construction at an accessible price", "Convenient access to daily amenities"],
  },
  {
    slug: "gs-exotica",
    name: "G S Exotica",
    subtitle: "2 & 3 BHK Apartments",
    location: "Gottigere, Bengaluru",
    status: "Available",
    image: "https://i.ibb.co/2xt2Py0/GSE.png",
    summary: "A well-planned residential apartment project in Gottigere, offering practical and comfortable homes.",
    details: "4 residential floors with 40 apartments near Bannerghatta Road, with easy access to schools, hospitals, supermarkets and major employment hubs.",
    facts: [{ value: "4", label: "Floors" }, { value: "40", label: "Units" }, { value: "1200–1500 sq. ft.", label: "Area" }],
    highlights: ["Mix of 2 BHK & 3 BHK homes", "Practical layouts with efficient space utilisation", "Good ventilation and natural light", "Easy access to daily amenities and main roads", "Ideal for families and first-time homebuyers"],
  },
];

/* ── Code Name: The Aurora page ───────────────────────────────────────── */

export const AURORA = {
  heroVideo: "/aurora%20pics/auroravideo.mp4",
  heroPoster: "/aurora%20pics/overview.png",
  location: "Hoskote, Bangalore",
  quote: "A quieter kind of wealth, on Hoskote highway.",
  introTitle: ["Built to inherit.", "Detailed to admire."],
  intro: [
    "Luxury, to us, is not a finish. It is a set of decisions nobody tells you were made: the proportion of a window, the way a lift lobby lands, the eighty-one percent of this site we will leave unbuilt.",
    "The Aurora sits on the Old Madras Road / Hoskote corridor, the next serious stretch of Bangalore, redrawn by metro, highway, bullet train and airport. A 2.6-acre masterplan of 23+ storey towers, MIVAN-built, holding 2 & 3 bedroom residences across four distinct configurations, a multi-level clubhouse and a landscape engineered to remain the feature, not the footnote.",
  ],
  highlights: [
    { value: "2.6 acres", label: "Masterplan" },
    { value: "81%", label: "Open landscape" },
    { value: "23+", label: "Storeys, MIVAN built" },
    { value: "45+", label: "Curated amenities" },
  ],
  residences: [
    { name: "The Belgravia", type: "2 Bedroom", area: "1200+ sq. ft.", note: "For the couple who have earned their quiet." },
    { name: "The Chelsea", type: "2 Bedroom", area: "1400+ sq. ft.", note: "The larger 2-bedroom for those who host." },
    { name: "The Windsor", type: "3 Bedroom", area: "1600+ sq. ft.", note: "A full three-bedroom home, held in proportion." },
    { name: "The Kensington", type: "3 Bedroom", area: "1800+ sq. ft.", note: "The Aurora's largest. For the family that has arrived." },
  ],
  specs: [
    { k: "Construction", v: "MIVAN: monolithic, crack-resistant, earthquake-resilient" },
    { k: "Power", v: "24×7, 100% DG backup across common & residential load" },
    { k: "Water", v: "STP + WTP, rainwater harvesting, full recharge system" },
    { k: "Lifts", v: "5 resident + 2 service lifts per tower, fire-rated" },
    { k: "Smart ready", v: "Pre-wired for fibre, home automation & EV charging" },
    { k: "Status", v: "Pre-Launch · Heritage Edition" },
  ],
  amenities: [
    "Double-Height Lobby", "Private Cinema", "Business Lounge", "Co-working Suite",
    "25m Lap Pool", "Fully-Equipped Gym", "Spa & Sauna", "Banquet Hall",
    "Indoor Badminton", "Squash Court", "Tennis Court", "Pickleball",
    "500m Jogging Loop", "Amphitheatre", "Kids' Atelier", "Sky Lounge",
    "Stargazing Terrace", "Pet Park", "Meditation Grove", "Library",
  ],
  gallery: [
    { src: "/aurora%20pics/overview.png", caption: "Overview" },
    { src: "/aurora%20pics/Aurora%20club.png", caption: "Clubhouse lobby" },
    { src: "/aurora%20pics/amphitheatre.png", caption: "Amphitheatre" },
    { src: "/aurora%20pics/sky%20deck.png", caption: "Sky deck" },
    { src: "/aurora%20pics/mMivan.png", caption: "MIVAN construction" },
    { src: "/aurora%20pics/pg%2044%20.jpg", caption: "Skyline" },
    { src: "/aurora%20pics/page%20no%2027%20(1).png", caption: "Landscape" },
    { src: "/aurora%20pics/page%20no%206.png", caption: "Garden walk" },
  ],
  anchors: [
    { k: "Airport", v: "25 minutes to Kempegowda International via the STRR" },
    { k: "Metro", v: "MVJ Hospital Metro Station, under 4 minutes" },
    { k: "Bullet train", v: "Approved station on the Chennai–Bangalore corridor" },
    { k: "Highway", v: "NH-75 on-corridor · 6-lane Chennai Express Highway" },
  ],
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3!2d77.7971!3d13.0711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTMwNDI0LjgsNzc0Ny44!5e0!3m2!1sen!2sin!4v1",
  mapsHref: "https://maps.app.goo.gl/2kKcgPPYZHWDuuRAA",
  /** shown if the map embed is switched off */
  mapFallback: "/aurora%20pics/masterplan.png",
  closing: {
    eyebrow: "Pre-Launch · Heritage Edition",
    title: "Get in early.",
    body: "A location that is appreciating while you read this sentence. Request the full Pre-Launch deck and a member of our team will be in touch.",
  },
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "The Aurora", href: "/aurora" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
