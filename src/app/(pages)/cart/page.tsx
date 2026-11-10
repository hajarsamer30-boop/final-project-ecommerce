import { Suspense } from "react";
import { Loading } from "@/components/ui/Loading";
import CartCom from "./CartCom";

export default function CartPage() {

  return (
    <Suspense fallback={<Loading />}>
      <CartCom />
    </Suspense>
  );
}
