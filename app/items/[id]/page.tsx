"use client";

import { getProductsRoute } from "@/app/api/products/route";
import RootLayout from "@/app/layout";
import { Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
// import useCustomRouter from '@/app/libs/client/useCustomRouter';

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const params = useParams();
  const { data } = useSWR<ItemDetailResponse>(
    params.id ? `/api/products/${params.id}` : null
  );
  return (
    <RootLayout canGoBack session>
      <div className="px-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer items-center space-x-3 py-3 border-t border-b">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-me text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link
                href={`/profile/${data?.product?.user?.id}`}
                className="text-xs font-medium text-gray-700"
              >
                View profile &rarr;
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <p className="text-3xl mt-3 text-gray-900 block">
              {data?.product?.price}
            </p>
            <p className="text-base my-6 text-gray-700">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <button className="flex-1 font-medium hover:bg-blue-600 bg-blue-500 text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Talk to seller
              </button>
              <button className="py-3 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 rounded-md">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-500">Similar items</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href={`/profile/${data?.product?.user?.id}`}>
              {data?.relatedProducts.map((relProd) => (
                <div key={relProd.id}>
                  <div className="h-56 w-full mb-4 bg-slate-500" />
                  <h3 className="text-sm text-gray-700 -mb-1">
                    {relProd.name}
                  </h3>
                  <span className="text-sm font-medium text-gray-600">
                    {relProd.price}
                  </span>
                </div>
              ))}
            </Link>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ItemDetail;
