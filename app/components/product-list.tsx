import useSWR from "swr";
import { ProductWithCount } from "@/app/page";
import Item from "@/app/components/item";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface productListResponse {
  [key: string]: Record[];
}

export default function ProductList({kind}: ProductListProps) {
  const { data } = useSWR<productListResponse>(`/api/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record: any) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  ) : null;
}
