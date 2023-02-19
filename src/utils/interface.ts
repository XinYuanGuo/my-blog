export interface PostData {
  group: string;
  date: string;
  fromNow: string;
  modified: string;
  content: string;
  slug: string;
  // gray matter data
  title?: string;
  description?: string;
  tags?: string[];
  cover?: string;
}
