export interface IArtist {
  id: number;
  name: string;
  address: string;
  first_release_year: string;
  no_of_album_release: number;
  dob: string;
  gender: string;
  created_at?: string;
  updated_at?: string;
}

export interface RootArtistResponse {
  type: string;
  status_code: number;
  message: string;
  result: ArtistResult;
}

export interface ArtistResult {
  artists: IArtist[];
  currentPage: number;
  totalPages: number;
  totalArtists: number;
}

export interface RootArtistDetail {
  type: string;
  status_code: number;
  message: string;
  result: Result;
}

export interface Result {
  artistDetail: ArtistDetail;
}

export interface ArtistDetail {
  id: number;
  name: string;
  address: string;
  first_release_year: string;
  no_of_album_release: number;
  dob: string;
  gender: string;
  created_at: string;
  updated_at: string;
}
