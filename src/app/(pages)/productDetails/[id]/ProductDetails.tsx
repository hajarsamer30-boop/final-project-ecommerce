import { getSingleProduct } from './apis/product.api'
import { Star } from 'lucide-react';
import { calculateRating } from './../../../../libs/calculate-rate';
import { Button } from '@base-ui/react';
import ImgCom from '../ImgCom';
import RelatedProducts from '@/components/RelatedProduct/RelatedProducts';
import { Suspense } from 'react';
import { Loading } from '@/components/ui/Loading';
import Text from '@/components/ui/Text';
import ProductButtonCom from '@/components/ProductButtonCom';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetails({ params }: PageProps) {
  const { id } = await params;
  const res = await getSingleProduct(id)

  return (
    <>
      <div className='container mx-auto grid grid-cols-1 items-center gap-8 py-8 text-foreground md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]'>
        <div className="w-full min-w-0">
          <ImgCom res={res} />
        </div>
        <div className="w-full min-w-0">
          <h2 className='my-2 text-2xl font-bold sm:text-3xl'>{res.data.title}</h2>
          <div
            className="flex items-center gap-1 text-amber-500"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                className={`size-5 ${index < calculateRating(res.data.ratingsAverage) ? 'fill-current' : 'fill-none text-muted-foreground/40'}`}
              />
            ))}
            <span className="sr-only">
              <Text id="ratingOutOfFive" values={{ rating: res.data.ratingsAverage.toFixed(1) }} />
            </span>
            <span aria-hidden="true" className="ms-1 text-sm font-medium text-muted-foreground">
              {res.data.ratingsAverage.toFixed(1)}
            </span>
          </div>
          <p className="my-4 leading-7 text-muted-foreground">{res.data.description}</p>
          <p className='text-muted-foreground'><Text id="quantity" /></p>
          <div className='my-2 flex items-center gap-2'>
            <Button className="rounded-md border border-border bg-transparent px-3 py-1 text-foreground">+</Button>
            <span>{res.data.quantity}</span>
            <Button className="rounded-md border border-border bg-transparent px-3 py-1 text-foreground">-</Button>
          </div>
          <div className="my-3 flex items-center justify-between border-t border-border py-3">
            <span><Text id="totalPrice" /></span>
            <span>{res.data.price} EGP</span>
          </div>
          <div className="my-3 flex flex-col gap-3 sm:flex-row">

            {/* add to cart */}
             <ProductButtonCom prodId={res.data._id}  isProductItem={false}></ProductButtonCom>

            <Button className="min-h-12 flex-1 rounded-xl bg-secondary p-3 text-secondary-foreground transition-colors hover:bg-accent"><Text id="buyNow" /></Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-3 px-3">
        <h3 className='my-3 text-xl font-bold text-foreground'><Text id="relatedProducts" /></h3>
      </div>
      <Suspense fallback={<Loading></Loading>}>
        <RelatedProducts catId={res.data.category._id} ></RelatedProducts>
      </Suspense>
    </>

  )
}
