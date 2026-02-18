
export enum TravelCategory {
  HONEYMOON = 'Honeymoon',
  FAMILY = 'Family',
  SPIRITUAL = 'Spiritual',
  ADVENTURE = 'Adventure',
  LUXURY = 'Luxury',
  ELDERLY = 'Senior Citizens'
}

export interface PackagePlan {
  id: string;
  title: string;
  category: TravelCategory;
  price: string;
  duration: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface UserPreferences {
  vibe: string;
  budget: string;
  ageGroup: string;
  destinationHint?: string;
  startDate?: string;
  endDate?: string;
  activities: string[];
}
