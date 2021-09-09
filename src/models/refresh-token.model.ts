import * as mongoose from 'mongoose';

export const refreshTokenSchema = new mongoose.Schema({
    user_id: String,
    is_revoked: Boolean,
    expried: Date
})

export interface RefreshToken {
    _id: string;
    user_id: string,
    is_revoked: boolean,
    expried: Date
}