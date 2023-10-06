import data from "./data.json";
import { Section } from "./components/Section";
import { Header } from './components/Header'

function App() {
  return (
    <main className="relative min-h-screen dark:bg-gray-950 dark:text-gray-100">
      <div className="container mx-auto py-8">
        <Header />
        <div className="flex justify-center items-center mx-8 gap-4 flex-col">
          <h1
            className="scroll-m-20 text-4xl font-bold lg:text-5xl tracking-tighter bg-clip-text bg-gradient-to-b from-gray-500 to-gray-950 dark:from-gray-50 dark:to-gray-400 text-transparent"
          >
            Awesome Neovim
          </h1>
          <p>
            All data shown on this page was pulled from the
            <a className="underline text-blue-600 dark:text-blue-400" href="https://github.com/rockerBOO/awesome-neovim"> Awesome Neovim </a>
            repository.
          </p>
        </div>
        {data.sections.children.map((s) => (
          <Section {...s} key={s.title} />
        ))}
      </div>
    </main>
  );
}

export default App;
