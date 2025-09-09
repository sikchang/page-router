import { Html, Head, Main, NextScript } from "next/document";

// antialiased : 폰트의 렌더링을 부드럽게 처리 ( 글꼴 가장자리쪽 부드럽게)
export default function Document() {
  return (
    <Html lang="ko-KR">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
