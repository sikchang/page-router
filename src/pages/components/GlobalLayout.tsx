import Footer from '@/pages/components/Footer';
import Header from '@/pages/components/Header';
import Head from 'next/head';

function GlobalLayout({ children }: { children: React.ReactNode }) {
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
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
export default GlobalLayout
