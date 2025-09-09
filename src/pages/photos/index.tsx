import fetchPhotos from '@/utils/fetchPhotos';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// export const getServerSideProps = async () => {
//   const data = await fetchPhotos();
//   return {
//     props: {
//       data
//     },
//   };
// }

export const getStaticProps = async () => {
  const data = await fetchPhotos();
  return {
    props: {
      data
    },
  };
}

// function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
function Page({ data }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <title>Triangle | Photos</title>
      </Head>
      <h1>Photos Page</h1>
      <ul className="grid grid-cols-2 gap-4 p-4">
        {data.map(({ id, author, download_url, width }) => (
          <li key={id} className="mb-4">
            <Link href={`/photos/${id}`}>
              <Image
                src={download_url}
                alt={`Photo by ${author}`}
                width={300}
                height={200}
                priority={width > 4000} // 4000 이상인 경우 우선 로드
                //  'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.
                style={{
                  width: "auto",
                  height: "100%",
                }}
              />
            </Link>
            <span className="block w-10/12 overflow-hidden text-ellipsis whitespace-nowrap">
              작가 : {author}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Page
