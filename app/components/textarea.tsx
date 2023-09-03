import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  propLabel?: string;
  propName?: string;
  propRegister: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({
  propLabel,
  propName,
  propRegister,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {propLabel ? (
        <label
          htmlFor={propName}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {propLabel}
        </label>
      ) : null}
      <textarea
        id={propName}
        {...propRegister}
        className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
        rows={4}
        {...rest}
      />
    </div>
  );
}
