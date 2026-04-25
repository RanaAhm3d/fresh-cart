import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import ProductSwiper from "./ProductsSwiper";
import { Product } from "@/interfaces/product.interface";
import { getProducts } from "@/actions/product.action";

export default async function SimilarProducts({
  categoryId,
}: {
  categoryId: string;
}) {
  const { data: similarProducts }: { data: Product[] } = await getProducts({
    category: categoryId,
  });
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeader title="You May Also " subTitle="Like" />
        <ProductSwiper products={similarProducts} />
      </div>
    </section>
  );
}
