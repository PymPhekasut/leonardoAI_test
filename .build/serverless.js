"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./src/collections/index");
var serverlessConfiguration = {
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
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
        },
    },
    // import the function via collections
    functions: index_1.default,
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
//# sourceMappingURL=serverless.js.map