import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

function toCamelCase(str) {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

function typescriptPlugin() {
    return typescript({
        typescript: require("typescript"),
        tsconfig: "./tsconfig.dist.json",
        clean: true
    });
}

export default function rollupConfig(pkg) {
    var input = "src/index.ts";
    var external = [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ];
    return [
        {
            input,
            output: [
                {
                    file: "dist/" + pkg.name + ".min.js",
                    format: "umd",
                    name: toCamelCase(pkg.name),
                    esModule: false
                }
            ],
            external,
            plugins: [
                typescriptPlugin(),
                terser()
            ],
        },
        {
            input,
            output: [
                {
                    file: pkg.main,
                    format: "cjs",
                },
                {
                    file: pkg.module,
                    format: "esm",
                },
            ],
            external,
            plugins: [typescriptPlugin()],
        }
    ];
}
