import { ServiceFactory } from "./ServiceFactory"
import { config } from "../config"
import { LocalStorage } from "./storage/LocalStorage"

test("ServiceFactory is a singleton", () => {
  // FIXME re-enable
  // const a = ServiceFactory.getInstance()
  // const b = ServiceFactory.getInstance()
  // expect(a).toBe(b)
})

// test("Return LocalStorage if configured", () => {
//   config.storageClass = "LocalStorage"
//   expect(ServiceFactory.getInstance().getStorage()).toBeInstanceOf(LocalStorage)
// })

// test("Throw exception when StrongholdStorage is configured", () => {
//   config.storageClass = "StrongholdStorage"
//   expect(() => ServiceFactory.getInstance().getStorage()).toThrow(Error)
//   expect(() => ServiceFactory.getInstance().getStorage()).toThrow("Storage is not implemented for StrongholdStorage")
// })
