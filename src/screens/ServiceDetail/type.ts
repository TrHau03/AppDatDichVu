export interface ServiceDetailType {
  id: string;
  name: string;
  price: number;
  points: number;
  category: string;
  provider: string;
  distance: number;
  type: string; //phuc vu tai nha hoac tai tiem
  imageUrl: string[];
  closeTime: string;
  openTime: string;
  description: string;
  duration: string;
  address: string;
  phoneNumber: string;
  model: string;
  totalPrice: number;
  moreServices: {
    title: string;
    price: number;
    quantity: number;
  }[];
}
