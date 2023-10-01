import { Glasses } from "lucide-react";
import data from "./data.json";
import { Section } from "./components/Section";
import { Header } from './components/Header'

function App() {
  return (
    <main className="relative min-h-screen dark:bg-gray-950 dark:text-gray-100">
      <div className="container mx-auto py-8">
        <Header />
        <div className="flex justify-center items-center mx-8 gap-8">
          <h1 className="scroll-m-20 text-4xl font-bold lg:text-5xl tracking-tighter">
            Awesome Neovim
          </h1>
          <Glasses className="inline w-10 h-10 lg:w-14 lg:h-14" />
        </div>
        {data.sections.children.map((s) => (
          <Section {...s} key={s.title} />
        ))}
      </div>
    </main>
  );
}

export default App;
