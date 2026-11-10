import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getTokenFun() {
  const cookie = await cookies();

  const node = process.env.NODE_ENV=='production' ?'__Secure-next-auth.session-token':"next-auth.session-token"

  const token = cookie.get(node)?.value;

  if (!token) throw new Error("unauthorized");

  const decodedTokn = await decode({
      secret: process.env.NEXTAUTH_SECRET!,
      token: token,
  });

  return decodedTokn?.token;
}
