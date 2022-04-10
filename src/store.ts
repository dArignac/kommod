import { registerInDevtools, Store } from "pullstate"
import { config } from "./config"
import { Project, User } from "./types"

interface ProjectStoreInterface {
  projects: Project[]
}

export const ProjectStore = new Store<ProjectStoreInterface>({
  projects: [],
})

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
  registerInDevtools({ ProjectStore, UserStore })
}
