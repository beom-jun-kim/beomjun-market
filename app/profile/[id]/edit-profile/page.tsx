"use client";

import type { NextPage } from "next";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import RootLayout from "@/app/layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useUser from "@/app/libs/client/useUser";
import useMutation from "@/app/libs/client/useMutation";
import Image from "next/image";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  formErrors?: string;
  avatar?: FileList;
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
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${user?.avatar}/avatar`
      );
  }, [user, setValue]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/me`);
  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });
    }

    // ========================== CF
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();

      // formData : Ajax로 form 전송을 가능하게 해주는 FormData 객체를 생성
      // 페이지 전환 없이 폼 데이터를 전송
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      editProfile({ email, phone, name, avatarId: id });
    } else {
      editProfile({ email, phone, name });
    }
  };

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  // ========================== CF
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];

      // URL.createObjectURL(object) : 주어진 객체를 가리키는 URL을 DOMString반환
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <RootLayout canGoBack title="Edit Profile" session>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <Image
              width={48}
              height={48}
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-500"
              alt="My Profile Image"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register("avatar")}
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
    </RootLayout>
  );
};

export default EditProfile;

// 1. model 리팩토링
// 2. useUser로 보호
// 3. next-auth 기능
