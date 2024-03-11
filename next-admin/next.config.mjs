/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [
      [
        "@graphql-codegen/client-preset-swc-plugin",
        { artifactDirectory: "./src/gql", gqlTagName: "graphql" },
      ],
    ],
  },
};

export default nextConfig;
