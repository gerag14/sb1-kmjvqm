export interface Wish {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  progress: number;
  userId: string;
  category: WishCategory;
}

export type WishCategory = 
  | 'tecnologia'
  | 'deportes'
  | 'hogar'
  | 'educacion'
  | 'arte'
  | 'musica'
  | 'viajes'
  | 'otros';

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  wishlist: Wish[];
  donations: Donation[];
  followers: string[];
  following: string[];
}

export interface Donation {
  id: string;
  amount: number;
  wishId: string;
  donorId: string;
  timestamp: Date;
  comment?: string;
}

export interface Comment {
  id: string;
  wishId: string;
  userId: string;
  content: string;
  timestamp: Date;
  user: User;
}