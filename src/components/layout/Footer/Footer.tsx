import Link from "next/link";
import Text from "@/components/ui/Text";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card text-card-foreground transition-colors duration-300">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-primary">
          fresh<span className="text-emerald-500">Cart</span>
        </Link>
        <p className="text-sm text-muted-foreground">
          <Text id="footerDescription" />
        </p>
      </div>
    </footer>
  );
}
