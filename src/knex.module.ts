import { Module, Global } from '@nestjs/common';
import { knex, Knex } from 'knex';
import knexConfig from '../knexfile';

@Global()
@Module({
  providers: [
    {
      provide: 'KnexConnection',
      useFactory: (): Knex => {
        return knex(knexConfig.development);
      },
    },
  ],
  exports: ['KnexConnection'],
})
export class KnexModule {}
