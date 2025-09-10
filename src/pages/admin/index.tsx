import { useState } from 'react';

// 라우트 핸들러
// /admin
// 캐시 갱신 버튼
// 버튼 클릭 -> /api/revalidate 호출
// /api/revalidate -> getStaticProps 다시 실행

function Page() {

  const [msg, setMsg] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleRevalidate = async () => {

    const res = await fetch('/api/revalidate');
    const data = await res.json();

    setMsg(data.message);
    setTimestamp(data.timeStamp);
  }

  return (
    <div className='p-8'>
      <button
        type="button"
        className='px-4 py-2 bg-blue-500 text-white cursor-pointer rounded'
        onClick={handleRevalidate}>
        ☢캐시 갱신하기
      </button>
      {msg && <p className='mt-4 text-sm'>{msg}</p>}
      {timestamp && <p className='mt-1 text-xs text-gray-500'>마지막 갱신 시각: {new Date(timestamp).toLocaleString()}</p>}
    </div>
  )
}
export default Page
