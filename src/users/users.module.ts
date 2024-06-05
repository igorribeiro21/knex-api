import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { KnexModule } from '../knex.module';

@Module({
  imports: [KnexModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
