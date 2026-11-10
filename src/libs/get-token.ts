import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFun() {
  const cookieStore = await cookies();

  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const sessionToken = cookieStore.get(cookieName)?.value;
  if (!sessionToken) throw new Error("unauthorized");

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET is missing");

  const decoded = await decode({ secret, token: sessionToken });
  if (!decoded?.token) throw new Error("unauthorized");

  return decoded.token;
}