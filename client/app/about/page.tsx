import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="z-10">
    <div className="hero pt-3 bg-base-100">
  <div className="hero-content text-center">
    <div className="max-w-xl">
      <h1 className="text-4xl font-bold">🚀 About Us</h1>
      <p className="py-8 text-justify">👉🏻 At Flic, we are passionate about simplifying your online experience. Whether you're looking to shorten URLs for ease of sharing, create serverless forms without the hassle of hosting servers, or integrate dynamic chat support seamlessly, we've got you covered! 🎉</p>
    </div>
  </div>
  
</div>
<div className="hero pt-3 bg-base-100">
  <div className="hero-content text-center">
    <div className="max-w-xl">
      <h1 className="text-4xl font-bold">🎉 Why Choose Flic?</h1>
      <ul className="py-8 text-justify">
        <li>👉🏻 We are committed to pushing the boundaries of what's possible online. Expect cutting-edge solutions that make your digital experience not only efficient but enjoyable.</li>
        <li>👉🏻 Flic is designed with you in mind. Our platform is intuitive, ensuring that whether you're a seasoned professional or a newcomer, you can navigate and utilize our features effortlessly.</li>
        <li>👉🏻 Your data's security is our priority. Trust Flic to provide a secure environment for all your URL shortening, form creation, and chat support needs.</li>
        <li>👉🏻 Take control with our all-in-one dashboard. Monitor your short URLs, manage serverless forms, and engage with your audience through chat – all from a centralized, user-friendly interface.</li>
      </ul>
    </div>
  </div>
  
</div>

</div>
      <Footer />
    </main>
  );
}
