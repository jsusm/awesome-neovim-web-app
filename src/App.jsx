import { Glasses } from "lucide-react";
import data from "./data.json";
import { Section } from "./components/Section";
import { TableOfContent } from "./components/TOC";
import { Header } from './components/Header'

function App() {
  return (
    <main className="container mx-auto py-8 relative">
      <Header />
      <div className="flex items-center mx-8 gap-8">
        <h1 className="scroll-m-20 text-4xl font-bold lg:text-5xl">
          Awesome Neovim
        </h1>
        <Glasses className="inline w-10 h-10 lg:w-14 lg:h-14" />
      </div>
      <TableOfContent />
      {data.sections.children.map((s) => (
        <Section {...s} key={s.title} />
      ))}
    </main>
  );
}

export default App;
