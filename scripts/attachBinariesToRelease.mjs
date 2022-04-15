import { context, getOctokit } from "@actions/github"
import * as fs from "fs"
import { globby } from "globby"
import * as path from "path"

async function updateRelease() {
  if (process.env.GITHUB_TOKEN === undefined) {
    throw new Error("GITHUB_TOKEN is not set")
  }

  const options = { owner: context.repo.owner, repo: context.repo.repo }
  const github = getOctokit(process.env.GITHUB_TOKEN)

  const { data: tags } = await github.rest.repos.listTags({
    ...options,
    per_page: 10,
    page: 1,
  })

  const tag = tags.find((t) => t.name.startsWith("v"))
  console.log(`Handling release ${tag.name}`)

  const { data: release } = await github.rest.repos.getReleaseByTag({
    ...options,
    tag: tag.name,
  })

  async function uploadAsset(releaseId, name, data) {
    await github.rest.repos.uploadReleaseAsset({
      ...options,
      release_id: releaseId,
      name,
      data,
    })
  }

  // FIXME differentiate in which os we are to select the correct path
  // FIXME add windows
  const assets = [
    "src-tauri/target/release/bundle/appimage/*_amd64.AppImage",
    "src-tauri/target/release/bundle/deb/*_amd64.deb",
    "src-tauri/target/release/bundle/macos/*.app",
    "src-tauri/target/release/bundle/dmg/*_x64.dmg",
  ]

  for (const asset of assets) {
    const file = await globby([asset])
    await uploadAsset(release.id, path.basename(file[0]), fs.readFileSync(file[0]))
  }
}

await updateRelease()
