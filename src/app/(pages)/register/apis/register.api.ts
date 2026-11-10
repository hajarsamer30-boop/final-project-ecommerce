"server action";

import { regitsreSchemeType } from "../schema/register.schema";
export async function signUp(data: regitsreSchemeType) {
  try {
    const payload = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!payload.ok) throw new Error("faild " + payload.statusText);

    return payload.ok;
  } catch (error) {
    throw error;
  }
}
