import TopBadgeLayout from '@/pages/components/TopBadgeLayout';
import fetchPhotos from '@/utils/fetchPhotos';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head'
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';


/*
1. getServerSideProps or getStaticProps를 사용해 데이터 패칭 (전체 데이터)
2. 데이터 컴포넌트 안에서 받기
3. 받은 데이터 필터링 (파생 데이터)
4. 필터링된 데이터렌더링
*/

// export const getServerSideProps = async () => {
export const getStaticProps = async () => {

  const data = await fetchPhotos();

  // 여기서 필터링 받아도 됨

  return {
    props: { data }
  }
}

// function Page({data}:InferGetStaticPropsType<typeof getServerSideProps>) {
function Page({data}:InferGetStaticPropsType<typeof getStaticProps>) {

  // 그러나 클라이언트단에서 필터링해도 됨 (선택)
  // Tanstack query 사용 가능 (데이터 캐싱 or 클라이언트 캐싱)
  console.log(data);


  const router = useRouter();
  const q = (router.query.q as string)?.trim() ?? '';

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector < HTMLInputElement >("#search")!;
    const keyword = input.value.trim();

    // 특정 단어를 입력하면 쿼리 스트링으로 입력이 되어 데이터 패칭이 되어 다음 스탭으로 가지 않나?
    router.push(
      {
        pathname: '/search',
        query: keyword ? { q: keyword } : {}
      })
  }

  // 파생 데이터
  const results = q ? data.filter((p) => p.author.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <>
      <Head>
        <title>Triangle | Search</title>
      </Head>

      <div>
        <form onSubmit={onSubmit} action="" className='border border-gray-600 m-4 p-2 rounded flex justify-center'>
          <label htmlFor="search">
            <input type="search" id="search" className='border border-amber-50 rounded indent-2' />
          </label>
          <button type="submit" className='bg-blue-500 px-2 rounded py-0.5 font-bold ml-2 cursor-pointer'>검색</button>
        </form>
        <div>
          {
            q && (
              <p>
                <b>{q}</b>
                검색 결과 : {results.length}건
              </p>
            )
          }
          <ul className='grid grid-cols-2 gap-4'>
            {
              results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/photos/${p.id}`}
                    aria-label={`${p.id} 페이지로 이동`}
                  >
                    <Image
                    src={p.download_url}
                    alt={p.author}
                    width={400}
                    height={300}
                    style={{ width:'100%',height:'auto' }}
                  />
                  </Link>
                  <span>
                    photo by : {p.author}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default Page



Page.getLayout = (page:React.ReactNode) => {
  // page에 동일하게 연결할 레이아웃 생성
  return <TopBadgeLayout>{page}</TopBadgeLayout>;
}

