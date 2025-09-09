import { Photo } from '@/@types/type';




export default async function fetchPhotos():Promise<Photo[]> {
  const END_POINT = 'https://picsum.photos/v2/list?page=5&limit=10';

  try {
    const res = await fetch(END_POINT);
    if (!res.ok) {
      throw new Error('...');
    }
    return await res.json();
  } catch {
    console.error("Error");
    return [];
  }
}
