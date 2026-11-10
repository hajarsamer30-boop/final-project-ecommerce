'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginScheme, loginSchemeType } from "./scheme/login.scheme";
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import {toast} from 'react-toastify'
export default function LoginForm() {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<loginSchemeType>({
        resolver: zodResolver(loginScheme),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    async function handleLogin(data: loginSchemeType) {
        const res = await signIn('credentials', {
            ...data,
            redirect: false,
            callbackUrl: '/'
        })
        if(res?.ok){
            toast.success('successful login')
             router.push('/')
        }else{
             toast.error('incorrect email or password')
        }
    }

    return (
        <main className="mx-auto w-full max-w-md flex-1 px-4 py-12 sm:px-6">
            <h1 className="mb-6 text-3xl font-bold text-foreground">Login</h1>
            <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
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
                    /></label>

                {errors.password && <p className="p-2 rounded-2xl bg-green-300 my-3">{errors.password?.message}</p>}
                <button
                    type="submit"
                    className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground"
                >
                    Login
                </button>
            </form>
        </main>
    );
}


// till remove 5-10 mb
// 1024kb = 1mb
// sesstion till close tab
//cookies 4kb  server , browser
//browser====> server  cookies [] exprie date

//