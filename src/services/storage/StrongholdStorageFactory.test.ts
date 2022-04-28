import { StrongholdStorage } from "./StrongholdStorage"
import { StrongholdStorageFactory } from "./StrongholdStorageFactory"

test("Return StrongholdStorageFactory instance", () => {
  expect(new StrongholdStorageFactory().getInstance()).toBeInstanceOf(StrongholdStorage)
})
