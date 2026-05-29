// Shared types for the Dashboard feature

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  clickCount: number;
  isDeepLink: boolean;
}

export interface ProductItem {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
  purchaseUrl: string;
}

export interface DashboardUser {
  _id: string;
  name: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  theme?: string;
  links: LinkItem[];
  products: ProductItem[];
  socials?: Record<string, string>;
}

export interface FeedbackState {
  type: "success" | "error";
  message: string;
}

export interface LinkModalState {
  open: boolean;
  mode: "add" | "edit";
  data?: LinkItem;
}

export interface ProductModalState {
  open: boolean;
  mode: "add" | "edit";
  data?: ProductItem;
}

export interface DeleteTarget {
  type: "link" | "product";
  id: string;
  title: string;
}

export type ChatMessage = any;
