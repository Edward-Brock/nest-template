import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 用户性别
export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

// 用户状态
export enum UserStatus {
  LOCK = 'lock',
  ACTIVITY = 'activity',
  INACTIVATED = 'inactivated',
}

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  @Generated('uuid')
  uid: string;

  @Column({ comment: '账号名称' })
  username: string;

  @Column({ comment: '用户昵称', nullable: true })
  nickname: string;

  @Column({ comment: '账号密码' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.OTHER,
    comment: '用户性别',
  })
  gender: UserGender;

  @Column({ comment: '用户头像', nullable: true })
  avatar: string;

  @Column({ comment: '用户电话', nullable: true })
  mobile: string;

  @Column({ comment: '用户邮箱', nullable: true })
  email: string;

  @Column({ type: 'simple-array', comment: '用户权限数组', nullable: true })
  role: string[];

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.INACTIVATED,
    comment: '用户状态',
  })
  userStatus: UserStatus;

  @Column({ type: 'boolean', comment: '删除标记', default: false })
  isDelete: boolean;

  @CreateDateColumn({ comment: '创建日期' })
  create_time: Date;

  @UpdateDateColumn({ comment: '更新日期' })
  update_time: Date;
}
