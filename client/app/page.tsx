import NavBar from "./components/NavBar";
import {opun_black, opun_light, opun_medium} from "./assets/fonts/FontMaster"

export default function Home() {
  return (
    <main className={`${opun_medium.variable} font-opun-medium`}>
      <NavBar />
    </main>
  );
}
