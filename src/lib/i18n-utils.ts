import { TFunction } from "i18next";

/**
 * Custom translation helper that parses keys with parameters.
 * Format: "namespace:key#param1#param2"
 * Mapping in JSON handles {{count}}, {{number}}, {{minutes}}, {{time}} based on index or specific common labels.
 */
export function translate(t: TFunction, key: string): string {
    if (!key || !key.includes(":")) return key;

    const [fullKey, ...params] = key.split("#");

    if (params.length === 0) {
        return t(fullKey as any);
    }

    const options: Record<string, string | number> = {};

    // Heuristic-based parameter mapping
    // We'll map the first param to the most likely variable name based on the key
    if (fullKey.includes("count") || fullKey.includes("pallets") || fullKey.includes("cartons")) {
        options.count = params[0];
    } else if (fullKey.includes("number") || fullKey.includes("truck") || fullKey.includes("ramp")) {
        options.number = params[0];
    } else if (fullKey.includes("minutes") || fullKey.includes("savesTime")) {
        options.minutes = params[0];
    } else if (fullKey.includes("time") || fullKey.includes("opTime")) {
        options.time = params[0];
    } else {
        // Fallback: use generic indices if known, or just pass first as value
        options.value = params[0];
        // Also pass specific common ones just in case
        options.count = params[0];
        options.number = params[0];
        options.minutes = params[0];
    }

    return t(fullKey as any, options);
}
