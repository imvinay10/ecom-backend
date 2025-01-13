import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Roles } from 'src/utility/common/user-roles.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  roles: Roles;

  @Column({ default: true })
  isActive: boolean;
}
