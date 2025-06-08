import { useState } from 'react';

export default function NetflixCarousel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMiniSidebarOpen, setIsMiniSidebarOpen] = useState(false);

  const movies = [
    {
      id: 1,
      title: "Star Wars: The Rise of Skywalker",
      description: "Star Wars: The Rise of Skywalker serves as a grand finale to the Skywalker saga, blending epic battles with heartfelt moments. Rey's journey reaches a satisfying conclusion, while old and new characters unite against the First Order. Despite pacing issues, the film delivers thrilling action and emotional resonance, leaving fans with a satisfying conclusion to the iconic saga.",
      backgroundImage: "https://www.pixel4k.com/wp-content/uploads/2019/10/star-wars-the-rise-of-skywalker-new_1572371016.jpg.webp"
    },
    {
      id: 2,
      title: "Spider-Man: Beyond the Spider-Verse",
      description: "Spider-Man: Beyond the Spider-Verse expands the multiverse with stunning animation and thrilling storytelling. Miles Morales returns, joined by new Spider-People from alternate dimensions. The film seamlessly weaves humor, heart, and heroics, delivering a visually spectacular and emotionally resonant adventure. It's a must-watch for fans of all ages, spinning a web of pure cinematic magic.",
      backgroundImage: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Transformers: Rise of the Beasts",
      description: "Transformers: Rise of the Beasts takes audiences on a riveting journey back to the 1990s, unveiling untold chapters of the Transformers saga. Directed by Steven Caple Jr., the film introduces new factions like Maximals and Predacons, alongside the iconic Autobots and Decepticons. With electrifying action sequences and stunning visual effects, it delivers a nostalgic yet innovative experience.",
      backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop"
    },
    {
      id: 4,
      title: "John Wick: Chapter 4",
      description: "John Wick: Chapter 4 amplifies the franchise's adrenaline with relentless action and depth. Keanu Reeves excels, delivering a riveting portrayal of the titular assassin. Director Chad Stahelski crafts jaw-dropping sequences, ensuring the film is a visceral thrill ride. It's a must-watch for fans craving intense action and captivating storytelling.",
      backgroundImage: "https://images.unsplash.com/photo-1489599317807-e1c3b1ab46c4?w=1200&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Joker: Folie à Deux",
      description: "Joker: Folie à Deux is a gripping exploration of the iconic character's psyche. Joaquin Phoenix's mesmerizing performance captivates, delving into the depths of madness and chaos. Director's bold vision immerses viewers in a dark, unsettling world. With its raw emotion and provocative narrative, it's a hauntingly unforgettable cinematic experience.",
      backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Kingdom of the Planet of the Apes",
      description: "Kingdom of the Planet of the Apes is a riveting culmination of the franchise, blending heart-wrenching drama with epic action. Andy Serkis delivers a powerhouse performance as Caesar, leading the apes in a struggle for survival. The film's stunning visuals and emotional depth make it a fitting conclusion to this captivating saga.",
      backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop"
    }
  ];

  const handleNavigation = (e) => {
    const slider = document.querySelector('.slider');
    const items = document.querySelectorAll('.item');
    
    if (e.target.matches('.prev')) {
      slider.append(items[0]);
    }
    if (e.target.matches('.next')) {
      slider.prepend(items[items.length - 1]);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMiniSidebar = () => {
    setIsMiniSidebarOpen(!isMiniSidebarOpen);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css');
        
        body {
          margin: 0;
          padding: 0;
        }

        /*Navbar*/
        .netflix-logo {
          width: 120px;
          position: absolute;
          z-index: 4;
          top: 40px;
          left: 40px;
        }

        .menu-container {
          position: absolute;
          z-index: 6;
          top: 40px;
          left: 200px;
        }

        .menu-container2 {
          position: absolute;
          z-index: 6;
          top: 40px;
          right: 70px;
        }

        .menu-list {
          display: flex;
          flex-direction: row;
          justify-content: center;
          justify-content: space-around;
          list-style-type: none;
          color: #fff;
          cursor: pointer;
        }

        .menu-list li {
          position: relative;
          margin-right: 20px;
          font-family: 'Poppins';
          font-size: small;
        }

        .menu-list li:hover {
          color: #E50914;
        }

        .menu-list li::before {
          content: '';
          position: absolute;
          bottom: 0;
          right: 100%; 
          width: 100%;
          height: 10%;
          z-index: -1; 
          transition: right 0.4s; 
        }

        .menu-list li:hover::before {
          right: 0;
          background-color: #E50914; 
        }

        .menu-list2 {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-list2 li {
          margin-right: 15px;
          font-family: 'Poppins';
          font-size: small; 
          color: white;
        }

        .search-container {
          display: flex;
          align-items: center;
        }

        .search-container i {
          position: absolute;
          left: 10px;
        }

        input {
          padding-right: 50px;
          background-color: transparent;
          outline: none !important;
          width: 120px;
          height: 20px; 
          border-radius: 20px;
          border: 1px solid rgb(163, 162, 162);
          color: white;
          padding-left: 15px;
        }

        .menu-btn {
          position: absolute;
          top: 53px;
          right: 30px;
          color: white;
          z-index: 4;
          visibility: hidden;
          cursor: pointer;
        }

        .menu-close {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: end;
          margin-top: 10px;
          padding-right: 30px;
          cursor: pointer;
        }

        .open-nav {
          width: 180px; 
          height: 100vh;
          position: fixed;
          z-index: 5;
          top: 0;
          right: -250px;
          background-color: black;
          transition: right 0.3s ease;
        }

        #arrowDown {
          position: relative;
          cursor: pointer;
        }

        .open-mininav {
          width: 150px; 
          height: 20vh;
          position: absolute;
          z-index: 200;
          top: -200px;
          right: 0;
          background-color: black;
          transition: top 0.3s ease;
          border-radius: 8px;
          padding: 10px;
        }

        .sidebar-open {
          right: 0 !important;
        }

        .mini-sidebar-open {
          top: 80px !important;
        }

        /*MAIN BODY*/
        .body {
          height: 100vh;
          display: grid;
          place-items: center;
          overflow: hidden; 
        }
        
        .main {
          position: relative;
          width: 100%;
          height: 100%;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        }

        .item {
          width: 200px;
          height: 300px;
          list-style-type: none;
          position: absolute;
          top: 70%;
          transform: translateY(-50%);
          z-index: 1;
          background-attachment: fixed;
          background-position: center;
          background-size: cover;
          border-radius: 20px;
          box-shadow: 0 10px 15px rgba(177, 177, 177, 0.6) inset; 
          transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;
        }

        .item:nth-child(1), .item:nth-child(2) {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transform: none;
          border-radius: 0;
          box-shadow: none;
          opacity: 1;
        }

        .item:nth-child(3) { left: 50%; }
        .item:nth-child(4) { left: calc(50% + 220px); }
        .item:nth-child(5) { left: calc(50% + 440px); }
        .item:nth-child(6) { 
          left: calc(50% + 660px); 
          opacity: 0; 
        }
        
        .content {
          width: min(30vw,400px);
          position: absolute;
          top: 60%;
          left: 10%;
          transform: translateY(-50%);
          font: 400 0.85rem; 
          font-family: 'Poppins',sans-serif;
          color: white;
          text-shadow: 0 3px 8px rgba(0,0,0,0.5);
          opacity: 0;
          display: none;
          flex-direction: column;
          gap: 10px;
        }

        .content .title {
          font-family: 'Poppins';
          text-transform: uppercase; 
        }

        .content .description {
          line-height: 1.7;
          margin: 0.2rem 0rem;
          font-size: 0.8rem;
          font-family: 'Poppins',sans-serif;
        }

        .content button {
          width: fit-content;
          margin: 2rem 0rem;
          background-color: #E50914;
          color: rgb(255, 255, 255);
          border-radius: 20px;
          border: none;
          padding: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .content button:nth-of-type(2) {
          border: 1px solid white;
          background: transparent;
          color: white;
        }

        .item:nth-of-type(2) .content {
          display: flex;
          animation: show 0.75s ease-in-out 0.3s forwards;
        }

        @keyframes show {
          0% {
            filter: blur(5px);
            transform: translateY(calc(-50% + 75px));
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }
        
        .navigate {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          user-select: none;
        }

        .navigate .btn {
          background-color: rgba(255,255,255,0.3);
          color: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(0,0,0,0.6);
          margin: 0 0.25rem;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
        }

        .navigate .btn:hover {
          background-color: rgba(255,255,255,0.5);
        }

        @media (width > 650px) and (width < 900px) {
          .content .title { font-size: 2rem; }
          .content .description { font-size: 0.8rem; }
          .content button { font-size: 0.9rem; }
          
          .item {
            width: 160px;
            height: 270px;
          }

          .item:nth-child(3) { left: 50%; }
          .item:nth-child(4) { left: calc(50% + 170px); }
          .item:nth-child(5) { left: calc(50% + 340px); }
          .item:nth-child(6) { left: calc(50% + 510px); opacity: 0; }

          .menu-container {
            visibility: hidden;
          }
          
          .menu-container2 {
            right: 40px;
          }

          .menu-btn {
            visibility: hidden;
          }
          
          .open-nav {
            visibility: hidden;
          }
        }
        
        @media (width < 650px) {
          .content .title { font-size: 0.9rem; }
          .content .description { font-size: 0.5rem; }
          .content button { font-size: 0.5rem; margin: 0.2rem 0rem; }
          
          .item {
            width: 130px;
            height: 220px;
          }

          .item:nth-child(3) { left: 50%; }
          .item:nth-child(4) { left: calc(50% + 140px); }
          .item:nth-child(5) { left: calc(50% + 280px); }
          .item:nth-child(6) { left: calc(50% + 420px); opacity: 0; }

          .menu-container {
            visibility: hidden;
          }
          
          .menu-container2 {
            visibility: hidden;
          }
          
          .menu-btn {
            visibility: visible;
          }
        }
      `}</style>

      <section className="body">
        {/* Netflix Logo */}
        <div className="netflix-logo" style={{ color: '#E50914', fontWeight: 'bold', fontSize: '24px', fontFamily: 'Poppins' }}>
          NETFLIX
        </div>

        {/* Main Menu */}
        <div className="menu-container">
          <ul className="menu-list">
            <li>Home</li>
            <li>Movies</li>
            <li>Series</li>
            <li>Cartoons</li>
          </ul>
        </div>

        {/* Right Menu */}
        <div className="menu-container2">
          <ul className="menu-list2">
            <li className="search-container">
              <input type="text" />
              <i className="ri-search-line search-icon"></i>
            </li>
            <li>Favourites</li>
            <li>
              <i className="ri-notification-2-fill"></i>
            </li>
            <li>
              <div style={{ width: '40px', height: '40px', border: '1px solid white', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ri-user-fill"></i>
              </div>
            </li>
            <li>
              <i className="ri-arrow-down-s-fill" id="arrowDown" onClick={toggleMiniSidebar}></i>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="menu-btn" id="menuBtn" onClick={toggleSidebar}>
          <i className="ri-menu-fill"></i>
        </div>

        {/* Mini Sidebar */}
        <div className={`open-mininav ${isMiniSidebarOpen ? 'mini-sidebar-open' : ''}`} id="mini-sidebar">
          <div style={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
            <ul style={{ listStyle: 'none', paddingTop: '5px', fontFamily: 'Poppins', margin: 0, padding: '5px 0' }}>
              <li style={{ padding: '5px 0', cursor: 'pointer' }}>Home</li>
              <li style={{ padding: '5px 0', cursor: 'pointer' }}>Movies</li>
              <li style={{ padding: '5px 0', cursor: 'pointer' }}>Series</li>
              <li style={{ padding: '5px 0', cursor: 'pointer' }}>Cartoons</li>
              <li style={{ padding: '5px 0', cursor: 'pointer' }}>Favourites</li>
            </ul>
          </div>
        </div>

        {/* Full Sidebar */}
        <div className={`open-nav ${isSidebarOpen ? 'sidebar-open' : ''}`} id="sidebar">
          <div style={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
            <div className="menu-close" id="menuClose" onClick={toggleSidebar}>
              <i className="ri-close-fill"></i>
            </div>
            <ul style={{ listStyle: 'none', paddingTop: '5px', fontFamily: 'Poppins' }}>
              <li style={{ padding: '10px 0' }}>
                <div style={{ width: '40px', height: '40px', border: '1px solid white', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="ri-user-fill"></i>
                </div>
              </li>
              <li style={{ padding: '10px 0', cursor: 'pointer' }}>Home</li>
              <li style={{ padding: '10px 0', cursor: 'pointer' }}>Movies</li>
              <li style={{ padding: '10px 0', cursor: 'pointer' }}>Series</li>
              <li style={{ padding: '10px 0', cursor: 'pointer' }}>Cartoons</li>
              <li style={{ padding: '10px 0', cursor: 'pointer' }}>Favourites</li>
              <li style={{ padding: '10px 0' }}>
                <input type="text" style={{ width: '120px', height: '20px', background: 'transparent', border: '1px solid #ccc', borderRadius: '20px', color: 'white', paddingLeft: '10px' }} />
              </li>
            </ul>
          </div>
        </div>

        {/* Main Carousel */}
        <div className="main">
          <ul className="slider">
            {movies.map((movie, index) => (
              <li 
                key={movie.id} 
                className="item" 
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${movie.backgroundImage}')`,
                  objectFit: 'cover'
                }}
              >
                <div className="content">
                  <h2 className="title">{movie.title}</h2>
                  <p className="description">{movie.description}</p>
                  <button>
                    Watch Now
                    <i className="ri-play-fill"></i>
                  </button>
                  <button>
                    <i className="ri-add-fill"></i>
                    Favourite
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Navigation */}
          <div className="navigate" onClick={handleNavigation}>
            <i className="ri-arrow-left-circle-fill btn next"></i>
            <i className="ri-arrow-right-circle-fill btn prev"></i>
          </div>
        </div>
      </section>
    </>
  );
}