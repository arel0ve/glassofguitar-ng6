import { User } from './user';
import { Comment } from './comment';

export class Song {
  artist: string;
  title: string;
  version: number;
  author: User;
  size: string;
  speed: string;
  notes: string[];
  created: Date;
  views: number;
  plays: number;
  likes: number;
  comments: Comment[];
}
