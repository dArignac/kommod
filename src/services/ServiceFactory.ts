import { config } from "../config"
import { LocalStorageFactory } from "./storage/LocalStorageFactory"
import { Storage } from "./storage/StorageFactory"

interface Factory {
  getStorage(): Storage
}

class ConcreteFactory implements Factory {
  getStorage(): Storage {
    switch (config.storageClass) {
      case "LocalStorage":
        return new LocalStorageFactory().getInstance()
      default:
        throw new Error(`Storage is not implemented for ${config.storageClass}`)
    }
  }
}

export class ServiceFactory {
  private static instance: Factory
  private constructor() {}
  public static getInstance(): Factory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ConcreteFactory()
    }
    return ServiceFactory.instance
  }
}
