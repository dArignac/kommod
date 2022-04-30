import { FsDirOptions } from "@tauri-apps/api/fs"
import { Settings } from "../../components/Settings"
import { SettingsStore } from "../../store"
import { Store, Stronghold } from "./stronghold-plugin"
import { StrongholdStorage } from "./StrongholdStorage"

jest.mock("@tauri-apps/api/path", () => {
  const orginalModule = jest.requireActual("@tauri-apps/api/path")
  return {
    ...orginalModule,
    dataDir: () => "/tmp/datadir/",
  }
})

jest.mock("@tauri-apps/api/fs", () => {
  const orginalModule = jest.requireActual("@tauri-apps/api/fs")
  return {
    ...orginalModule,
    createDir: (dir: string, options?: FsDirOptions) => jest.fn(() => Promise.resolve()),
  }
})

// FIXME if any of the test is the only test here, everything is fine
// FIXME if they run together the assumptions are wrong - why? some state issue?
// FIXME store is not isolated between tests

test("Initializes correctly", async () => {
  const spyStoreGet = jest.spyOn(Store.prototype, "get").mockResolvedValue("initialToken1")
  const spyStoreInsert = jest.spyOn(Store.prototype, "insert")
  const spyStrongholdSave = jest.spyOn(Stronghold.prototype, "save")

  const storage = new StrongholdStorage()
  await storage.initialize()

  expect(spyStoreGet).toBeCalledTimes(1)
  expect(SettingsStore.getRawState()).toEqual({
    isStorageReady: true,
    token: "initialToken1",
  })
  expect(spyStoreInsert).toBeCalledTimes(0)
  expect(spyStrongholdSave).toBeCalledTimes(0)
})

test("Changed token gets stored to storage", async () => {
  const spyStoreGet = jest.spyOn(Store.prototype, "get").mockResolvedValue("initialToken2")
  const spyStoreInsert = jest.spyOn(Store.prototype, "insert").mockReturnValue(Promise.resolve())
  const spyStrongholdSave = jest.spyOn(Stronghold.prototype, "save").mockReturnValue(Promise.resolve())

  const storage = new StrongholdStorage()
  await storage.initialize()

  SettingsStore.update((s) => {
    s.token = "newToken"
  })

  // we need to wait until all async calls are done, but there is nothing to listen to that we can access
  await new Promise((r) => setTimeout(r, 2000))

  expect(spyStoreGet).toBeCalledTimes(1)
  expect(spyStoreInsert).toHaveBeenLastCalledWith(expect.anything(), "newToken")
  expect(SettingsStore.getRawState()).toEqual({
    isStorageReady: true,
    token: "newToken",
  })
  expect(spyStrongholdSave).toBeCalled()
})

test("Changed token with same value as before does not get stored to storage", async () => {
  const spyStoreGet = jest.spyOn(Store.prototype, "get").mockResolvedValue("initialToken3")
  const spyStoreInsert = jest.spyOn(Store.prototype, "insert").mockReturnValue(Promise.resolve())
  const spyStrongholdSave = jest.spyOn(Stronghold.prototype, "save").mockReturnValue(Promise.resolve())

  const storage = new StrongholdStorage()
  await storage.initialize()

  SettingsStore.update((s) => {
    s.token = "initialToken3"
  })

  // we need to wait until all async calls are done, but there is nothing to listen to that we can access
  await new Promise((r) => setTimeout(r, 2000))

  expect(spyStoreGet).toBeCalledTimes(1)
  expect(spyStoreInsert).toBeCalledTimes(0)
  expect(SettingsStore.getRawState()).toEqual({
    isStorageReady: true,
    token: "initialToken3",
  })
  expect(spyStrongholdSave).toBeCalledTimes(0)
})
