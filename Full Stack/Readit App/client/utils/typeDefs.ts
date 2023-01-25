export interface Post {
  identifier: string;
  title: string;
  body?: string;
  createdAt: string;
  updatedAt?: string;
  slug: string;
  subName: string;
  url: string;
  username: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
  sub?: Sub;
}

export interface User {
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

export interface Sub {
  createdAt: string;
  updatedAt: string;
  username: string;
  name: string;
  title: string;
  description: string;
  imageUrn: string;
  bannerUrn: string;
  imageUrl: string;
  bannerUrl: string;
  posts?: Post[];
}

export interface Comment {
  body: string;
  createdAt: string;
  identifier: string;
  updatedAt: string;
  userVote: number;
  username: string;
  voteScore: number;
}
