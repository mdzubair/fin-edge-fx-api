import * as UserRepository from "./users.repository";
import { UserData } from "../../interface/index.interface";
import * as helpers from "../../utils/helpers";
export class UserService {
  async register(data: Partial<UserData>): Promise<UserData> {
    const exists = await UserRepository.findByEmail(data.email!);
    if (exists) throw new Error("Email already exists");
    return await UserRepository.create(data);
  }

// async login(email: string, password: string) {
//     const user = await UserRepository.findByEmail(email);
//     if (!user) throw new Error("User not found");
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) throw new Error("Invalid credentials");
//     const payload = { userId: user._id, email: user.email, userType: user.userType, };
//     const token = helpers.generateAccessToken(payload);
//     const refreshToken = helpers.generateRefreshToken(payload);
//     return { user, token, refreshToken, };
//   }

  async getProfile(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async userVerify(id: string, status:number): Promise<UserData> {
    const user = await UserRepository.findByUpdate(id, status);
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateUser(id: string, data: Partial<UserData>): Promise<UserData | null> {
    return await UserRepository.updateById(id, data);
  }

  async deleteUser(id: string): Promise<UserData | null> {
    return await UserRepository.deleteById(id);
  }

  async getAllUsers(): Promise<UserData[]> {
    return await UserRepository.getAll();
  }

  
  async resetPassword (userId:string, password:string){
    return await UserRepository.resetPassword(userId, password);
  };
  

  async changePassword( userId: string, reqData: { currentPassword: string; newPassword: string }){
    return await UserRepository.changePassword(userId, reqData);
  };


}

export default new UserService();