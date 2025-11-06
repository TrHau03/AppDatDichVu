export type UserState = {
  profile: {
    name: string;
    phoneNumber: string;
    address: string;
    addressDescription: string;
  };
  payment: {
    current: {
      id: string;
      type: 'cash' | 'bank' | 'wallet';
      cardNumber: string | null;
    };
    cards: {
      id: string;
      type: 'cash' | 'bank' | 'wallet';
      cardNumber: string | null;
    }[];
  };
};
