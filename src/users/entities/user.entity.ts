import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Roles } from '../../utility/common/user-roles.enum';
import { OrderEntity } from '../../orders/entities/order.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';

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

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.updatedBy)
  ordersUpdateBy: OrderEntity[];

  @OneToMany(() => CategoryEntity, (category: CategoryEntity) => category.id)
  categories: CategoryEntity[];
}
