"use client";

import { Loading } from "@/components/ui/Loading";
import { useQuery } from "@tanstack/react-query";
import { Package, ReceiptText } from "lucide-react";
import { orders } from "./actions/orders.actions";

type OrderProduct = {
    _id?: string;
    title?: string;
    imageCover?: string;
    count?: number;
    price?: number;
    product?: {
        _id?: string;
        title?: string;
        imageCover?: string;
        count?: number;
        price?: number;
    };
};

type Order = {
    _id?: string;
    id?: string;
    createdAt?: string;
    totalOrderPrice?: number;
    paymentMethodType?: string;
    isPaid?: boolean;
    isDelivered?: boolean;
    cartItems?: OrderProduct[];
};

const formatPrice = (price = 0) =>
    new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 0,
    }).format(price);

export default function OrdersCom({ uId }: { uId: string }) {
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ["orders", uId],
        queryFn: () => orders(uId),
        enabled: !!uId,
    });

    if (isLoading) return <Loading />;

    if (isError) {
        return (
            <section className="mx-auto max-w-4xl px-4 py-16 text-center">
                <p className="text-slate-600">We couldn&apos;t load your orders.</p>
                <button
                    onClick={() => void refetch()}
                    className="mt-4 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                    Try again
                </button>
            </section>
        );
    }

    const response = data as Order[] | { data?: Order[] } | undefined;
    const orderList = Array.isArray(response) ? response : response?.data ?? [];

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
            <div className="mb-7">
                <h1 className="text-2xl font-bold text-slate-900">My orders</h1>
                <p className="mt-1 text-sm text-slate-600">View your recent purchases and order status.</p>
            </div>

            {orderList.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                    <Package className="mx-auto size-10 text-slate-400" aria-hidden="true" />
                    <h2 className="mt-3 font-semibold text-slate-900">No orders yet</h2>
                    <p className="mt-1 text-sm text-slate-600">Your orders will appear here after checkout.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orderList.map((order, index) => {
                        const orderId = order._id ?? order.id ?? `order-${index}`;
                        const items = order.cartItems ?? [];

                        return (
                            <article key={orderId} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Order #{orderId.slice(-8)}</p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleDateString("en-EG", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                                : "Date unavailable"}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-xs font-medium">
                                        <span className={`rounded-full px-3 py-1 ${order.isPaid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                                            {order.isPaid ? "Paid" : "Payment pending"}
                                        </span>
                                        <span className={`rounded-full px-3 py-1 ${order.isDelivered ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                                            {order.isDelivered ? "Delivered" : "Processing"}
                                        </span>
                                    </div>
                                </div>

                                <div className="divide-y divide-slate-100 px-5">
                                    {items.length ? items.map((line, itemIndex) => {
                                        const product = line.product ?? line;
                                        return (
                                            <div key={product._id ?? line._id ?? itemIndex} className="flex items-center justify-between gap-4 py-3 text-sm">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    {product.imageCover ? (
                                                        <img
                                                            src={product.imageCover}
                                                            alt={product.title ?? "Order product"}
                                                            className="size-14 shrink-0 rounded-lg border border-slate-200 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                                                            <Package className="size-5" aria-hidden="true" />
                                                        </div>
                                                    )}
                                                    <span className="truncate text-slate-700">
                                                        {product.title ?? "Item"} <span className="text-slate-500">× {product.count ?? line.count ?? 1}</span>
                                                    </span>
                                                </div>
                                                <span className="shrink-0 font-medium text-slate-900">{formatPrice(product.price ?? line.price)}</span>
                                            </div>
                                        );
                                    }) : (
                                        <p className="py-4 text-sm text-slate-500">Order items unavailable.</p>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 px-5 py-4">
                                    <span className="inline-flex items-center gap-2 text-sm text-slate-600">
                                        <ReceiptText className="size-4" aria-hidden="true" />
                                        {order.paymentMethodType ?? "Payment method unavailable"}
                                    </span>
                                    <p className="text-sm font-semibold text-slate-900">Total: {formatPrice(order.totalOrderPrice)}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
