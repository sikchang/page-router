import { User } from '@/@types/type';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

// ƒ /photos -> getServerSideProps -> Page
// getServerSideProps는 서버사이드에서만 실행됨
// 따라서 클라이언트에서는 접근 불가
// dynamic한 페이지를 만들 때 사용
// 매 요청마다 서버사이드에서 실행됨
// 빌드 시점에 실행되지 않음
export const getServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  // 안찍히는 이유 ?
  // 서버에서만 실행되기 때문에 클라이언트에서는 찍히지 않음
  console.log("data", data);
  return {
    props: {
      data
    },
  };
}
// InferGetServerSidePropsType 제네릭에 getServerSideProps를 넣어주면 props 타입을 추론해줌
// data: User[] 타입이 됨
// getServerSideProps에서 반환하는 props의 타입을 자동으로 추론해줌
// 따라서 props의 타입을 일일이 지정해줄 필요가 없음
// getServerSideProps에서 반환하는 props의 타입이 변경되면 자동으로 반영됨
// 즉, 유지보수가 쉬워짐
function Page({data}:InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
      <Head>
        <title>Triangle | Photos</title>
      </Head>
      <h1>Photos Page</h1>
      <ul>
        {data.map((u: User) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </>
  );
}
export default Page
