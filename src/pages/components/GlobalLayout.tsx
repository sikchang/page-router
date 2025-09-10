import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useRef } from "react";

function GlobalLayout({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    let smoother;

    (async () => {
      if (typeof window === "undefined") return;

      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
        const { ScrollSmoother } = await import("gsap/dist/ScrollSmoother");

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        // DOM이 완전히 로드된 후 실행
        await new Promise(resolve => {
          if(document.readyState === "complete") {
            resolve(true);
          } else {
            window.addEventListener("load", () => resolve(true), { once: true });
          }
        });

      } catch {}
    })();

    return () => {};
  });

  return (
    <>
      <Head>
        <title>Triangle</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="페이지 라우터를 통해 배우는 Next.js"
        />
        <link rel="shortcut icon" href="/vercel.svg" />
      </Head>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
export default GlobalLayout;
