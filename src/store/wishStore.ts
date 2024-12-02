import { create } from 'zustand';
import { User, Wish, Donation, Comment } from '../types';
import { mockUsers } from '../data/mockData';

interface WishStore {
  users: User[];
  currentUser: User | null;
  comments: Comment[];
  addWish: (wish: Wish) => void;
  makeDonation: (donation: Donation) => void;
  redistributeDonation: (amount: number) => void;
  setCurrentUser: (userId: string) => void;
  addComment: (comment: Comment) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

export const useWishStore = create<WishStore>((set) => ({
  users: mockUsers,
  currentUser: mockUsers[0],
  comments: [],
  
  setCurrentUser: (userId) =>
    set((state) => ({
      currentUser: state.users.find((user) => user.id === userId) || null,
    })),

  addWish: (wish) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === wish.userId
          ? { ...user, wishlist: [...user.wishlist, wish].sort((a, b) => a.price - b.price) }
          : user
      ),
    })),

  makeDonation: (donation) =>
    set((state) => {
      const updatedUsers = state.users.map((user) => {
        const updatedWishlist = user.wishlist.map((wish) =>
          wish.id === donation.wishId
            ? { ...wish, progress: wish.progress + donation.amount }
            : wish
        );
        return {
          ...user,
          wishlist: updatedWishlist,
          donations: user.id === donation.donorId
            ? [...user.donations, donation]
            : user.donations,
        };
      });
      return { users: updatedUsers };
    }),

  redistributeDonation: (amount) =>
    set((state) => {
      const eligibleDonors = state.users.filter(
        (user) => user.donations.length > 0 && user.wishlist.some((wish) => wish.progress < wish.price)
      );
      
      if (eligibleDonors.length === 0) return state;
      
      const luckyDonor = eligibleDonors[Math.floor(Math.random() * eligibleDonors.length)];
      const targetWish = luckyDonor.wishlist.find((wish) => wish.progress < wish.price);
      
      if (!targetWish) return state;
      
      const updatedUsers = state.users.map((user) =>
        user.id === luckyDonor.id
          ? {
              ...user,
              wishlist: user.wishlist.map((wish) =>
                wish.id === targetWish.id
                  ? { ...wish, progress: wish.progress + amount }
                  : wish
              ),
            }
          : user
      );
      
      return { users: updatedUsers };
    }),

  addComment: (comment) =>
    set((state) => ({
      comments: [...state.comments, {
        ...comment,
        user: state.users.find(u => u.id === comment.userId)!
      }]
    })),

  followUser: (userId) =>
    set((state) => {
      if (!state.currentUser) return state;
      
      return {
        users: state.users.map(user => {
          if (user.id === state.currentUser!.id) {
            return {
              ...user,
              following: [...user.following, userId]
            };
          }
          if (user.id === userId) {
            return {
              ...user,
              followers: [...user.followers, state.currentUser!.id]
            };
          }
          return user;
        }),
        currentUser: {
          ...state.currentUser,
          following: [...state.currentUser.following, userId]
        }
      };
    }),

  unfollowUser: (userId) =>
    set((state) => {
      if (!state.currentUser) return state;
      
      return {
        users: state.users.map(user => {
          if (user.id === state.currentUser!.id) {
            return {
              ...user,
              following: user.following.filter(id => id !== userId)
            };
          }
          if (user.id === userId) {
            return {
              ...user,
              followers: user.followers.filter(id => id !== state.currentUser!.id)
            };
          }
          return user;
        }),
        currentUser: {
          ...state.currentUser,
          following: state.currentUser.following.filter(id => id !== userId)
        }
      };
    }),
}));