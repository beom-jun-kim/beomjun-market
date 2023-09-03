interface ButtonProp {
  text: string;
}

export default function Button({text}:ButtonProp) {
  return (
    <button className="bg-blue-500 p-3 text-white rounded-md">{text}</button>
  );
}
