const qs = require('querystring');
const {parse} = require('url');

const {send} = require('micro');
const djb2 = require('djb2');

module.exports = async (req, res) => {
  if (req.url === '/favicon.ico') return null;

  const url = parse(req.url);
  const query = qs.parse(url.query)
  const name = query.name;

  if (!name) {
    return send(res, 400, {error: "'name' query parameter required."});
  }

  send(res, 200, {loyalty: djb2(name) % (process.env.SHAPER || 100000)});
};
