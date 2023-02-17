import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Album } from './album.entity';
import { BaseEntity } from './base.entity';
import { Track } from './track.entity';

@Entity('artist')
export class Artist extends BaseEntity {
  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @Column({ default: false })
  isFavorite: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Relation<Album[]>;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Relation<Track[]>;
}
