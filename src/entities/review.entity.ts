import { UUIDV4 } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product, User } from 'src/entities/index.entity';

interface IReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  content: string;
  status: string;
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, IReview> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  product_id: string;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  rating: number;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  content: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM('approved', 'pending', 'rejected'),
    defaultValue: 'pending',
  })
  status: string;
}
