//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  images: {
    domains: ['i.pinimg.com', 'tailwindui.com','purr.objects-us-east-1.dream.io'],
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};
module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/v1/:path*',
          destination: 'https://monorepo-server-8qby.onrender.com/:path*',
        },
      ]
    },
};

module.exports = withNx(nextConfig);
