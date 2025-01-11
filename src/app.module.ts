import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from '../database/data-sources';
import { TestModule } from './test/test.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
