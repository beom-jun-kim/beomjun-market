import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;

// 일반적으로 Prisma Client는 모듈이나 함수 등이 실행될 때마다 새로운 인스턴스가 생성. 그러나 이는 성능에 영향을 미침. 
// 특히 개발 환경에서 빈번하게 코드를 수정하고 테스트하는 경우에 더욱 그렇다.
// 따라서 개발 환경에서는 기본적으로 Prisma Client 인스턴스를 한 번 생성한 다음, 이를 재사용하도록하는 것이 좋다. 
// 이렇게하면 코드를 실행할 때마다 Prisma Client를 생성하지 않고 기존 인스턴스를 사용하여 성능을 향상
// 반면에, production 환경에서는 일반적으로 Prisma Client를 단일 인스턴스로 사용하는 것이 아니라, 
// 여러 인스턴스를 사용하여 확장성을 보장하는 것이 일반적. 
// 따라서 production 환경에서는 Prisma Client를 전역 변수로 할당하는 것이 아니라, 
// 각 인스턴스에 새로운 Prisma Client 인스턴스를 생성하는 것이 좋다.
// 따라서, development 환경에서만 Prisma Client를 전역 변수로 할당하는 것은 성능을 개선하는 방법. 
// 하지만 production 환경에서는 이 방식을 사용하지 않는 것이 좋다.