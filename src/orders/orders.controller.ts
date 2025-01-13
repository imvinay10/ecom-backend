import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { AuthenticationGuard } from '../utility/guards/authentication.guard';
import { UserEntity } from '../users/entities/user.entity';
import { CurrentUser } from '../utility/decorators/current-user.decorator';
import { AuthorizeGuard } from '../utility/guards/authorization.guard';
import { Roles } from '../utility/common/user-roles.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<any> {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.ordersService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.update(
      +id,
      updateOrderStatusDto,
      currentUser,
    );
  }

  @Put('cancel/:id')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  async cancelled(
    @Param('id') id: string,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.cancelled(+id, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
