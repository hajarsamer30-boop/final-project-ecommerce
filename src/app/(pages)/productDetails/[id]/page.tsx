import { Loading } from "@/components/ui/Loading";
import { Suspense } from "react";
import ProductDetails from "./ProductDetails";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default  function page({ params }: PageProps) {

  return (
    <div>
     <Suspense fallback={<Loading></Loading>}>
        <ProductDetails  params={params} />
     </Suspense>
    </div>
  );
}
