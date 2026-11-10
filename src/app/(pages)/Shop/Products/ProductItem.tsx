import { ProductInterface } from "@/interfaces/products/product.interfaces";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import ProductMotion from "./ProductMotion";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/Text";
import ProductButtonCom from "@/components/ProductButtonCom";

export default function ProductItem({
  prod,
  index = 0,
}: {
  prod: ProductInterface;
  index?: number;
}) {
  const hasDiscount =
    typeof prod.priceAfterDiscount === "number" &&
    prod.priceAfterDiscount < prod.price;
  const displayedPrice = hasDiscount ? prod.priceAfterDiscount! : prod.price;
  const discountPercentage = hasDiscount
    ? Math.round(((prod.price - displayedPrice) / prod.price) * 100)
    : 0;
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <ProductMotion index={index}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Link href={`/productDetails/${prod._id}`}>
        <Image
          src={prod.imageCover}
          alt={prod.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
          loading={index < 4 ? "eager" : "lazy"}
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        </Link>
        {hasDiscount && (
          <span className="absolute start-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            -{discountPercentage}%
          </span>


        )}
        <span className="absolute end-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
          {prod.category.name}
        </span>
      </div>

      <div className="p-5">
        <h2 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-card-foreground transition-colors group-hover:text-primary">
          {prod.title}
        </h2>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-amber-500">
          <Star aria-hidden="true" className="size-4 fill-current" />
          <span className="font-semibold text-card-foreground">
            {prod.ratingsAverage.toFixed(1)}
          </span>
          <span className="text-muted-foreground">({prod.ratingsQuantity} <Text id="reviews" />)</span>
        </div>
        <div className="mt-4 flex gap-2 justify-between items-center">
          <span className="text-md font-bold text-primary">
            {formatPrice(displayedPrice)}
          </span>


          {/* add to cart */}
                       <ProductButtonCom  prodId={prod._id}  isProductItem></ProductButtonCom>

          
          {hasDiscount && (
            <span className="pb-0.5 text-sm text-muted-foreground line-through">
              {formatPrice(prod.price)}
            </span>
          )}
        </div>
      </div>
    </ProductMotion>
  );
}

