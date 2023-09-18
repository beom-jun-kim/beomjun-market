import type { NextPage } from "next";
import RootLayout from "@/app/layout";
import ProductList from "@/app/components/product-list";

const Loved: NextPage = () => {
  return (
    <RootLayout title="좋아요" canGoBack session>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="favs" />
      </div>
    </RootLayout>
  );
};

export default Loved;
