import { FsDirOptions } from "@tauri-apps/api/fs"
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

const delay = 1000

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
    tokenSaveStatus: "na",
  })
  expect(spyStoreInsert).toBeCalledTimes(0)
  expect(spyStrongholdSave).toBeCalledTimes(0)

  storage.cancelStoreSubscription()
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
  await new Promise((r) => setTimeout(r, delay))

  expect(spyStoreGet).toBeCalledTimes(1)
  expect(spyStoreInsert).toHaveBeenLastCalledWith(expect.anything(), "newToken")
  expect(SettingsStore.getRawState()).toEqual({
    isStorageReady: true,
    token: "newToken",
    tokenSaveStatus: "success",
  })
  expect(spyStrongholdSave).toBeCalled()

  storage.cancelStoreSubscription()
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
  await new Promise((r) => setTimeout(r, delay))

  expect(spyStoreGet).toBeCalledTimes(1)
  expect(spyStoreInsert).toBeCalledTimes(0)
  expect(SettingsStore.getRawState()).toEqual({
    isStorageReady: true,
    token: "initialToken3",
    tokenSaveStatus: "success",
  })
  expect(spyStrongholdSave).toBeCalledTimes(0)

  storage.cancelStoreSubscription()
})

test("Failed saving triggers store change", async () => {
  const spyStoreGet = jest.spyOn(Store.prototype, "get").mockResolvedValue("initialToken3")
  const spyStoreInsert = jest.spyOn(Store.prototype, "insert").mockReturnValue(Promise.resolve())
  const spyStrongholdSave = jest.spyOn(Stronghold.prototype, "save").mockImplementation(() => {
    throw new Error("")
  })

  const storage = new StrongholdStorage()
  await storage.initialize()

  SettingsStore.update((s) => {
    s.token = "initialToken4"
  })

  // we need to wait until all async calls are done, but there is nothing to listen to that we can access
  await new Promise((r) => setTimeout(r, delay))

  expect(spyStoreGet).toBeCalledTimes(1)
  expect(spyStoreInsert).toBeCalledTimes(1)
  expect(SettingsStore.getRawState()).toEqual({
    isStorageReady: true,
    token: "initialToken4",
    tokenSaveStatus: "error",
  })
  expect(spyStrongholdSave).toBeCalledTimes(1)

  storage.cancelStoreSubscription()
})
