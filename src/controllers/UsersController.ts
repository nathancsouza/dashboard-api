import { Request, Response } from 'express';
import { format } from 'date-fns';
import currencyFormatter from 'currency-formatter';
import knex from '../database/connection';

interface IUser {
  id: string;
  name: string;
  money: number;
  email: string;
  created_at: Date;
}

class UsersController {
  async index(request: Request, response: Response): Promise<any> {
    const users = await knex('users').select('*');

    const serializedItems = users.map((user: IUser) => {
      return {
        id: user.id,
        name: user.name,
        money: currencyFormatter.format(user.money, { code: 'USD' }),
        email: user.email,
        created_at: format(user.created_at, 'P'),
      };
    });

    return response.json(serializedItems);
  }

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;

    const user = await knex('users').where('id', id).first();

    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }

    const users = await knex('users').where('id', id).select('*');

    return response.json(users);
  }
}

export default UsersController;
