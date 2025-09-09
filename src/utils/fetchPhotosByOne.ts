import { Photo } from '@/@types/type';



async function fetchPhotosByOne(id: string):Promise<Photo | null> {
  const END_POINT = `https://picsum.photos/id/${id}/info`;

  try {
    const res = await fetch(END_POINT);
    if (!res.ok) throw new Error('...');
    return await res.json();
  } catch {
    throw new Error("error");
    return null;
  }
}

export default fetchPhotosByOne;
