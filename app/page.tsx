import Navbar from "./components/layout/Navbar"
import Hero from "./components/features/home/Hero";

export default function Home() {
  return (
    <div className="mx-4 lg:mx-10">
      <Navbar/>
      <main>
      <Hero/>
      </main>
    </div>
  );
}
