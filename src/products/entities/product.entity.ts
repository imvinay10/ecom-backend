import { CategoryEntity } from '../../categories/entities/category.entity';
import { OrdersProductsEntity } from '../../orders/entities/orders-products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  stock: number;

  @Column('simple-array')
  images: string[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => UserEntity, { eager: true })
  addedBy: UserEntity;

  @ManyToOne(() => CategoryEntity, { eager: true })
  category: CategoryEntity;

  @OneToMany(() => OrdersProductsEntity, (orderProduct) => orderProduct.product)
  products: OrdersProductsEntity[];
}
