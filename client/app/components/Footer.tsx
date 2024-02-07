"use client";
import React from "react";
import {
  opun_black,
  opun_light,
  opun_medium,
} from "../assets/fonts/FontMaster";
import logo from "../assets/logos/flic-transperent-white.png";
import SwitchLogo from "./clientUtils/SwitchLogo";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <aside>
        <div className="w-40 rounded-full">
          <SwitchLogo />
        </div>
        <p className="my-3">
          All in one Form, Link and Chat solution
          <br />
          Built With 💖 By{" "}
          <a href="https://github.com/0xvashishth">Vashishth Patel</a>
        </p>
      </aside>
      <nav>
        <header className="footer-title">Services</header>
        <a href="/services/form" className="link link-hover">
          Form 📝
        </a>
        <a href="/services/link" className="link link-hover">
          Link 🔗
        </a>
        <a href="/services/chat" className="link link-hover">
          Chat ☁
        </a>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <a href="/about" className="link link-hover">
          About us
        </a>
      </nav>
      <dialog
        id="my_modal_terms"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h1 className="text-2xl font-bold mb-4">FLIC - Terms of Use</h1>
          <div>
            <h2 className="text-xl font-semibold mt-4">
              1. Account Creation and Security
            </h2>
            <p>
              a. You may need to create an account to access certain features of
              Flic. Ensure that the information provided during registration is
              accurate and complete. You are responsible for maintaining the
              confidentiality of your account credentials.
            </p>
            <p>
              b. You are solely responsible for all activities that occur under
              your account. Notify us immediately of any unauthorized use or
              security breaches.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">
              2. Short URLs and Content
            </h2>
            <p>
              a. Flic provides a platform to create and manage short URLs. You
              are solely responsible for the content associated with the URLs
              you create.
            </p>
            <p>
              b. Prohibited content includes, but is not limited to, illegal,
              abusive, or harmful material. Flic reserves the right to suspend
              or terminate accounts that violate these guidelines.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">3. Serverless Forms</h2>
            <p>
              a. Flic allows you to create serverless forms. You are responsible
              for the content and data collected through these forms. Ensure
              compliance with applicable laws and respect the privacy of
              respondents.
            </p>
            <p>
              b. Flic reserves the right to suspend or terminate accounts that
              misuse serverless form features or violate privacy standards.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">4. Chat Support</h2>
            <p>
              a. Flic provides chat support features for communication. Users
              are expected to engage respectfully and within the bounds of
              applicable laws.
            </p>
            <p>
              b. Flic reserves the right to monitor and moderate chat
              interactions. Users engaging in inappropriate behavior may have
              their access restricted.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">5. Dashboard Usage</h2>
            <p>
              a. The Flic dashboard is a centralized control panel for managing
              short URLs, serverless forms, and chat support. Users are expected
              to use the dashboard features responsibly.
            </p>
            <p>
              b. Flic reserves the right to modify or remove dashboard features
              and functionalities at its discretion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">
              6. Intellectual Property
            </h2>
            <p>
              a. Flic and its associated logos, trademarks, and content are the
              intellectual property of Flic. Users are not allowed to use,
              reproduce, or distribute Flic's intellectual property without
              explicit permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">7. Termination</h2>
            <p>
              a. Flic reserves the right to suspend or terminate your account,
              with or without cause, at any time.
            </p>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>
      <dialog
        id="my_modal_cookie"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h1 className="text-2xl font-bold mb-4">FLIC - Cookies Policy</h1>
          <div>
            <p>a. Flic uses cookies and similar tracking technologies...</p>
            <p>
              b. You can manage your cookie preferences through your browser
              settings.
            </p>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>
      <dialog
        id="my_modal_privacy"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h1 className="text-2xl font-bold mb-4">FLIC - Privacy Policy</h1>
          <div>
            <h2 className="text-xl font-semibold mt-4">
              1. Information We Collect
            </h2>
            <p>
              a. Flic collects certain information when you use our services,
              including but not limited to...
            </p>
            <p>
              b. We may collect personal information such as your name, email
              address, and other details to provide you with a personalized
              experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">
              2. How We Use Your Information
            </h2>
            <p>a. Flic uses the collected information to...</p>
            <p>
              b. We may use your email address to send you updates, newsletters,
              or other relevant communications.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">
              3. Cookies and Tracking Technologies
            </h2>
            <p>a. Flic uses cookies and similar tracking technologies...</p>
            <p>
              b. You can manage your cookie preferences through your browser
              settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">
              4. Third-Party Services
            </h2>
            <p>a. Flic may use third-party services to...</p>
            <p>
              b. These third-party services have their own privacy policies, and
              we recommend reviewing them.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">5. Security</h2>
            <p>a. Flic takes reasonable measures to...</p>
            <p>
              b. Despite our efforts, no method of transmission over the
              internet or electronic storage is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">6. Your Choices</h2>
            <p>a. You have the right to...</p>
            <p>
              b. If you have questions or concerns about your privacy, please
              contact us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">
              7. Changes to the Privacy Policy
            </h2>
            <p>a. Flic may update this Privacy Policy...</p>
            <p>
              b. Your continued use of our services after any changes indicates
              your acceptance of the revised Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">
              8. Contact Information
            </h2>
            <p>
              If you have any questions or concerns regarding this Privacy
              Policy, please contact us at{" "}
              <a href="mailto:support@flic.tech<">support@flic.tech</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">
              2. Short URLs and Content
            </h2>
            <p>
              a. Flic provides a platform to create and manage short URLs. You
              are solely responsible for the content associated with the URLs
              you create.
            </p>
            <p>
              b. Prohibited content includes, but is not limited to, illegal,
              abusive, or harmful material. Flic reserves the right to suspend
              or terminate accounts that violate these guidelines.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">3. Serverless Forms</h2>
            <p>
              a. Flic allows you to create serverless forms. You are responsible
              for the content and data collected through these forms. Ensure
              compliance with applicable laws and respect the privacy of
              respondents.
            </p>
            <p>
              b. Flic reserves the right to suspend or terminate accounts that
              misuse serverless form features or violate privacy standards.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">4. Chat Support</h2>
            <p>
              a. Flic provides chat support features for communication. Users
              are expected to engage respectfully and within the bounds of
              applicable laws.
            </p>
            <p>
              b. Flic reserves the right to monitor and moderate chat
              interactions. Users engaging in inappropriate behavior may have
              their access restricted.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">5. Dashboard Usage</h2>
            <p>
              a. The Flic dashboard is a centralized control panel for managing
              short URLs, serverless forms, and chat support. Users are expected
              to use the dashboard features responsibly.
            </p>
            <p>
              b. Flic reserves the right to modify or remove dashboard features
              and functionalities at its discretion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">
              6. Intellectual Property
            </h2>
            <p>
              a. Flic and its associated logos, trademarks, and content are the
              intellectual property of Flic. Users are not allowed to use,
              reproduce, or distribute Flic's intellectual property without
              explicit permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">7. Termination</h2>
            <p>
              a. Flic reserves the right to suspend or terminate your account,
              with or without cause, at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">8. Changes to Terms</h2>
            <p>
              a. Flic may update these Terms periodically. Your continued use of
              the platform after any changes indicates your acceptance of the
              revised Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">9. Privacy Policy</h2>
            <p>
              a. Our Privacy Policy governs the collection and use of your
              personal information. Please review the Privacy Policy to
              understand how we handle your data.
            </p>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>
      <nav>
        <header className="footer-title">Legal</header>
        <a
          onClick={() =>
            (document.getElementById("my_modal_terms") as HTMLDialogElement).showModal()
          }
          className="link link-hover"
        >
          Terms of use
        </a>
        <a
          onClick={() =>
            (document.getElementById("my_modal_privacy") as HTMLDialogElement).showModal()
          }
          className="link link-hover"
        >
          Privacy policy
        </a>
        <a
          onClick={() =>
            (document.getElementById("my_modal_cookie") as HTMLDialogElement).showModal()
          }
          className="link link-hover"
        >
          Cookie policy
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
