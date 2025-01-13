import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from '../database/data-sources';
import { TestModule } from './test/test.module';
import { CategoriesController } from './categories/categories.controller';
import { OrdersController } from './orders/orders.controller';
import { ProductsController } from './products/products.controller';
import { UsersController } from './users/users.controller';
import { CategoriesService } from './categories/categories.service';
import { OrdersService } from './orders/orders.service';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TestModule, UsersModule],
  controllers: [
    AppController,
    UsersController,
    ProductsController,
    CategoriesController,
    OrdersController,
  ],
  providers: [
    AppService,
    UsersService,
    ProductsService,
    CategoriesService,
    OrdersService,
  ],
})
export class AppModule {}
