import { config } from "../config"
import { DateService } from "./date/DateService"
import { LocalStorageFactory } from "./storage/LocalStorageFactory"
import { Storage } from "./storage/StorageFactory"
import { TogglService } from "./toggl/TogglService"

interface Factory {
  getDateService(): DateService
  getStorage(): Storage
  getTogglService(): TogglService
}

class ConcreteFactory implements Factory {
  getDateService(): DateService {
    return DateService.getInstance()
  }
  getStorage(): Storage {
    switch (config.storageClass) {
      case "LocalStorage":
        return new LocalStorageFactory().getInstance()
      default:
        throw new Error(`Storage is not implemented for ${config.storageClass}`)
    }
  }

  getTogglService(): TogglService {
    return TogglService.getInstance()
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
