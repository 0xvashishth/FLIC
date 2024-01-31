import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

export default function Home() {
  
  return (
    <main >
      <div className="min-h-screen flex flex-col">
      <NavBar />
            <div className="flex-grow"><HomePage /></div>
            <Footer />
          </div>
      
    </main>
  );
}
