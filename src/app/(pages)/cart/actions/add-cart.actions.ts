"use server";
import { getTokenFun } from "@/libs/get-token";

export async function addToCart(productId: string) {
  const token = await getTokenFun();

  if (!token) throw new Error("unauthorized");

  const data = await fetch(`${process.env.PUBLIC_API_v2}/cart`, {
    method: "post",
    body: JSON.stringify({ productId }),
    headers: {
      "content-type": "application/json",
      token,
    },
  });

  if (!data.ok) throw new Error("unauthorized");

  return data.json();
}
