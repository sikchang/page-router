import fetchPhotosByOne from '@/utils/fetchPhotosByOne';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router'

/*
[id] : dynamic route parameter
[...id] : catch-all segment (모든 경로를 다 받음)
[[...id]] : optional catch-all segment (경로가 없어도 됨)
*/

// 이것도 서버패칭이 일어나는 함수 아래 함수가 n번째 함수를 가져와야한다
// 서버측 코드이기 때문에 터미널 확인해야한다.
// GetServerSidePropsContext 타입 임포트로 query 값 가져오기
// export const getServerSideProps = async ({query}:GetServerSidePropsContext) => {

//   const { id } = query;
//   const data = await fetchPhotosByOne(id as string);
//   return {
//     props: {
//       data
//     }
//   }
// }

export const getStaticPaths = async () => {
  // const paths = [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }];
  // return { paths, fallback: false }; // false면 없는 페이지는 404
  return {
    paths: [
      { params: { id: "40" } },
      { params: { id: "41" } },
      { params: { id: "42" } },
    ],
    // blocking or true면 없는 페이지도 요청시 서버에서 생성
    fallback: true,
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {

  const { id } = params!;
  const data = await fetchPhotosByOne(id as string);
  return {
    props: { data },
  };
};

// function Page({data}:InferGetServerSidePropsType<typeof getServerSideProps>) {
function Page({data}: InferGetStaticPropsType<typeof getStaticProps>) {

  const router = useRouter();

  if (router.isFallback) return <div>로딩중...</div>;
  if(!data) return <div>데이터가 없습니다.</div>;

  // const query = router.query.id;
  // 아래처럼 쓰면 query가 string | string[] | undefined 타입이 됨
  // const { query: { id: query } } = useRouter();
  // console.log(typeof query) // string | object | undefined
  // console.log(router.query) // { id: ['1', '2', '3'] } if /photos/1/2/3
  // console.log(router.query.id) // ['1', '2', '3'] if /photos/1/2/3

  return (
    <>
      <div className='p-4'>
        <h1>작품 자세히 보기</h1>
        <div>Image id : {data?.id}</div>
        <Image
          src={data?.download_url}
          alt={data?.author}
          width={300}
          height={200}
        />
        <h4>photo by : {data?.author}</h4>
        <p>
          Image URL :{" "}
          <a className="text-amber-300" href={data?.url}>
            {data?.url}
          </a>
        </p>
      </div>
    </>
  );
}
export default Page
