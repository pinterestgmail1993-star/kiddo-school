// Send the old Pages hostname and the www host to the real domain so only https://kiddo.school is indexed.
// www.kiddo.school served 200 without redirect, so Google crawled both hosts and filed every www URL
// under 'Alternate page with proper canonical tag' (141 in GSC as of 2026-10-16). A 301 consolidates
// signals and lets Google drop those entries. Preview deployments (<hash>.kiddo-school.pages.dev)
// are left alone, and non-GET/HEAD methods pass through so API/admin POSTs never break.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const duplicateHost = url.hostname === 'kiddo-school.pages.dev' || url.hostname === 'www.kiddo.school';
  if (duplicateHost && (context.request.method === 'GET' || context.request.method === 'HEAD')) {
    url.hostname = 'kiddo.school';
    url.protocol = 'https:';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
