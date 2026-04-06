export default function handler(req, res) {
  const { authorization } = req.headers;
  if (authorization) {
    const [, encoded] = authorization.split(' ');
    const decoded = Buffer.from(encoded, 'base64').toString();
    if (decoded === 'storyhub:ensemble') {
      res.setHeader('Set-Cookie', 'sh_auth=1; Path=/; Max-Age=86400; SameSite=Lax');
      res.writeHead(302, { Location: '/' });
      return res.end();
    }
  }
  res.setHeader('WWW-Authenticate', 'Basic realm="StoryHub"');
  res.status(401).send('Unauthorized');
}
