import { UUIDV4 } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  status: string;
}


@Table({ tableName: 'users' })
export class User extends Model<User, IUser> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: UUIDV4,
    allowNull: false
  })
  id: string;

  @Column({
    allowNull: false,
    unique: true
  })
  username: string;

  @Column({
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({
    allowNull: false
  })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM('user', 'admin', 'moderator'),
    defaultValue: 'user'
  })
  role: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM('inactive', 'active'),
    defaultValue: 'inactive'
  })
  status: string;
}
