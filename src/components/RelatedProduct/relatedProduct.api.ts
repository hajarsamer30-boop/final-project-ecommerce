import { ProductResponse } from "@/interfaces/products/product.interfaces";

export async function getRelatedProducts(
  catId: string,
): Promise<ProductResponse> {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_API}/products?category=${catId}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) throw new Error("faild to fetch" + response.statusText);

    return response.json();
  } catch (error) {
    throw error;
  }
}
