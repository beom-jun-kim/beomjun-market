import type { NextPage } from "next";
import Layout from "@/app/components/layout";
import ProductList from "@/app/components/product-list";

const Loved: NextPage = () => {
  return (
    <Layout title="좋아요" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;
