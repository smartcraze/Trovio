import mongoose, { Schema, Document } from "mongoose";

export interface ILink {
  id: string;
  title: string;
  url: string;
  isDeepLink: boolean;
  clickCount: number;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  purchaseUrl: string;
}

export interface ISocials {
  instagram?: string;
  twitter?: string;
  youtube?: string;
  spotify?: string;
  github?: string;
  tiktok?: string;
  website?: string;
}

export interface IUser extends Document {
  username: string;
  password?: string;
  name: string;
  bio: string;
  avatarUrl?: string;
  theme: string;
  socials: ISocials;
  links: ILink[];
  products: IProduct[];
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema = new Schema<ILink>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  isDeepLink: { type: Boolean, default: false },
  clickCount: { type: Number, default: 0 },
});

const ProductSchema = new Schema<IProduct>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  purchaseUrl: { type: String, required: true },
});

const SocialsSchema = new Schema<ISocials>({
  instagram: { type: String, default: "" },
  twitter: { type: String, default: "" },
  youtube: { type: String, default: "" },
  spotify: { type: String, default: "" },
  github: { type: String, default: "" },
  tiktok: { type: String, default: "" },
  website: { type: String, default: "" },
});

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 160,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "glass-dark",
    },
    socials: {
      type: SocialsSchema,
      default: () => ({}),
    },
    links: {
      type: [LinkSchema],
      default: [],
    },
    products: {
      type: [ProductSchema],
      default: [],
      validate: [
        (val: IProduct[]) => val.length <= 3,
        "Products cannot exceed the limit of 3.",
      ],
    },
  },
  {
    timestamps: true,
  },
);

// Prevent compiling model query on hot reload
export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
