import { writable } from "svelte/store";
import type { Event, MyEvent } from "./myTypes";

export const myEvents = writable<MyEvent[]>([]);
export const myReplayEvents = writable<MyEvent[]>([]);