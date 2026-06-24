import UserModel from "../users/user.schema";

export const findByEmail = async (email: string)=> {
    return await UserModel.findOne({ email }).select("+password");
}
