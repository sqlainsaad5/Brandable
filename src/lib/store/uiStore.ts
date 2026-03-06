import { create } from "zustand";

type UIStore = {
  cartOpen: boolean;
  mobileMenuOpen: boolean;
  newsletterPopupSeen: boolean;
  setCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setNewsletterPopupSeen: (seen: boolean) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  cartOpen: false,
  mobileMenuOpen: false,
  newsletterPopupSeen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  toggleCart: () => set((s) => ({ cartOpen: !s.cartOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  setNewsletterPopupSeen: (seen) => set({ newsletterPopupSeen: seen }),
}));
