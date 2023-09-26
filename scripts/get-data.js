import fs from 'node:fs'
import path from 'node:path'

const ghTokenFile = fs.readFileSync(
  path.resolve('.', 'scripts/gh-token.secret')
)
const ghToken = new TextDecoder().decode(ghTokenFile)

class TreeNode {
  parent
  children = []
  data = {}

  constructor(parent, data) {
    this.parent = parent
    this.data = data
  }

  toJson() {
    return { ...this.data, children: this.children.map(c => c.toJson()) }
  }
}

const readmeURL = 'https://raw.githubusercontent.com/rockerBOO/awesome-neovim/main/README.md'

async function main() {
  let readmeContent = ''

  process.stdout.write('Fetching readme file... ')
  try {
    const res = await fetch(readmeURL)
    readmeContent = await res.text()
  } catch (error) {
    console.log(error)
    console.info('Cannot get readme content :(')
    return
  }
  process.stdout.write('Done! \n')

  const document = parseDocument(readmeContent)
  const plugins = findNode(document, 'Plugin')
  const repos = getEntries(plugins)
  const repoData = await getRepositoriesInfoByChunk(repos)

  const data = {
      repoData,
      sections: plugins.toJson()
  }
  const filePath = path.resolve('.', 'src/data.json')
  const fileContent = new TextEncoder().encode(
    JSON.stringify(data, null, 2)
  )
  fs.writeFileSync(filePath, fileContent)
  console.log("Data store in src/data.json.")
}

/**
 * @param{string} doc
 */
function parseDocument(doc) {
  const document = new TreeNode(null, { depth: 0 })

  let curNode = document
  const lines = doc.split('\n')

  for (const line of lines) {
    if (line.startsWith('##')) {
      const octothorpCount = line.split(' ').at(0).length
      const title = line.substring(octothorpCount + 1)

      while (curNode.data.depth >= octothorpCount) {
        curNode = curNode.parent
      }
      const newNode = new TreeNode(curNode, { title, depth: octothorpCount, entries: [] })
      curNode.children.push(newNode)
      curNode = newNode
    }
    if (line.startsWith('- ')) {
      const openParenthesis = line.indexOf('(')
      const closeParenthesis = line.indexOf(')')

      let url = line.substring(openParenthesis + 1, closeParenthesis)
      if(url.endsWith('/')){
        url = url.substring(0, url.length - 1)
      }
      const desc = line.substring(closeParenthesis + 4)

      curNode.data.entries.push({ url, desc })
    }
  }
  return document
}

/** Find a node in a tree
  * @param{ TreeNode } tree
  * @param{ string } title
  * @returns { TreeNode }
  */
function findNode(tree, title) {
  if (tree.data.title === title) {
    return tree
  }
  for (const c of tree.children) {
    const result = findNode(c, title)
    if (result) {
      return result
    }
  }
  return undefined
}

function getEntries(tree) {
  const entries = []
  function getNodeEntries(node) {
    if (node.data.entries) {
      entries.push(...node.data.entries)
    }
    node.children.forEach(getNodeEntries)
  }
  getNodeEntries(tree)
  return entries
}

async function getRepoInfo(repo, retries) {
  const repoName = repo.url.substring('https://github.com/'.length)
  try{
    console.log(`Fetching ${repoName}...`)
    const res = await fetch(`https://api.github.com/repos/${repoName}`, {
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${ghToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
      }
    })
    const json = await res.json()
    console.log(`Fetching ${repoName} - ${res.status} - Done!`)
    return {
      desc: repo.desc,
      url: repo.url,
      full_name: json.full_name,
      description: json.description,
      updated_at: json.pushed_at,
      stars: json.stargazers_count,
      language: json.language,
      archived: json.archived,
      notFound: res.status === 404
    }
  }catch(error){
    if(retries <= 1) {
      throw error
    }
    console.log(`Fail to fetch ${repoName}, ${retries} retries left.`)
    return getRepoInfo(repo, retries - 1)
  }
}

/** Fetch repo info from github api
  * @param {string[]} repos
  */
async function getRepositoriesInfoByChunk(repos) {
  const out = []
  for (let i = 0; i < repos.length; i += 5) {
    const repoSet = repos.slice(i, i + 5)
    const results = await Promise.all(repoSet.map(r => getRepoInfo(r, 3)))
    out.push(...results)
  }
  return out
}

main()
