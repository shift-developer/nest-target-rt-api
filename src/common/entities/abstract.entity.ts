import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @Column()
  @Generated('uuid')
  public uuid: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  @Exclude()
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: false })
  public deletedAt: Date;
}
