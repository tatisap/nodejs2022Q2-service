import { Album, Artist, Track, User } from 'lib/entities';

class DB {
  public readonly users: User[];
  public readonly artists: Artist[];
  public readonly albums: Album[];
  public readonly tracks: Track[];

  constructor() {
    this.users = [];
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}

export const db = new DB();
