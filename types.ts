
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'icloud' | 'software' | 'hardware' | 'unlock';
}

export interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
  avatar: string;
}
