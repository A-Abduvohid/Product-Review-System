import { UUIDV4 } from 'sequelize';
import { Column, DataType, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript';
import { User } from 'src/entities/index.entity';

interface IOtp {
    id: string;
    user_id: string;
    otp: string;
}

@Table({ tableName: 'otps' })
export class Otp extends Model<Otp, IOtp> {
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
        unique: true,
        type: DataType.STRING(6)
    })
    otp: string
}
