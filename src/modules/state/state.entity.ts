import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'modules/user/user.entity';

@Entity('state')
export class StateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'bigint',
  })
  user_id: number;

  @Column({
    nullable: true,
  })
  current_state: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.state)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
