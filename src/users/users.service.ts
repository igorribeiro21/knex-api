import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class UsersService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async findAll(): Promise<any[]> {
    return this.knex('users').select('*');
  }

  async create(user: any): Promise<void> {
    await this.knex('users').insert(user);
  }
}
