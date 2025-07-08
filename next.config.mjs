import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";

/** Initialize next-intl plugin */
const withNextIntl = createNextIntlPlugin();

/** Your base Next.js config */
const baseConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/en/packages/:path*",
        destination: "/en/bestellen/:path*",
      },
      {
        source: "/en/packages",
        destination: "/en/bestellen",
      },
    ];
  },

  // Add other config here if needed
};

/** Compose the plugins */
const combinedConfig = withNextIntl(
  withPayload(baseConfig, {
    devBundleServerPackages: false,
  })
);

export default combinedConfig;
