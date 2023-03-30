import { axiosInstance } from "@/axiosInstance";
import { IUser } from "./types";

export class UserService {
  static request = async (promise: any) => {
    try {
      const res = await promise;
      console.log(res);

      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
  static getUsers = async () => {
    return this.request(axiosInstance.get("users"));
  };
  static getUserById = async (id: number) => {
    return this.request(axiosInstance.get(`users/${id}`));
  };
  static postUser = async (payload: IUser) => {
    return this.request(axiosInstance.post("users", payload));
  };
  static deleteUserById = async (id: number) => {
    return this.request(axiosInstance.delete(`users/${id}`));
  };
}
