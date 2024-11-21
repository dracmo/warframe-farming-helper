import mongoose, { Schema, Document } from "mongoose";

interface IUserData extends Document {
  userId: string;
  checkedCells: { [key: string]: boolean };
}

const UserDataSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  checkedCells: { type: Map, of: Boolean, default: {} },
});

export default mongoose.models.UserData ||
  mongoose.model<IUserData>("UserData", UserDataSchema);
