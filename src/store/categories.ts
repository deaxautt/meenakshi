import { create } from 'zustand';

export interface Category {
  name: string;
  subcategories: {
    [key: string]: string[];
  };
  images: {
    [key: string]: {
      main: string;
      items: {
        [key: string]: string;
      };
    };
  };
}

interface CategoryStore {
  categories: Category[];
  getMainCategories: () => string[];
  getSubcategories: (category: string) => string[];
  getDetailedSubcategories: (category: string) => { [key: string]: string[] };
}

const categories: Category[] = [
  {
    name: 'Gemstones',
    subcategories: {
      'Astrology Gemstones': ['Emerald (Panna)', 'Pearl (Moti)', 'Ruby (Manik)', 'Yellow Sapphire (Pukhraj)'],
      'Other Gemstones': ['Moonstone', 'Opal', 'Amethyst', 'Topaz']
    },
    images: {
      'Astrology Gemstones': {
        main: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg",
        items: {
          'Emerald (Panna)': "https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg",
          'Pearl (Moti)': "https://images.pexels.com/photos/1154619/pexels-photo-1154619.jpeg",
          'Ruby (Manik)': "https://images.pexels.com/photos/1616793/pexels-photo-1616793.jpeg",
          'Yellow Sapphire (Pukhraj)': "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg"
        }
      },
      'Other Gemstones': {
        main: "https://images.pexels.com/photos/1616793/pexels-photo-1616793.jpeg",
        items: {
          'Moonstone': "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg",
          'Opal': "https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg",
          'Amethyst': "https://images.pexels.com/photos/1616793/pexels-photo-1616793.jpeg",
          'Topaz': "https://images.pexels.com/photos/68740/gemstone-gem-blue-sapphire-68740.jpeg"
        }
      }
    }
  },
  {
    name: 'Rudraksha',
    subcategories: {
      'Premium Rudraksha': ['1 Mukhi', '2 Mukhi', '5 Mukhi', '7 Mukhi'],
      'Rudraksha Malas': ['108 Beads', '54 Beads', '27 Beads', 'Combination']
    },
    images: {
      'Premium Rudraksha': {
        main: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg",
        items: {
          '1 Mukhi': "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg",
          '2 Mukhi': "https://images.pexels.com/photos/6044267/pexels-photo-6044267.jpeg",
          '5 Mukhi': "https://images.pexels.com/photos/6044268/pexels-photo-6044268.jpeg",
          '7 Mukhi': "https://images.pexels.com/photos/6044269/pexels-photo-6044269.jpeg"
        }
      },
      'Rudraksha Malas': {
        main: "https://images.pexels.com/photos/6044270/pexels-photo-6044270.jpeg",
        items: {
          '108 Beads': "https://images.pexels.com/photos/6044270/pexels-photo-6044270.jpeg",
          '54 Beads': "https://images.pexels.com/photos/6044271/pexels-photo-6044271.jpeg",
          '27 Beads': "https://images.pexels.com/photos/6044272/pexels-photo-6044272.jpeg",
          'Combination': "https://images.pexels.com/photos/6044273/pexels-photo-6044273.jpeg"
        }
      }
    }
  },
  {
    name: 'Traditional',
    subcategories: {
      'Sarees': ['Silk Sarees', 'Cotton Sarees', 'Designer Sarees', 'Bridal Sarees'],
      'Ethnic Wear': ['Lehengas', 'Kurtis', 'Blouses', 'Dupattas']
    },
    images: {
      'Sarees': {
        main: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
        items: {
          'Silk Sarees': "https://images.pexels.com/photos/2995309/pexels-photo-2995309.jpeg",
          'Cotton Sarees': "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
          'Designer Sarees': "https://images.pexels.com/photos/2995309/pexels-photo-2995309.jpeg",
          'Bridal Sarees': "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg"
        }
      },
      'Ethnic Wear': {
        main: "https://images.pexels.com/photos/2995309/pexels-photo-2995309.jpeg",
        items: {
          'Lehengas': "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
          'Kurtis': "https://images.pexels.com/photos/2995309/pexels-photo-2995309.jpeg",
          'Blouses': "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
          'Dupattas': "https://images.pexels.com/photos/2995309/pexels-photo-2995309.jpeg"
        }
      }
    }
  }
];

const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories,
  getMainCategories: () => categories.map(cat => cat.name),
  getSubcategories: (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? Object.keys(cat.subcategories) : [];
  },
  getDetailedSubcategories: (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.subcategories : {};
  }
}));

export default useCategoryStore;