import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import Text from "@/components/ui/Text";
import SliderSerCom from "@/SliderSerCom";

export default function Home() {
  return (

    <main className="  flex-1 items-center bg-background text-foreground transition-colors duration-300">
      <SliderSerCom/>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Leaf aria-hidden="true" className="size-4" />
            <Text id="heroEyebrow" />
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <Text id="heroTitle" />
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            <Text id="heroDescription" />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/Shop"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Text id="shopNow" />
              <ArrowUpRight aria-hidden="true" className="size-4 rtl:rotate-[-90deg]" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-6 py-3 font-semibold text-card-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Text id="exploreCategories" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-64 w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100 p-6 dark:from-emerald-950 dark:via-green-950 dark:to-lime-950 sm:min-h-80 sm:p-10">
          <div aria-hidden="true" className="absolute -right-10 -top-16 size-48 rounded-full bg-white/50 blur-2xl dark:bg-emerald-400/10" />
          <div aria-hidden="true" className="absolute -bottom-16 -left-10 size-48 rounded-full bg-emerald-300/40 blur-2xl dark:bg-lime-400/10" />
          <div className="relative w-full max-w-sm rounded-2xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-emerald-950/10 backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-8">
            <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Leaf aria-hidden="true" className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
              <Text id="freshEveryDay" />
            </h2>
            <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
              <Text id="freshEveryDayDescription" />
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
