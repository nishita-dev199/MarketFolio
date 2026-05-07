import mongoose, { Schema, models, Model } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string;
  date: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split('T')[0],
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    keywords: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    imageAlt: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> = models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
