import { getRandomPhotos } from "@/utils/getRandomPhotos";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const getStaticProps = async () => {
  // export const getServerSideProps = async () => {

  const data = await getRandomPhotos();

  return {
    props: { data },
    revalidate: 10, // production
  };
};

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // export default function Home({data}:InferGetServerSidePropsType<typeof getServerSideProps>) {

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let ctx: { revert(): void } | undefined;

    (async () => {
      if (typeof window === "undefined") return;

      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(".photo-item");

        items.forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
              // markers:true
            },
          });
        });
      }, listRef);

      return () => ctx?.revert();
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Triangle | Home</title>
      </Head>
      <div className="pb-10">
        <h1 className="text-center p-10">
          <strong className="text-3xl">Triangle에서</strong>
          <span className="block">다양한 작가들의</span>
          <span>사진들을 만나보세요</span>
        </h1>
        <ul ref={listRef} className="flex flex-col gap-20 p-3 items-center">
          {data.map((url, i) => (
            <li key={url + i} className="photo-item">
              <Image src={url} alt={""} width={400} height={300} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
