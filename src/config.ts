interface NetworkDelays {
  fetchUser: number
  fetchEntries: number
}

interface DevelopmentConfig {
  networkDelays: NetworkDelays
  reactQueryDevTools: boolean
  reduxDevTools: boolean
}

interface Config {
  development: DevelopmentConfig
  storageClass: "LocalStorage" | "StrongholdStorage"
}

export const config: Config = {
  development: {
    networkDelays: {
      fetchUser: 0,
      fetchEntries: 0,
    },
    reactQueryDevTools: true,
    reduxDevTools: true,
  },
  storageClass: process.env.REACT_APP_VARIANT !== undefined && process.env.REACT_APP_VARIANT === "browser" ? "LocalStorage" : "StrongholdStorage",
}
