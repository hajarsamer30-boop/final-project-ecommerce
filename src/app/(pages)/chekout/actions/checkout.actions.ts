'use server'

import { getTokenFun } from "@/libs/get-token";
import { shippingAddressType } from "../ChecoutCom";

export async function chechoutPayment(
  cartId: string,
  shippingAddress: shippingAddressType,
) {
  const token = await getTokenFun();

  if (!token) throw new Error("unauthorized");

  const data = await fetch(
    `${process.env.PUBLIC_API}/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "post",
      body: JSON.stringify(shippingAddress),
      headers: {
        "content-type": "application/json",
        token,
      },
    },
  );


if (!data.ok) throw new Error(`checkout failed: ${data.status}`);

const paylaod = await data.json()

  return paylaod;
}
