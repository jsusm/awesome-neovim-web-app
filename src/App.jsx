import { Glasses, Star, HeartCrack } from 'lucide-react'
import { formatDistance } from 'date-fns'

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

function Repo(props) {
  return (
    <li>
      <a
        className="px-4 py-2 rounded-md border border-transparent group hover:border-gray-300 transition-all block hover:bg-gradient-to-b hover:from-gray-100"
        href={props.url}
        target='_blank'
      >
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-x-4 flex-wrap grow">
            <p className="text-base font-semibold transition-all lg:text-lg group-hover:text-blue-600">
              {props.full_name}
            </p>
            <p className="text-sm">
              {props.description}
            </p>
          </div>
          <div className="flex gap-x-4 gap-y-1 flex-wrap flex-col items-end md:justify-end md:flex-row md:items-center">
            {props.archived && (
              <p className="font-medium text-red-600 flex items-center gap-1 text-xs sm:text-sm">
                Archived
                <HeartCrack size="18" className="inline" />
              </p>
            )}
            <p className="font-medium whitespace-nowrap text-xs sm:text-sm">
              {formatDistance(new Date(props.updated_at), new Date())} ago.
            </p>
            <p className="flex items-center gap-1 font-medium text-xs sm:text-sm">
              {props.stars}
              <Star size="18" className="inline" />
            </p>
          </div>
        </div>
      </a>
    </li>
  )
}

export default App
