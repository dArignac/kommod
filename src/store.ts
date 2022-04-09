import { Store, registerInDevtools } from "pullstate"
import { config } from "./config"

type User = {
  email: string
  id: number
}

interface UserStoreInterface {
  user: User
}

export const UserStore = new Store<UserStoreInterface>({
  user: {
    email: "",
    id: 0,
  },
})

if (config.development.reduxDevTools) {
  registerInDevtools({ UserStore })
}
