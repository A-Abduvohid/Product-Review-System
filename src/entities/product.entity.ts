import { UUIDV4 } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
}


@Table({ tableName: 'products' })
export class Product extends Model<Product, IProduct> {
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
  name: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT
  })
  description: string;

  @Column({
    allowNull: false
  })
  category: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL
  })
  price: number;
}

