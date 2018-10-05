import { Song } from './song';

export class User {
  login: string;
  isVerify: boolean;
  verifyCode: string;
  email: string;
  hashedPassword: string;
  salt: string;
  tag: string;
  name: string;
  photo: string;
  numberPhoto: number;
  birthday: Date;
  place: string;
  country: string;
  biography: string;
  hatColor: string;
  created: Date;
  songs: Song[];
}
