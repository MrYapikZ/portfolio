import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yapi.expiproject.com";

  // Jika nanti kamu punya halaman project dinamis, kamu bisa fetch datanya di sini
  // const projectUrls = PROJECTS_DATA.map((p) => ({
  //   url: `${baseUrl}/projects/${p.slug}`,
  //   lastModified: new Date(),
  // }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Tambahkan halaman lain jika ada, misalnya:
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}