// Send the old Pages hostname to the real domain so only https://kiddo.school is indexed.
// Preview deployments (<hash>.kiddo-school.pages.dev) are left alone.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'kiddo-school.pages.dev' && (context.request.method === 'GET' || context.request.method === 'HEAD')) {
    url.hostname = 'kiddo.school';
    url.protocol = 'https:';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
