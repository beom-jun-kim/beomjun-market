"use client";

import type { NextPage } from "next";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import Layout from "@/app/components/layout";
import { useForm } from "react-hook-form";
import { use, useEffect } from "react";
import useUser from "@/app/libs/client/useUser";
import useMutation from "@/app/libs/client/useMutation";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/me`);
  const onValid = ({ email, phone, name }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });
    }
    editProfile({ email, phone, name });
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          propRegister={register("name")}
          propRequired={false}
          propLabel="Name"
          propName="name"
          propType="text"
        />
        <Input
          propRegister={register("email")}
          propRequired={false}
          propLabel="Email address"
          propName="email"
          propType="email"
        />
        <Input
          propRegister={register("phone")}
          propRequired={false}
          propLabel="Phone number"
          propName="phone"
          propType="text"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? "loading..." : "변경하기"} />
      </form>
    </Layout>
  );
};

export default EditProfile;

// 1. model 리팩토링
// 2. useUser로 보호
// 3. next-auth 기능