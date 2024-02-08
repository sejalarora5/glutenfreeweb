export interface Cuisine {
    id: number;
    name: string;
  }
  
  export interface Data {
    gluten: string;
    cuisine: Cuisine[];
  }
  
  export interface StoreFilterData {
    success: boolean;
    data: Data[];
  }