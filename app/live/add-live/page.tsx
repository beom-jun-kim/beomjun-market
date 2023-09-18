import type { NextPage } from "next";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import RootLayout from "@/app/layout";
import TextArea from "@/app/components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@/app/libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Stream } from "@prisma/client";

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { loading, data }] =
    useMutation<CreateResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<CreateForm>();
  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/live/${data.stream.id}`);
    }
  }, [data, router]);
  return (
    <RootLayout canGoBack title="라이브" session>
      <form onSubmit={handleSubmit(onValid)} className=" space-y-4 py-10 px-4">
        <Input
          propRegister={register("name", { required: true })}
          propRequired
          propLabel="Name"
          propName="name"
          propType="text"
        />
        <Input
          propRegister={register("price", {
            required: true,
            valueAsNumber: true, /* 입력한 input을 숫자로 반환 */
          })}
          propRequired
          propLabel="Price"
          propName="price"
          propType="text"
          kind="price"
        />
        <TextArea
          propRegister={register("description", { required: true })}
          name="description"
          label="Description"
        />
        <Button text={loading ? "Loading..." : "Go live"} />
      </form>
    </RootLayout>
  );
};

export default Create;
