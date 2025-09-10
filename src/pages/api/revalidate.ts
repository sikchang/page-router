import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  try {
    await res.revalidate("/"); // revalidate 할 경로 지정
    return res.json({
      success: true,
      message: '모든 데이터가 갱신되었습니다! 캐시 반짝반짝',
      timeStamp: new Date().toISOString(),
      path: '/'
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: ' api 요청 실패...ㅠㅠ'
    });
  }
}
