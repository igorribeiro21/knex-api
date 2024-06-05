import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { KnexModule } from '../knex.module';
import { knex, Knex } from 'knex';
import knexConfig from '../../knexfile';

describe('UsersService', () => {
  let service: UsersService;
  let knexInstance: Knex;

  beforeEach(async () => {
    knexInstance = knex(knexConfig.test);

    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule],
      providers: [
        UsersService,
        {
          provide: 'KnexConnection',
          useValue: knexInstance,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    await knexInstance.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('name');
      table.string('email');
    });
  });

  afterEach(async () => {
    await knexInstance.destroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    await service.create(user);
    const users = await service.findAll();
    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject(user);
  });
});
