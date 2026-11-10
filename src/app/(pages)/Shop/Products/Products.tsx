import { getProducts } from "./api/product.api"
import ProductItem from "./ProductItem"


export default async function Products() {

  const data = await getProducts()

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-7 lg:px-8 xl:grid-cols-5">
      {data.data.map((prod, index) => (
        <ProductItem key={prod._id} prod={prod} index={index} />
      ))}
    </div>
  );
}
