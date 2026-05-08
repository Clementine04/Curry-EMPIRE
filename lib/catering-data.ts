export type CateringService = {
  slug: string
  name: string
  description: string
  image: string
  documentation: {
    title: string
    description: string
    galleryImages: string[]
    eventDetails: {
      type: string
      guestCount: string
      setupStyle: string
      includes: string
    }
  }
}

const COCKTAIL = "/curry/catering/cocktail.jpg"
const COFFEE = "/curry/catering/coffee.jpg"
const BEER = "/curry/catering/beer.jpg"
const FROYO = "/curry/catering/froyo.jpg"
const PIZZA = "/curry/catering/pizza.jpg"
const TRAYS = "/curry/catering/trays.jpg"
const PACKED = "/curry/catering/packed.jpg"
const CREW = "/curry/catering/crew.jpg"

export const CATERING_SERVICES: CateringService[] = [
  {
    slug: "mobile_cocktail_bar",
    name: "Mobile Cocktail Bar",
    description: "A premium mobile cocktail bar setup for events and celebrations.",
    image: COCKTAIL,
    documentation: {
      title: "Mobile Cocktail Bar Documentation",
      description:
        "Previous cocktail bar setups for parties, birthdays, weddings, and private celebrations.",
      galleryImages: [COCKTAIL, BEER, COFFEE, FROYO, TRAYS, PACKED],
      eventDetails: {
        type: "Weddings, birthdays, private parties",
        guestCount: "50 to 150 guests",
        setupStyle: "Elegant mobile bar",
        includes: "Bar setup, cocktail preparation, glassware, and bar staff",
      },
    },
  },
  {
    slug: "mobile_coffee_bar",
    name: "Mobile Coffee Bar",
    description: "A cafe-style coffee station for private and corporate events.",
    image: COFFEE,
    documentation: {
      title: "Mobile Coffee Bar Documentation",
      description:
        "A look at previous cafe-style coffee bar setups for private gatherings and corporate events.",
      galleryImages: [COFFEE, COCKTAIL, FROYO, PACKED, TRAYS, BEER],
      eventDetails: {
        type: "Corporate event / private gathering",
        guestCount: "50 to 100 guests",
        setupStyle: "Minimal cafe counter",
        includes: "Coffee station, drinks setup, cups, and service crew",
      },
    },
  },
  {
    slug: "mobile_beer_keg_station",
    name: "Mobile Beer Keg Station",
    description: "A beer station setup for parties and gatherings.",
    image: BEER,
    documentation: {
      title: "Mobile Beer Keg Station Documentation",
      description:
        "Previous mobile beer keg setups for casual parties, gatherings, and group events.",
      galleryImages: [BEER, COCKTAIL, PIZZA, TRAYS, FROYO, PACKED],
      eventDetails: {
        type: "Casual parties, gatherings, group events",
        guestCount: "40 to 150 guests",
        setupStyle: "Rustic mobile beer station",
        includes: "Keg setup, taps, glassware, and service crew",
      },
    },
  },
  {
    slug: "mobile_froyo_bar",
    name: "Mobile Froyo Bar",
    description: "A frozen yogurt bar with toppings for guests.",
    image: FROYO,
    documentation: {
      title: "Mobile Froyo Bar Documentation",
      description:
        "Previous frozen yogurt bar setups with toppings and guest service.",
      galleryImages: [FROYO, COFFEE, COCKTAIL, TRAYS, PACKED, PIZZA],
      eventDetails: {
        type: "Birthdays, family gatherings, corporate events",
        guestCount: "30 to 120 guests",
        setupStyle: "Dessert station",
        includes: "Froyo setup, toppings, cups, and service crew",
      },
    },
  },
  {
    slug: "mobile_pizza_bar",
    name: "Mobile Pizza Bar",
    description: "A pizza station for events and group celebrations.",
    image: PIZZA,
    documentation: {
      title: "Mobile Pizza Bar Documentation",
      description:
        "Previous pizza station setups for parties, celebrations, and company events.",
      galleryImages: [PIZZA, BEER, TRAYS, COCKTAIL, FROYO, PACKED],
      eventDetails: {
        type: "Parties and company events",
        guestCount: "50 to 150 guests",
        setupStyle: "Live pizza station",
        includes: "Pizza setup, serving station, staff, and food display",
      },
    },
  },
  {
    slug: "party_food_trays",
    name: "Party Food Trays",
    description: "Food trays for birthdays, meetings, and family gatherings.",
    image: TRAYS,
    documentation: {
      title: "Party Food Trays Documentation",
      description:
        "Previous party tray setups for birthdays, meetings, and family gatherings.",
      galleryImages: [TRAYS, PACKED, PIZZA, CREW, FROYO, COFFEE],
      eventDetails: {
        type: "Birthdays, meetings, family gatherings",
        guestCount: "20 to 100 guests",
        setupStyle: "Food tray delivery or buffet table",
        includes: "Food trays, packaging, and serving options",
      },
    },
  },
  {
    slug: "packed_lunch",
    name: "Packed Lunch",
    description: "Packed meals for offices, schools, teams, and events.",
    image: PACKED,
    documentation: {
      title: "Packed Lunch Documentation",
      description:
        "Previous packed lunch arrangements for offices, schools, teams, and events.",
      galleryImages: [PACKED, CREW, TRAYS, COFFEE, FROYO, PIZZA],
      eventDetails: {
        type: "Offices, schools, teams, event crews",
        guestCount: "20 to 300 meals",
        setupStyle: "Packed meal distribution",
        includes: "Packed meals, labels, and organized handoff",
      },
    },
  },
  {
    slug: "crew_meals",
    name: "Crew Meals",
    description: "Meal packages for production teams, staff, and event crews.",
    image: CREW,
    documentation: {
      title: "Crew Meals Documentation",
      description:
        "Previous crew meal setups for staff, production teams, and event operations.",
      galleryImages: [CREW, PACKED, TRAYS, COFFEE, BEER, COCKTAIL],
      eventDetails: {
        type: "Production teams, event staff, company operations",
        guestCount: "20 to 300 meals",
        setupStyle: "Packed meal support",
        includes: "Meal packs, delivery coordination, and organized distribution",
      },
    },
  },
]
