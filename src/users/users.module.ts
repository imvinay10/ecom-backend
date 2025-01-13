import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserEntityRepository } from 'userEntityRepository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserEntityRepository])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
