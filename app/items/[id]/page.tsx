"use client";

import type { NextPage } from "next";
import Button from "@/app/components/button";
import RootLayout from "@/app/layout";
import { Product, User } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR, { mutate, useSWRConfig } from "swr";
import useMutation from "@/app/libs/client/useMutation";
import { cls } from "@/app/libs/client/utils";
import useUser from "@/app/libs/client/useUser";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const { user, isLoading } = useUser();
  const { mutate } = useSWRConfig();
  const params = useParams();

  // useSWR : 데이터 요청해서 가져오고 캐싱 (GET)
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    params.id ? `/api/products/${params.id}` : null
  );

  // useMutation : POST로 활용
  // toggleFav : 백엔드에 요청
  const [toggleFav, { loading }] = useMutation(
    `/api/products/${params.id}/fav`
  );
  const onFavoriteClick = () => {
    if (!loading) {
      // {}: 데이터가 있을 수도 있고 없을 수도 있으니
      toggleFav({});
    }
    boundMutate(
      (prev: any) => prev && { ...prev, isLiked: !prev.isLiked },
      false
    );
  };
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
              <Button text="Talk to seller"></Button>
              <button
                onClick={onFavoriteClick}
                className={cls(
                  "py-3 flex items-center justify-center rounded-md hover:bg-gray-100",
                  data?.isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-gray-500"
                )}
              >
                {data?.isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                ) : (
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
                )}
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
