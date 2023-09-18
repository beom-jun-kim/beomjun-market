import type { NextPage } from "next";
import RootLayout from "@/app/layout";
import Message from "@/app/components/message";
import useSWR from "swr";
import { Stream } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@/app/libs/client/useMutation";
import { useParams } from "next/navigation";
import { userAgent } from "next/server";
import useUser from "@/app/libs/client/useUser";

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessage extends Stream {
  message: StreamMessage[];
}

interface StreamResponse {
  ok: true;
  stream: StreamWithMessage;
}

interface MessageFrom {
  message: string;
}

const Stream: NextPage = () => {
  const params = useParams();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<MessageFrom>();
  const [message, { data: messageData, loading }] = useMutation(
    `/api/streams/${params.id}/messages`
  );
  const { data, mutate } = useSWR<StreamResponse>(
    params.id ? `/api/streams/${params.id}` : null,
    {
      //  최신 데이터를 받고, 밀리초 단위로 리턴
      refreshInterval: 1000,
    }
  );
  const onValid = (valueDate: MessageFrom) => {
    if (loading) return;
    reset();
    mutate(
      (prev: any) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: valueDate.message,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false
    );
    message(valueDate);
  };
  return (
    <RootLayout canGoBack session>
      <div className="py-10 px-4  space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="text-2xl block mt-3 text-gray-900">
            ${data?.stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            {data?.stream.message.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
              />
            ))}
          </div>
          <div className="fixed py-2 bg-white  bottom-0 inset-x-0">
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex relative max-w-md items-center  w-full mx-auto"
            >
              <input
                {...register("message", { required: true })}
                type="text"
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Stream;

// // useRef로 스크롤할 DOM을 선택하고 useEffect와 scrollIntoView로 스크롤합니다
// const scrollRef = useRef<HTMLDivElement>(null);
// useEffect(() => {
// scrollRef?.current?.scrollIntoView();
// });
// ...
// // 메세지들 목록 맨 밑에 빈 div를 만들어 ref를 설정합니다.
// {data?.stream.messages.map...}
// <div ref={scrollRef}/>


// useSWR() 옵션

// refreshInterval
// 기본적으로 비활성화됨 => refreshInterval = 0
// 숫자를 설정하면 밀리초 간격으로 polling합니다.
// 함수로 설정하면 함수는 최신 데이터를 받고, 밀리초 단위로 리턴합니다.
// ex) useSWR('/api/todos', fetcher, { refreshInterval: 1000 })
// https://swr.vercel.app/docs/options#options
// https://swr.vercel.app/ko/docs/options

// Revalidate on Interval
// https://swr.vercel.app/docs/revalidation#revalidate-on-interval

// mutate를 false로 설정해뒀을때 api에러가 나면 어떻게 처리하면 좋을까요? false이기 때문에 UI가 바로 갱신되어서 사용자입장에서는 에러로 느낄 수 없는데 실제로는 에러로 인해 db에 데이터가 생기지 않아서 refresh를 하게되면 문제가 생길것 같은데 이런경우에 어떻게 처리하면 좋을지 궁금합니다.

// @knotehow SWRConfig 옵션에:

// "rollbackOnError: true"를 넣어주세요.

// rollbackOnError 뜻: should the cache rollback if the remote mutation errors.


// 니코샘, refreshInterval을 한번 동작시키면
// 다른 페이지로 이동해도 계속 동작하는 것을 확인했습니다.
// refreshInterval을 해당 페이지에서만 동작 시키고 싶으면
// 어떻게 해야할까요?

// You need to set 'revalidateOnFocus' to false.

// 채팅 입력 방식을 개선할 수 있을까요? 현재는 짧은 시간 내에 여러번 채팅을 입력하면 loading의 상태에 따라 그냥 입력이 안 되게 하는데, 큐 등을 이용해서 loading 중에 입력이 발생하면 입력 큐에 해당 요청을 집어넣고 이전 요청이 처리되면 큐 안의 요청을 처리하는 식으로 구현해보고 싶네요
