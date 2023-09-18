import type { NextPage } from "next";
import RootLayout from "@/app/layout";
import ProductList from "@/app/components/product-list";

const Sold: NextPage = () => {
  return (
    <RootLayout title="판매내역" canGoBack session>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="sales" />
      </div>
    </RootLayout>
  );
};

export default Sold;
