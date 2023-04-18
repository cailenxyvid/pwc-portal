import { writable } from "svelte/store";
import type { Profile } from "./myTypes";

export const myProfile = writable<Profile>();