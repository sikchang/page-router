
export const getRandomPhotos = async () => {

  const promises = Array.from({ length: 10 }).map(() =>
    fetch('https://picsum.photos/400/300').then(res => res.url)
  )

  const urls = await Promise.all(promises);

  return urls;
}
