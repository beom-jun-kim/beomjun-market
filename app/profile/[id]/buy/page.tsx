import type { NextPage } from "next";
import RootLayout from "@/app/layout";
import ProductList from "@/app/components/product-list";

const Bought: NextPage = () => {
  return (
    <RootLayout title="구매내역" canGoBack session>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="purchases" />
      </div>
    </RootLayout>
  );
};

export default Bought;
