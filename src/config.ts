interface Config {
  overwriteToday: boolean // for testing one can overwrite the date of today
  overwriteTodayValue: string | null
  storageClass: "LocalStorage" | "StrongholdStorage"
}

export const config: Config = {
  overwriteToday: true,
  overwriteTodayValue: "2022-04-08T00:00:00",
  storageClass: "LocalStorage",
}
