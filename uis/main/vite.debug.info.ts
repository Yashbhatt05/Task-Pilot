import { PluginOption } from "vite";
let root = "";
export const viteDebugInfo = (): PluginOption => ({
    name: "react-click-to-component",
    apply: "serve",
    configResolved(config) {
        root = config.root;
    },
    transform(code, id) {
        if (!id.includes("jsx-dev-runtime.js")) return;
        if (code.includes("_source")) return;
        const defineIndex = code.indexOf('"_debugInfo"');
        if (defineIndex === -1) return;
        const valueIndex = code.indexOf("value: null", defineIndex);
        if (valueIndex === -1) return;
        return (
            code.slice(0, valueIndex) + "value: source" + code.slice(valueIndex + 11)
        );
    },
});
export default viteDebugInfo;