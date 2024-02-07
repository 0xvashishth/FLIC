import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      <div className="prose mt-8 mb-8 m-auto">{children}</div>
      <Footer />
    </div>
  );
}
