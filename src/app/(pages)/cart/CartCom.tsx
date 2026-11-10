"use client";

import { Loading } from "@/components/ui/Loading";
import { CartRes } from "@/interfaces/cart/cart.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import Text from "@/components/ui/Text";
import { updateCountCart } from "./actions/update-cart.action";


type CartProduct = {
  _id?: string;
  id?: string;
  title: string;
  imageCover?: string;
  price: number;
  count: number;
  category?: { name: string };
};

type CartLine = CartProduct & { product?: CartProduct };

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(price);

export default function CartCom() {
  const [quantityByProduct, setQuantityByProduct] = useState<Record<string, number>>({});
  const { data, isLoading, isError, refetch } = useQuery<CartRes>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Could not load cart");
      return response.json();
    },
  });

  const queryClient = useQueryClient()
  const { mutate, isPending, data: updateddata } = useMutation<CartRes, Error, pageProps>({
    mutationFn: updateCountCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })



  type pageProps = {
    productId: string,
    count: number
  }

  // update mutation

  function increase(count: number, productId: string) {
    mutate({ productId, count: count + 1 })
  }

  function decrease(count: number, productId: string) {
    mutate({ productId, count: count - 1 })
  }

  const cart = data?.payload?.data;
  const products = (cart?.products ?? []) as CartLine[];
  const getLineKey = (item: CartLine, index: number) => {
    const product = item.product ?? item;
    return product.id ?? product._id ?? item._id ?? `${product.title}-${index}`;
  };
  const getCount = (item: CartLine, index: number) => quantityByProduct[getLineKey(item, index)] ?? item.count;
  const itemCount = products.reduce((sum, item, index) => sum + getCount(item, index), 0);

  if (!products.length) {
    return (
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingBag aria-hidden="true" className="size-9" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground"><Text id="yourCartIsEmpty" /></h1>
        <p className="mt-3 max-w-md text-muted-foreground"><Text id="cartDescription" /></p>
        <Link href="/Shop" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          <Text id="startShopping" />
          <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
        </Link>
      </section>
    );
  }

  const subtotal = products.reduce((sum, item, index) => sum + item.price * getCount(item, index), 0);


  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6">
        <p className="text-muted-foreground"><Text id="somethingWentWrong" /></p>
        <button onClick={() => void refetch()} className="mt-4 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          <Text id="retry" />
        </button>
      </section>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary"><ShoppingCart aria-hidden="true" className="size-4" /><Text id="cart" /></p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"><Text id="shoppingCart" /></h1>
        </div>
        <p className="text-sm text-muted-foreground"><Text id="cartItemsCount" values={{ count: itemCount }} /></p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <section aria-label="Cart items" className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="hidden grid-cols-[minmax(0,1fr)_120px_120px] gap-4 border-b border-border bg-muted/40 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid">
            <span><Text id="product" /></span><span className="text-center"><Text id="quantity" /></span><span className="text-end"><Text id="totalPrice" /></span>
          </div>
          <ul className="divide-y divide-border">
            {products.map((item, index) => {

              const product = item.product ?? item;
              const lineKey = getLineKey(item, index);
              const count = getCount(item, index);
              return (
                <li key={lineKey} className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_120px_120px] sm:items-center sm:px-6 sm:py-5">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-24">
                      {product.imageCover ? <Image src={product.imageCover} alt={product.title} fill sizes="96px" className="object-cover" /> : <ShoppingBag aria-hidden="true" className="absolute inset-0 m-auto size-7 text-muted-foreground" />}
                    </div>
                    <div className="min-w-0">
                      {product.category?.name && <p className="mb-1 text-xs font-medium text-muted-foreground">{product.category.name}</p>}
                      <h2 className="line-clamp-2 font-semibold leading-6 text-card-foreground">{product.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{formatPrice(item.price)} <span aria-hidden="true">×</span> {count}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:justify-center" aria-label="Quantity controls">
                    {/* decrease */}
                    <button
                      type="button"
                      aria-label="Decrease quantity"

                      onClick={() => decrease(count, item.product?.id!)}
                      className="flex size-8 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    ><Minus aria-hidden="true" className="size-4" /></button>


                    <span className="min-w-6 text-center text-sm font-semibold text-foreground" aria-live="polite">{isPending ? 'loading...' : count}  </span>

                    {/* increase */}
                    <button


                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => { increase(count, product._id!) }}
                      className="flex size-8 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary"
                    ><Plus aria-hidden="true" className="size-4" /></button>
                  </div>
                  <p className="font-semibold text-foreground sm:text-end">{formatPrice(item.price * count)}</p>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border px-4 py-4 sm:px-6">
            <Link href="/Shop" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"><ArrowRight aria-hidden="true" className="size-4 rotate-180 rtl:rotate-0" /><Text id="continueShopping" /></Link>
          </div>
        </section>

        <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-lg font-bold text-card-foreground"><Text id="orderSummary" /></h2>
          <div className="mt-6 space-y-4 border-b border-border pb-5 text-sm">
            <div className="flex justify-between gap-4 text-muted-foreground"><span><Text id="subtotal" /></span><span className="font-medium text-foreground">{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between gap-4 text-muted-foreground"><span><Text id="shipping" /></span><span className="font-medium text-primary"><Text id="calculatedAtCheckout" /></span></div>
          </div>
          <div className="flex justify-between gap-4 pt-5 text-base font-bold text-foreground"><span><Text id="totalPrice" /></span><span>{formatPrice(subtotal)}</span></div>

          <Link href={`/chekout/${cart?._id.toString()}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"><ArrowRight aria-hidden="true" className="size-4 rotate-180 rtl:rotate-0" />Checkout</Link>


          <p className="mt-3 text-center text-xs leading-5 text-muted-foreground"><Text id="checkoutComingSoon" /></p>
        </aside>
      </div>
    </main>
  );
}
