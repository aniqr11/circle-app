export default interface ThreadsInterface {
  content: string;
  image: string;
  id: number;
  user: {
    created_at: string;
    email: string;
    fullname: string;
    id: number;
    profile_description: string;
    profile_picture: string;
    username: string;
  };
  reply: [];
  created_at: string;
}

export interface UserInterface {
  email: string;
  fullname: string;
  id: number;
  profile_description: string;
  profile_picture: string;
  username: string;
}

export interface ReplyInterface {
  id: number;
  content: string;
  image?: string;
  user: {
    fullname: string;
    username: string;
    id: number;
    profile_picture: string;
  };
  thread: {
    id: number;
    content: string;
  };
  created_at: string;
}

// blob media stroe string
