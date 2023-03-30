import { createEffect, createEvent, createStore, sample } from "effector";
import { UserService } from "./api";
import { IUser } from "./types";

export const $users = createStore<IUser[]>([]);
export const pageOpened = createEvent();
export const addUser = createEvent<IUser>();

export const getUsersFx = createEffect(async () => {
  return UserService.getUsers();
});

export const postNewUserFx = createEffect(async (user: IUser) => {
  return UserService.postUser(user);
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
  source: $users,
  fn: (state: IUser[], newUser: IUser) => {
    return [...state, newUser];
  },
  target: $users,
});
