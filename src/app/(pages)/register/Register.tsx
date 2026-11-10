'use client'

import { useForm } from "react-hook-form";
import { registerScheme, regitsreSchemeType } from "./schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "./apis/register.api";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
export default function RegisterForm() {

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<regitsreSchemeType>({
    resolver: zodResolver(registerScheme),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }
  })

  async function handleRegister(data: regitsreSchemeType) {
    setLoading(true)
    try {
      const isSuccess = await signUp(data)
      if (isSuccess) {
        toast.success('Created')
        setTimeout(() => {
          router.push('/login')
        }, 500)
      }
    } catch (error) {
      toast.error('already exist')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex-1 bg-white px-4 py-10 text-slate-700 sm:py-14">
      <section className="mx-auto w-full max-w-[600px]">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
            Create Your Account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Start your fresh journey with us today
          </p>
        </header>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <span aria-hidden="true" className="font-bold text-red-500">G</span>
            Google
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <span
              aria-hidden="true"
              className="flex size-4 items-center justify-center rounded-full bg-green-600 text-[11px] font-bold text-white"
            >
              f
            </span>
            Facebook
          </button>
        </div>

        <div className="my-4 flex items-center gap-3 text-xs text-slate-500">
          <span className="h-px flex-1 bg-slate-200" />
          or
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)} >
          <label className="block text-sm font-medium text-slate-700">
            Name<span className="text-red-500">*</span>
            <input
              type="text"
              autoComplete="off"
              {...register('name')}
              className="mt-2 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
            />
          </label>

          {errors.name && <p className="p-2 rounded-2xl bg-green-300 my-3">{errors.name?.message}</p>}

          <label className="block text-sm font-medium text-slate-700">
            Email<span className="text-red-500">*</span>
            <input
              type="email"
              autoComplete="email"
              {...register('email')}
              className="mt-2 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
            />
          </label>
            {errors.email && <p className="p-2 rounded-2xl bg-green-300 my-3">{errors.email?.message}</p>}

          <label className="block text-sm font-medium text-slate-700">
            Password<span className="text-red-500">*</span>
            <input
              type="password"
              {...register('password')}
              autoComplete="off"


              className="mt-2 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
            />

            {errors.password && <p className="p-2 rounded-2xl bg-green-300 my-3">{errors.password?.message}</p>}

            <span className="mt-2 flex items-center justify-between text-[11px] font-normal text-slate-500">
              <span>Must be at least 8 characters with numbers and symbols</span>
              <span>Weak</span>
            </span>
            <span aria-hidden="true" className="mt-1 block h-0.5 w-full bg-slate-200" />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Confirm Password<span className="text-red-500">*</span>
            <input
              type="password"
              {...register('rePassword')}
              autoComplete="off"


              className="mt-2 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
            />
            {errors.rePassword && <p className="p-2 rounded-2xl bg-green-300 my-3">{errors.rePassword?.message}</p>}
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Phone Number<span className="text-red-500">*</span>
            <input
              type="tel"
              {...register('phone')}
              autoComplete="off"

              className="mt-2 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
            />
          </label>

          {errors.phone && <p className="p-2 rounded-2xl bg-green-300 my-3">{errors.phone?.message}</p>}

          <button

            type="submit"
            className="h-11 w-full rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            {loading ? 'loading...' : "Create Account"}
          </button>
        </form>
      </section>
    </main>
  );
}
