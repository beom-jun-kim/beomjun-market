import type { NextPage } from "next";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import RootLayout from "../layout";
import TextArea from "@/app/components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@/app/libs/client/useMutation";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import Image from "next/image";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  photo: FileList;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");
  const onValid = async ({ name, price, description }: UploadProductForm) => {
    if (loading) return;
    if (photo && photo.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", photo[0], name);
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
      uploadProduct({ name, price, description, photoId: id });
    } else {
      uploadProduct({ name, price, description });
    }
  };
  useEffect(() => {
    if (data?.ok) {
      router.replace(`/products/${data.product.id}`);
    }
  }, [data, router]);
  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);
  return (
    <RootLayout canGoBack title="Upload Product" session>
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div className="relative pb-80">
          {photoPreview ? (
            <Image
              src={photoPreview}
              className="w-full text-gray-600  h-46 rounded-md object-cover"
              fill
              alt="photoPreview"
            />
          ) : (
            <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                {...register("photo")}
                accept="image/*"
                className="hidden"
                type="file"
              />
            </label>
          )}
        </div>
        <Input
          propRegister={register("name", { required: true })}
          propRequired
          propLabel="Name"
          propName="name"
          propType="text"
        />
        <Input
          propRegister={register("price", { required: true })}
          propRequired
          propLabel="Price"
          propName="price"
          propType="text"
          kind="price"
        />
        <TextArea
          propRegister={register("description", { required: true })}
          propName="description"
          propLabel="Description"
          propRequired
        />
        <Button text={loading ? "Loading..." : "Upload item"} />
      </form>
    </RootLayout>
  );
};

export default Upload;
