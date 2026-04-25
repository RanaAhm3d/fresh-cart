import { getProductReviews } from "@/actions/reviews.action";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewDialog from "@/components/reviews/ReviewDialog";
import Box from "@/components/shared/icons/Box";
import RatingsBreakdown from "@/components/shared/RatingsBreakdowm/RatingsBreakdown";
import RatingStars from "@/components/shared/RatingStars/RatingStars";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/interfaces/product.interface";
import { Review } from "@/interfaces/reviews.interface";
import { FaShieldAlt, FaTruck } from "react-icons/fa";
import { FaArrowRotateLeft, FaCheck, FaPlus, FaStar } from "react-icons/fa6";
export default async function NavsTabs({ product }: { product: Product }) {
  const { data: reviews }: { data: Review[] } = await getProductReviews(
    product?._id,
  );
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Tabs
          defaultValue="details"
          className="bg-white rounded-lg shadow-sm overflow-hidden py-4"
        >
          <TabsList
            variant="line"
            className="overflow-x-auto overflow-y-hidden flex-nowrap justify-start w-full scrollbar-hide  *:px-2 *:py-2 *:data-[state=active]:text-primary-600 *:data-[state=active]:after:bg-primary-600 *:data-[state=active]:bg-black *:hover:text-primary-600 "
          >
            <TabsTrigger value="details">
              <Box />
              Product Details
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <FaStar className="mb-0" />
              Reviews ({product?.ratingsQuantity})
            </TabsTrigger>
            <TabsTrigger value="shipping">
              <FaTruck className="mb-0.5" />
              Shipping & Returns
            </TabsTrigger>
          </TabsList>
          <div className="p-6">
            <TabsContent value="details">
              <div className="space-y-6">
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    About this Product
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Material Polyester Blend Colour Name Multicolour Department
                    Women
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Product Information
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Category</span>
                        <span className="text-gray-900 font-medium">
                          {product?.category?.name}
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Subcategory</span>
                        <span className="text-gray-900 font-medium">
                          {product?.subcategory[0]?.name}
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Brand</span>
                        <span className="text-gray-900 font-medium">
                          {product?.brand?.name}
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Items Sold</span>
                        <span className="text-gray-900 font-medium">
                          {product?.sold} sold
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-600">
                        <FaCheck className="text-primary-600 mr-2" />
                        Premium Quality Product
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <FaCheck className="text-primary-600 mr-2" />
                        100% Authentic Guarantee
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <FaCheck className="text-primary-600 mr-2" />
                        Fast &amp; Secure Packaging
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <FaCheck className="text-primary-600 mr-2" />
                        Quality Tested
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 md:col-span-1 sticky top-87.5">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col items-center gap-2 w-full text-center">
                      <span className="text-5xl font-bold text-gray-900 ">
                        {product?.ratingsAverage}
                      </span>
                      <RatingStars rating={product?.ratingsAverage} />
                      <span className="text-sm text-gray-500 ">
                        Based on {product?.ratingsQuantity} reviews
                      </span>
                    </div>
                    <RatingsBreakdown reviews={reviews} />
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 md:col-span-2 overflow-y-auto max-h-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="flex flex-row items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Customer Reviews
                      </h3>
                      <span className="text-sm text-gray-500">
                        ({reviews?.length} reviews)
                      </span>
                    </div>
                    <ReviewDialog
                      productId={product?._id}
                      text={
                        <button
                          className="flex items-center justify-between gap-2 bg-linear-to-br from-primary-600 to-primary-500 rounded-full size-7 text-sm text-white "
                          title="Add Review"
                        >
                          <FaPlus className="text-xl ms-1" />
                        </button>
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    {reviews?.map((review) => (
                      <ReviewCard key={review?._id} review={review} />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-linear-to-br from-primary-50 to-primary-100 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-primary-600 text-white rounded-full flex items-center justify-center">
                        <FaTruck className="text-2xl" />
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        Shipping Information
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <FaCheck className="text-primary-600 mt-0.5" />
                        <span>Free shipping on orders over $50</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <FaCheck className="text-primary-600 mt-0.5" />
                        <span>Standard delivery: 3-5 business days</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <FaCheck className="text-primary-600 mt-0.5" />
                        <span>
                          Express delivery available (1-2 business days)
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <FaCheck className="text-primary-600 mt-0.5" />
                        <span>Track your order in real-time</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
                        <FaArrowRotateLeft className="text-2xl" />
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        Returns &amp; Refunds
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <FaCheck className="text-primary-600 mt-0.5" />
                        <span>30-day hassle-free returns</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <FaCheck className="text-primary-600 mt-0.5" />
                        <span>Full refund or exchange available</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <FaCheck className="text-primary-600 mt-0.5" />
                        <span>Free return shipping on defective items</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <FaCheck className="text-primary-600 mt-0.5" />
                        <span>Easy online return process</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
                  <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
                    <FaShieldAlt className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Buyer Protection Guarantee
                    </h4>
                    <p className="text-sm text-gray-600">
                      Get a full refund if your order doesn&apos;t arrive or
                      isn&apos;t as described. We ensure your shopping
                      experience is safe and secure.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
