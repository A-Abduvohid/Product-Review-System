import { UUIDV4 } from 'sequelize';
import { Column, DataType, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript';
import { User } from 'src/entities/index.entity';

interface IRefreshToken {
    id: string;
    user_id: string;
    refresh: string;
    time: string;
}

@Table({ tableName: 'refresh_tokens' })
export class RefreshToken extends Model<RefreshToken, IRefreshToken> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: UUIDV4,
        allowNull: false
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    user_id: string;

    @BelongsTo(() => User)
    user: User;

    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    refresh: string;
}
