'use client' // Error boundaries must be Client Components

import Text from '@/components/ui/Text'

export default function GlobalError({
  error,
  retry,
}: {
  error: Error
  retry: () => void
}) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-background px-4 text-center text-foreground">
      <h1 className="text-2xl font-bold"><Text id="somethingWentWrong" /></h1>
      <p className="max-w-xl text-muted-foreground">{error.message}</p>
      <button
        className="min-h-11 rounded-xl bg-primary px-5 py-2 font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        onClick={() => retry()}
      >
        <Text id="retry" />
      </button>
    </main>
  )
}
