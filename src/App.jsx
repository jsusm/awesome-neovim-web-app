import { Glasses } from 'lucide-react'

function App() {
  return (
    <main className="container mx-auto py-8">
      <header className="flex items-center mx-8">
        <h1 className="scroll-m-20 text-4xl font-bold lg:text-5xl">
          Awesome Neovim
        </h1>
        <Glasses className="inline mx-6 w-10 h-10 lg:w-14 lg:h-14" />
      </header>
    </main>
  )
}

export default App
