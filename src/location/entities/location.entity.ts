import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('locations')
export class LocationEntity {
  @PrimaryColumn({ nullable: false, unique: true })
  id: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  contactPerson: string;

  @Column({ type: 'float8', nullable: false })
  longitude: number;

  @Column({ type: 'float8', nullable: false })
  latitude: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
