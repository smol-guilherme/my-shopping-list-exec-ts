import { TItemData } from "../../src/types/ItemsTypes";

export function newItem(): TItemData {
  return {
    title: "Tomato Sauce",
    url: "https://www.google.com/tomatosauce.jpg",
    description: "A juicy sauce made from the rippest tomatoes",
    amount: 1,
  };
}
