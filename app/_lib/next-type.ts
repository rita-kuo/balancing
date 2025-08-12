export type PageProps = {
  params: Promise<{ [slug: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
