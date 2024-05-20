import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
}

export interface IUserModel extends Model<IUser> {
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser | null>;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true }
});

userSchema.statics.getAllUsers = function (): Promise<IUser[]> {
  return this.find();
};

userSchema.statics.getUserById = function (id: string): Promise<IUser | null> {
  return this.findById(id);
};

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;
