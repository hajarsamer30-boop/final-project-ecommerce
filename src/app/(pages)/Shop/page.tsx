import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Products from "./Products/Products";
import { Loading } from "@/components/ui/Loading";
import Text from "@/components/ui/Text";

export default function ShopPage() {
  return (
    <main>
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              <Text id="home" />
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-4 text-muted-foreground rtl:rotate-180" />
          </li>
          <li aria-current="page" className="font-semibold text-primary">
            <Text id="shop" />
          </li>
        </ol>
      </nav>
      <Suspense fallback={<Loading />}>
        <Products />
      </Suspense>
    </main>
  );
}
