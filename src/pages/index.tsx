import { getRandomPhotos } from '@/utils/getRandomPhotos';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

export const getStaticProps = async () => {
// export const getServerSideProps = async () => {

  const data = await getRandomPhotos();

  return {
    props: { data },
    // SSR: 매 요청마다 페이지를 생성
    // ISR: 빌드 시에 페이지를 생성 + 요청이 들어올 때마다 페이지를 생성 (재생성)
    revalidate: 10, // 10초마다 재생성 (ISR)
  }
}

export default function Home({data}:InferGetStaticPropsType<typeof getStaticProps>) {
// export default function Home({data}:InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Triangle | Home</title>
      </Head>
      <div>
        <h1 className='text-center p-10'>
          <strong className='text-3xl'>Triangle에서</strong>
          <span className='block'>다양한 작가들의</span>
          <span>사진을 감상해보세요!</span>
        </h1>
        <ul className='flex flex-col gap-20 p-3 items-center'>
          {
            // list rendering
            data.map((url,i) => (
              <li key={url+i}>
                <Image
                  src={url}
                  alt="Random Image"
                  width={400}
                  height={300}
                />
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}
