import NavLinks from "@/components/product/NavLinks/NavLinks";
import ProductInfo from "@/components/product/ProductInfo/ProductInfo";
import ProductSwiper from "@/components/product/ProductSwiper/ProductSwiper";
import SimilarProducts from "@/components/product/SimilarProducts/SimilarProducts";
import NavsTabs from "@/components/product/Tabs/Tabs";
import { Product } from "@/interfaces/product.interface";
import { getSingleProduct } from "@/services/products.service";

interface ProductDetailsProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { productId } = await params;
  const { data: product }: { data: Product } =
    await getSingleProduct(productId);
  return (
    <>
      {/* Nav Link */}
      <NavLinks product={product} />
      <section className="py-6 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/4">
            <ProductSwiper productImages={product?.images} />
          </div>
          {/*Product Info */}
          <div className="lg:w-3/4">
            <ProductInfo product={product} />
          </div>
        </div>
      </section>
      <NavsTabs product={product} />
      <SimilarProducts categoryId={product?.category?._id} />
    </>
  );
}
