export type AnyConfig = Record<string, any>;

// Reduce a JsxEmailConfig to only stable, intention‑revealing fields for snapshots.
// This avoids brittle diffs from logger internals and function identities.
export function sanitizeConfig(config: AnyConfig): AnyConfig {
  if (!config) return config;

  const plugins = Array.isArray(config.plugins)
    ? config.plugins.map((p: AnyConfig) => ({ name: p?.name, symbol: p?.symbol }))
    : [];

  return {
    logLevel: config.logLevel,
    render: config.render,
    plugins,
    symbol: config.symbol
  };
}
