export function processURL(url: string): string {
  const processedURL = url.split('/login');

  return processedURL[0];
}
