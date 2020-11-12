import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  first_name: string;

  @Column()
  gender: string;

  @Column()
  image_url: string;

  @Column()
  last_name: string;

  @Column()
  locale: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
