import lifeData from "@/data/life.json";

export interface Book {
  title: string;
  author: string;
  category: string;
  year: string;
  rating: number;
  coverImage?: string;
  description: string;
  keyTakeaways: string[];
  link?: string;
}

export interface Movie {
  title: string;
  director: string;
  year: string;
  genre: string;
  rating: number;
  posterImage?: string;
  description: string;
  themes: string[];
  imdbLink?: string;
}

export const LIFE_DATA = {
  books: lifeData.books as Book[],
  movies: lifeData.movies as Movie[],
};
