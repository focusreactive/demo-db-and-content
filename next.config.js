const withLinaria = require('next-with-linaria');

/** @type {import('next-with-linaria').LinariaConfig} */
const config = {
  images: {
    domains: ['i.ibb.co', 'cdn.sanity.io'],
  },
  experimental: {
    taint: true,
  },
};

module.exports = withLinaria(config);
