
export interface IPost {
  selftext: string;
  title: string;
  id: string;
  num_comments: number;
  score: number;
  url_overridden_by_dest: string;
  thumbnail: string;
}

export interface IChildrenData {
  data: IPost;
}

