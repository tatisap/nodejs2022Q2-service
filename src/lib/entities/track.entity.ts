import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { Album } from './album.entity';
import { Artist } from './artist.entity';
import { BaseEntity } from './base.entity';

@Entity('track')
export class Track extends BaseEntity {
  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ default: false })
  isFavorite: boolean;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  artist: Relation<Artist>;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  album: Relation<Album>;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;
}
