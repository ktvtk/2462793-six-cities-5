export interface Comment {
  text: string; // 5..1024
  date?: string;
  rating: number; // 1..5
  authorEmail: string;
}
