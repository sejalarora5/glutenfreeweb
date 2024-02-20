export interface Restaurant {
  id: number;
  distance: number;
  name: string;
  description: string;
  banner: string;
  location: string;
  lat: string;
  lng: string;
  zip: string;
  cuisine: string;
  phone_number: string;
  glutenfacility: string;
  opening_hours: string;
  website?: any;
  most_celiac?: any;
  rating: number;
}

export interface Meta {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  count: number;
}

export interface Data {
  restaurant: Restaurant[];
  meta: Meta;
}

export interface RestaurantsData {
  success: boolean;
  data: Data;
}
