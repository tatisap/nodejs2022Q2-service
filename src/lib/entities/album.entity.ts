import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { Artist } from './artist.entity';
import { BaseEntity } from './base.entity';
import { Track } from './track.entity';

@Entity('album')
export class Album extends BaseEntity {
  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  artist: Relation<Artist>;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Relation<Track[]>;
}
