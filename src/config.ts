interface NetworkDelays {
  fetchUser: number
  fetchEntries: number
}

interface DevelopmentConfig {
  networkDelays: NetworkDelays
  overwriteToday: boolean // for testing one can overwrite the date of today
  overwriteTodayValue: string | null
  reactQueryDevTools: boolean
  reduxDevTools: boolean
}

interface Config {
  development: DevelopmentConfig
  storageClass: "LocalStorage" | "StrongholdStorage"
}

export const config: Config = {
  // FIXME remove this once we can set a day in UI
  development: {
    networkDelays: {
      fetchUser: 0,
      fetchEntries: 0,
    },
    overwriteToday: true,
    overwriteTodayValue: "2022-04-08T00:00:00",
    reactQueryDevTools: true,
    reduxDevTools: true,
  },
  storageClass: "LocalStorage",
}
