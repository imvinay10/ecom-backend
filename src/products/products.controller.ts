import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

import { ProductsDto } from './dto/products.dto';
import { AuthenticationGuard } from '../utility/guards/authentication.guard';
import { CurrentUser } from '../utility/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';
import { SerializeIncludes } from '../utility/interceptors/serialize.interceptor';
import { Roles } from '../utility/common/user-roles.enum';
import { AuthorizeGuard } from '../utility/guards/authorization.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<ProductEntity> {
    return await this.productsService.create(createProductDto, currentUser);
  }

  @SerializeIncludes(ProductsDto)
  @Get()
  async findAll(@Query() query: any): Promise<ProductsDto> {
    return await this.productsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }
}
