import { ExpoConfig, ConfigContext } from "@expo/config"

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require("ts-node/register")

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? []

  return {
    ...config,
    plugins: [...existingPlugins, require("./plugins/withSplashScreen").withSplashScreen],
    updates: {
      useEmbeddedUpdate: process.env.EAS_PUBLIC_UPDATE_CHANNEL ? false : true,
      fallbackToCacheTimeout: process.env.EAS_PUBLIC_UPDATE_CHANNEL ? 30000 : 0,
      requestHeaders: process.env.EAS_PUBLIC_UPDATE_CHANNEL
        ? {
            "expo-channel-name": process.env.EAS_PUBLIC_UPDATE_CHANNEL,
          }
        : undefined,
    },
  }
}
