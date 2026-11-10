"use client";

import { useForm } from "react-hook-form";
import { chechoutPayment } from "./actions/checkout.actions";

export type shippingAddressType = {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
};

export default function ChecktCom({cartId}:{cartId:string}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<shippingAddressType>();

  const onSubmit = async (data: shippingAddressType) => {
    try {
        
        const payload = await  chechoutPayment( cartId, data  )
       
        if(payload.status=="success")
        {  window.location.href=payload.session.url}
    } catch (error) {
          console.log(error);
          
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-lg space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h1 className="text-xl font-semibold text-slate-900">Checkout details</h1>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-slate-700">
          Address details
        </label>
        <input
          id="details"
          autoComplete="street-address"
          {...register("shippingAddress.details", { required: "Please enter your address details." })}
          className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
        />
        {errors.shippingAddress?.details && (
          <p className="mt-1 text-sm text-red-600">{errors.shippingAddress.details.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register("shippingAddress.phone", { required: "Please enter your phone number." })}
          className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
        />
        {errors.shippingAddress?.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.shippingAddress.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-slate-700">
          City
        </label>
        <input
          id="city"
          autoComplete="address-level2"
          {...register("shippingAddress.city", { required: "Please enter your city." })}
          className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
        />
        {errors.shippingAddress?.city && (
          <p className="mt-1 text-sm text-red-600">{errors.shippingAddress.city.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="h-10 w-full rounded-md bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
      >
        Continue
      </button>
    </form>
  );
}
