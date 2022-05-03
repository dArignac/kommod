import { config } from "../config"
import { ServiceFactory } from "./ServiceFactory"
import { LocalStorage } from "./storage/LocalStorage"
import { StrongholdStorage } from "./storage/StrongholdStorage"

test("ServiceFactory is a singleton", () => {
  const a = ServiceFactory.getInstance()
  const b = ServiceFactory.getInstance()
  expect(a).toBe(b)
})

test("Return LocalStorage if configured", () => {
  config.storageClass = "LocalStorage"
  expect(ServiceFactory.getInstance().getStorage()).toBeInstanceOf(LocalStorage)
})

test("Return StrongholdStorage if configured", () => {
  config.storageClass = "StrongholdStorage"
  expect(ServiceFactory.getInstance().getStorage()).toBeInstanceOf(StrongholdStorage)
})
