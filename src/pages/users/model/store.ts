import { createEffect, createEvent, createStore, sample } from "effector";
import { UserService } from "./api";
import { IUser } from "./types";

export const $users = createStore<IUser[]>([]);
export const pageOpened = createEvent();

export const getUsersFx = createEffect(async () => {
  return UserService.getUsers();
});

export const postNewUserFx = createEffect(async (user: IUser) => {
  return UserService.postUser(user);
});

sample({
  clock: pageOpened,
  target: getUsersFx,
});

sample({
  clock: getUsersFx.doneData,
  target: $users,
});
