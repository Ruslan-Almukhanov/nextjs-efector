import { createEffect, createEvent, createStore, sample } from "effector";
import { UserService } from "./api";
import { IUser } from "./types";

export const $users = createStore<IUser[]>([]);
export const $user = createStore<IUser>({
  id: "",
  name: "",
  email: "",
  phone: "",
});
export const pageOpened = createEvent();
export const addUser = createEvent<IUser>();
export const deleteUser = createEvent<number>();
export const getUserById = createEvent<string>();

export const getUsersFx = createEffect(async () => {
  return UserService.getUsers();
});

export const postNewUserFx = createEffect(async (user: IUser) => {
  return UserService.postUser(user);
});

export const deleteUserFx = createEffect(async (id: number) => {
  await UserService.deleteUserById(id);
  return id;
});

export const getUserByIdFx = createEffect((id: string) => {
  return UserService.getUserById(id);
});

// Get Users
sample({
  clock: pageOpened,
  target: getUsersFx,
});

sample({
  clock: getUsersFx.doneData,
  target: $users,
});

// Add User
sample({
  clock: addUser,
  target: postNewUserFx,
});

sample({
  clock: postNewUserFx.doneData,
  // source: $users,
  // fn: (state: IUser[], newUser: IUser) => {
  //   return [...state, newUser];
  // },
  target: getUsersFx,
});

// Delete user
sample({
  clock: deleteUser,
  target: deleteUserFx,
});

sample({
  clock: deleteUserFx.doneData,
  // source: $users,
  // fn: (state, deletedUser: number) => {
  //   console.log({ deletedUser });
  //   return state.filter((user: IUser) => user.id !== deletedUser);
  // },
  target: getUsersFx,
});

//Get user by id
sample({
  clock: getUserById,
  target: getUserByIdFx,
});
sample({
  clock: getUserByIdFx.doneData,
  target: $user,
});
