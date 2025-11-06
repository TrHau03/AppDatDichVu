export interface Service {
  id: string;
  name: string;
  price: number;
  points: number;
  provider: string;
  distance: number;
  type: string; //phuc vu tai nha hoac tai tiem
  imageUrl: string[];
}
