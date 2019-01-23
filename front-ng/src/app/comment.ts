import { User } from './user';

export class Comment {
  author: User;
  text: string;
  created: Date;
  likes: number;
}
