import { v4 as uuid } from 'uuid';
import { IUser } from '../../interfaces';

class User implements IUser {
  name: string;
  login: string;
  password: string;
  id: string;

  constructor({
    name,
    login,
    password,
  }) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

export default User;
