import type { AWS } from "@serverless/typescript";
import functions from "./src/collections/index";

const serverlessConfiguration: AWS = {
  service: "leonardoaitasks",
  frameworkVersion: "3",
  plugins: [
    "serverless-offline",
    "serverless-plugin-typescript",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    region: "ap-southeast-2",
    architecture: "arm64",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS:
        "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via collections
  functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
