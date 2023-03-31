import { axiosInstance } from "@/axiosInstance";
import { IUser } from "./types";

export class UserService {
  static request = async (promise: any) => {
    try {
      const res = await promise;
      console.log(res);

      return res.data.items;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
  static getUsers = async () => {
    return this.request(axiosInstance.get("contacts/records"));
  };
  static getUserById = async (id: string) => {
    return this.request(axiosInstance.get(`contacts/records/${id}`));
  };
  static postUser = async (payload: IUser) => {
    return this.request(axiosInstance.post("contacts/records", payload));
  };
  static deleteUserById = async (id: number) => {
    return this.request(axiosInstance.delete(`contacts/records/${id}`));
  };
}
