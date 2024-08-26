export interface Character {
  id: string;
  name: string;
  images: string[];
  debut?: {
    appearsIn?: string;
  };
  personal?: {
    affiliation?: string;
  };
}
