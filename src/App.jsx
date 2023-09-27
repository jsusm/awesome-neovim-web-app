import { Glasses} from 'lucide-react'
import { Repo } from './components/Repo'

function App() {
  return (
    <main className="container mx-auto py-8">
      <div className="flex items-center mx-8">
        <h1 className="scroll-m-20 text-4xl font-bold lg:text-5xl">
          Awesome Neovim
        </h1>
        <Glasses className="inline mx-6 w-10 h-10 lg:w-14 lg:h-14" />
      </div>
      <section className="my-9">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4 text-center">
          Lsp
        </h3>
        <ul className="mx-4 space-y-2">
          <Repo
            url="https://github.com/lewis6991/pckr.nvim"
            full_name="lewis6991/pckr.nvim"
            description="Spiritual successor of `wbthomason/packer.nvim`."
            updated_at='2023-09-22T11:17:23Z'
            stars={126}
          />
          <Repo
            url="https://github.com/lewis6991/pckr.nvim"
            full_name="lewis6991/pckr.nvim"
            description="Spiritual successor of `wbthomason/packer.nvim`."
            updated_at='2023-09-22T11:17:23Z'
            archived={true}
            stars={126}
          />
        </ul>
      </section>
    </main>
  )
}

export default App
