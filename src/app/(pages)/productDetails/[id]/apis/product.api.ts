import { ProductInterface } from "@/interfaces/products/product.interfaces";

export type singleProductRes = {
  data:ProductInterface
}

export async function getSingleProduct(productId:string): Promise<singleProductRes> {
  try {
    const response = await fetch(`${process.env.PUBLIC_API}/products/${productId}`);

    if (!response.ok) throw new Error("faild to fetch" + response.statusText);

    return response.json();
  } catch (error) {
    throw error;
  }
}
