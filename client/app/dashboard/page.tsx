// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    <div className="m-3">
      <div className="text-center">
        <div className="text-left">
          <h1 className="text-3xl">Hello Vashishth,</h1>
          <div className="text-center text-xl m-2">FLIC Stats</div>
        </div>
        <ul className="glass m-3 menu menu-vertical md:menu-horizontal bg-base-200 rounded-box">
          <li className="">
            <div className="">
              <a className="text-base">Total Forms</a>
              <span className="badge badge-md badge-warning">90</span>
            </div>
          </li>
          <li className="">
            <div className="">
              <a className="text-base">Total Links</a>
              <span className="badge badge-md badge-secondary">100+</span>
            </div>
          </li>
          <li className="">
            <div className="">
              <a className="text-base">Total Chats</a>
              <span className="badge badge-md badge-info">5</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="m-1 md:flex">
        <div className="menu mx-auto">
          <ul className="menu bg-base-200 rounded-box">
            <li className="menu-title">Recently Opened 🕥</li>
            <li>
              <a>
                <span className="badge badge-warning">Form</span>Item 1{" "}
              </a>
            </li>
            <li>
              <a>
                <span className="badge badge-secondary">Link</span>Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Tempore doloribus
                laudantium excepturi totam dignissimos nostrum a tempora
                expedita error.
              </a>
            </li>
            <li>
              <a>
                <span className="badge badge-info">Chat</span>Item 3
              </a>
            </li>
            <li>
              <a>
                <span className="badge badge-secondary">Link</span>Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Vel aspernatur id
                suscipit minima! In pariatur architecto illum impedit
                reprehenderit voluptates magni fuga veniam eum. Nemo
                voluptatibus quae nulla dicta repellendus!
              </a>
            </li>
          </ul>
        </div>
        <div className="menu mx-auto">
          <ul className="menu bg-base-200 rounded-box">
            <li className="menu-title">Announcements From Flic 📢</li>
            <li>
              <a>
                <span className="badge badge-warning">Form</span>Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Ipsa totam quo
                reprehenderit cumque quis molestiae, voluptatum vero nisi omnis
                nostrum debitis minus voluptas molestias quibusdam! Veniam
                nostrum dicta laudantium libero.{" "}
              </a>
            </li>
            <li>
              <a>
                <span className="badge badge-secondary">Link</span>Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Tempore doloribus
                laudantium excepturi totam dignissimos nostrum a tempora
                expedita error.
              </a>
            </li>
            <li>
              <a>
                <span className="badge badge-info">Chat</span>Item 3
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
