import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother"; 


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Portofolio() {

  const zoneRef = useRef(null);
  const strength = 0.3;

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1, // Seberapa lama efek meluncurnya (dalam detik)
      effects: true, // Mengaktifkan efek parallax kalau lu butuh
    });

    gsap.from('.title', {
      y: 50,
      opacity: 0,
      duration: 1,
    });

    // Efek Magnet
    const zone = zoneRef.current;
    if (zone) {
      zone.addEventListener("mousemove", (e) => {
        const rect = zone.getBoundingClientRect();
        const x = gsap.utils.mapRange(rect.left, rect.right, -rect.width / 2, rect.width / 2, e.clientX);
        const y = gsap.utils.mapRange(rect.top, rect.bottom, -rect.height / 2, rect.height / 2, e.clientY);

        gsap.to('.btn', {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: "power2.out",
          overwrite: true
        });
      });

      zone.addEventListener("mouseleave", () => {
        gsap.to('.btn', {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
          overwrite: true
        });
      });
    }

    //ANIMASI DYNAMIC STACKING
    // Penyesuaian agar support native scroll untuk section yang kontennya panjang banget
    var panels = gsap.utils.toArray(".section");
    if (panels.length > 0) panels.pop(); // Footer dibebaskan dari efek, sesuai kodemu

    panels.forEach((panel) => {
      // Cek apakah section ini lebih tinggi dari layar (kayak section Services)
      let isTall = panel.scrollHeight > window.innerHeight;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          // Kalau panjang, tunggu sampai layar nyentuh bawah panel, baru di-pin
          start: isTall ? "bottom bottom" : "top top",
          end: () => `+=${window.innerHeight}`, // Pin ditahan selama 1 layar (untuk animasi ditimpa)
          pin: true,
          pinSpacing: false, // Biar div selanjutnya naik nimpa div ini
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      // Animasi div mengecil meredup
      tl.to(panel, {
        scale: 0.85,
        opacity: 0.3,
        ease: "none",
      });
    });

    // Navbar Animation
    const showAnim = gsap.from('.main-tool-bar', {
      yPercent: -600,
      paused: true,
      duration: 0.4
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
      }
    });

    // --- ANIMASI ACCORDION LIST 
    const serviceRows = gsap.utils.toArray(".service-row");

    serviceRows.forEach((row, index) => {
      ScrollTrigger.create({
        trigger: row,
        // Angka 125px ini adalah perkiraan tinggi judul (01) Web Dev. 
        // Jadi waktu nge-scroll, body-nya ketutup, tapi judulnya nangkring (stacking).
        start: () => `top ${100 + (index * 125)}px`,
        endTrigger: ".services-wrapper",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    });

  });

  return (
    <div id="smooth-wrapper " className="min-h-screen bg-[#f4f4f1]">
      <div id="smooth-content" className="min-h-screen bg-[#f4f4f1]">


        <div className="section section-1 min-h-screen bg-[#f4f4f1] px-10">
          <div className="section-inner w-full h-full">

            {/* Navbar */}
            <nav className="main-tool-bar flex justify-between text-[#4f5645] fixed w-[calc(100%-5rem)] z-50">
              <h1 className="element text-xl font-extrabold uppercase md:text-3xl">CERVIDAE</h1>
              <ul className="flex text-lg font-fancy font-medium md:flex md:gap-4 md:text-xl lg:gap-4 lg:text-2xl xl:text-3xl">
                <li>Services</li>
                <li>Projects</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </nav>

            <div className="py-11 mt-10 flex  items-center">
              <h1 className="title text-[200px] text-[#4f5645] font-extrabold mr-20">KARLLO GANIYYI</h1>
              <svg
                viewBox="0 0 76 77"
                xmlns="http://www.w3.org/2000/svg"
                className="hide heading-size inline-block animate-[spin_5s_linear_infinite] fill-[#4f5645] size-30"
              >
                <path d="M27.668 75.939V64.59l4.073-16.005-12.513 11.64-9.894 5.529L.022 49.167l9.603-5.529L25.921 38.4 9.625 33.453.022 27.924l9.312-16.587 9.894 5.529 12.513 11.64-4.073-16.296V.861h19.206V12.21L42.8 28.506l12.513-11.64 9.894-5.529 9.312 16.587-9.604 5.529L48.62 38.4l16.296 5.238 9.604 5.529-9.313 16.587-9.894-5.529L42.8 48.585l4.074 16.005v11.349H27.666Z" />
              </svg>
            </div>
            {/* hero */}
            <section>
              <div className="flex justify-between">
                <div>
                  <p className="w-75 text-[#4f5645] font-medium text-2xl mb-10">A frontend developer with a passion for creating beautiful and functional user experiences.</p>
                  <button
                    ref={zoneRef}
                    className="btn bg-[#2e2a26] text-[#f4f4f1] rounded-2xl w-70 h-15 text-2xl font-fancy font-bold">GET IN TOUCH</button>
                </div>
                <img src="/myself.jpeg" alt="" className="h-120 w-130 object-cover grayscale rounded-xl" />
                <div className="flex flex-col text-center pt-95">
                  <p className="text-2xl font-medium text-[#4f5645]">AVAILABLE FOR INTERN</p>
                  <h2 className="text-[#4f5645] font-bold text-8xl">JAN '26</h2>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="section section-2 w-full min-h-screen bg-[#272426] relative overflow-hidden text-white rounded-4xl">
          <div className="section-content p-10">
            <div className="section-inner">

              <div className="grid grid-cols-12 gap-y-6 text-sm text-gray-400 mt-10 p-6">
                <h1 className="col-start-1 col-span-10 text-[150px] font-bold text-[#ced6c6] uppercase leading-none tracking-tighter mb-30">
                  WHAT I DO /
                </h1>
                <p className="col-start-5 col-span-2 text-2xl text-[#ced6c6] uppercase tracking-wider">
                  ( SERVICES )
                </p>
                <h3 className="col-start-8 col-span-11 text-3xl text-[#ced6c6] font-medium leading-relaxed ">
                  User-Friendly interface don't happen by chance, they are built with intention.
                  I code intuitive responsive solutions that make your users' journey effortless.
                </h3>
              </div>

              <div className="services-wrapper relative w-full flex flex-col pb-[30vh]">

                <div className="service-row w-full bg-[#272426] border-t border-[#ced6c6]/20 relative z-10">
                  {/* Judul Baris (Ini yang bakal stay waktu di-scroll) */}
                  <div className="flex items-center justify-between py-10">
                    <div className="w-1/4 text-4xl md:text-5xl font-bold text-[#ced6c6] opacity-80 font-mono">( 01 )</div>
                    <div className="w-2/4 text-4xl md:text-5xl font-bold text-[#ced6c6]">Modern Frontend Development</div>
                    <div className="w-1/4 flex justify-end">
                      <svg className="w-10 h-10 fill-[#625d5a] opacity-80 animate-[spin_5s_linear_infinite]" viewBox="0 0 24 24"><path d="M12 2L14.4 9.6H22L15.8 14.2L18.2 21.8L12 17.2L5.8 21.8L8.2 14.2L2 9.6H9.6L12 2Z" /></svg>
                    </div>
                  </div>
                  {/* Isi Baris (Ini yang bakal ketiban div berikutnya) */}
                  <div className="pb-32 flex w-full">
                    <div className="w-1/4"></div>
                    <div className="w-2/4 pr-10">
                      <p className="text-[#9fa697] text-xl mb-12 max-w-xl leading-relaxed">
                        Your website deserves to be seen, speed, and responsiveness. By optimizing load times, improving user experiences, I ensure your site runs smoothly and efficiently.
                      </p>
                      <ul className="text-2xl text-[#ced6c6] font-bold space-y-0">
                        <li className="flex items-center gap-6 border-t border-[#ced6c6]/20 py-6">
                          <span className="text-sm text-[#9fa697] opacity-60 font-medium">01</span> Modern Frameworks
                        </li>
                        <li className="flex items-center gap-6 border-t border-[#ced6c6]/20 py-6">
                          <span className="text-sm text-[#9fa697] opacity-60 font-medium">02</span> Responsive Design
                        </li>
                        <li className="flex items-center gap-6 border-t border-[#ced6c6]/20 py-6">
                          <span className="text-sm text-[#9fa697] opacity-60 font-medium">03</span> Speed Optimization
                        </li>
                      </ul>
                    </div>
                    <div className="w-1/4"></div>
                  </div>
                </div>

                <div className="service-row w-full bg-[#272426] border-t border-[#ced6c6]/20 relative z-20">
                  <div className="flex items-center justify-between py-10">
                    <div className="w-1/4 text-4xl md:text-5xl font-bold text-[#ced6c6] opacity-80 font-mono">( 02 )</div>
                    <div className="w-2/4 text-4xl md:text-5xl font-bold text-[#ced6c6]">Advanced Solutions</div>
                    <div className="w-1/4 flex justify-end">
                      <svg className="w-10 h-10 fill-[#625d5a] opacity-80 animate-[spin_5s_linear_infinite]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M127.14 200C99.9942 200 99.9943 167.423 72.8487 167.423C41.6048 167.423 0 158.386 0 127.133C0 99.9885 32.5678 99.9885 32.5678 72.8445C32.5678 41.6139 41.6048 0 72.8602 0C100.006 0 100.006 32.5774 127.151 32.5774C158.384 32.5774 200 41.6139 200 72.8675C200 100.012 167.421 100.012 167.421 127.156C167.409 158.444 158.384 200 127.14 200Z" /></svg>
                    </div>
                  </div>
                  <div className="pb-32 flex w-full">
                    <div className="w-1/4"></div>
                    <div className="w-2/4 pr-10">
                      <p className="text-[#9fa697] text-xl mb-12 max-w-xl leading-relaxed">
                        Bridging the gap between engineering and design by translating complex mockups into pixel-perfect, interactive layouts.
                      </p>
                      <ul className="text-2xl text-[#ced6c6] font-bold space-y-0">
                        <li className="flex items-center gap-6 border-t border-[#ced6c6]/20 py-6">
                          <span className="text-sm text-[#9fa697] opacity-60 font-medium">01</span> Figma to Code
                        </li>
                        <li className="flex items-center gap-6 border-t border-[#ced6c6]/20 py-6">
                          <span className="text-sm text-[#9fa697] opacity-60 font-medium">02</span> Pixel Perfect
                        </li>
                      </ul>
                    </div>
                    <div className="w-1/4"></div>
                  </div>
                </div>

                <div className="service-row w-full bg-[#272426] border-t border-[#ced6c6]/20 relative z-30">
                  <div className="flex items-center justify-between py-10">
                    <div className="w-1/4 text-4xl md:text-5xl font-bold text-[#ced6c6] opacity-80 font-mono">( 03 )</div>
                    <div className="w-2/4 text-4xl md:text-5xl font-bold text-[#ced6c6]">Code Optimization</div>
                    <div className="w-1/4 flex justify-end">
                      <svg className="w-10 h-10 fill-[#625d5a] opacity-80 animate-[spin_5s_linear_infinite]" viewBox="0 0 24 24"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" /></svg>
                    </div>
                  </div>
                  <div className="pb-32 flex w-full">
                    <div className="w-1/4"></div>
                    <div className="w-2/4 pr-10">
                      <p className="text-[#9fa697] text-xl mb-12 max-w-xl leading-relaxed">
                        Implementing robust asynchronous data fetching patterns with RESTful APIs and managing complex global states.
                      </p>
                      <ul className="text-2xl text-[#ced6c6] font-bold space-y-0">
                        <li className="flex items-center gap-6 border-t border-[#ced6c6]/20 py-6">
                          <span className="text-sm text-[#9fa697] opacity-60 font-medium">01</span> API Integration
                        </li>
                        <li className="flex items-center gap-6 border-t border-[#ced6c6]/20 py-6">
                          <span className="text-sm text-[#9fa697] opacity-60 font-medium">02</span> State Management
                        </li>
                      </ul>
                    </div>
                    <div className="w-1/4"></div>
                  </div>
                </div>

              </div>

              <style>{`
                                    @keyframes marquee {
                                        0% { transform: translateX(0); }
                                        100% { transform: translateX(-50%); }
                                    }
                                        .animate-marquee-loop {
                                        animation: marquee 25s linear infinite;
                                    }
                            `}</style>

              <div className="w-full overflow-hidden whitespace-nowrap  py-10 my-20 bg-[#272426]">
                <div className="flex w-max animate-marquee-loop items-center text-6xl lg:text-9xl font-extrabold uppercase tracking-tighter text-[#ced6c6]">
                  <div className="flex items-center gap-16 shrink-0 pr-16">
                    <span>FRONTEND DEVELOPER</span>
                    <svg viewBox="0 0 100 101" className="w-14 h-14 fill-current text-[#ced6c6]">
                      <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
                    </svg>
                    <span>FRONTEND DEVELOPER</span>
                    <svg viewBox="0 0 100 101" className="w-14 h-14 fill-current text-[#ced6c6]">
                      <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-16 shrink-0 pr-16">
                    <span>FRONTEND DEVELOPER</span>
                    <svg viewBox="0 0 100 101" className="w-14 h-14 fill-current text-[#ced6c6]">
                      <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
                    </svg>
                    <span>FRONTEND DEVELOPER</span>
                    <svg viewBox="0 0 100 101" className="w-14 h-14 fill-current text-[#ced6c6]">
                      <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div classNameName="section w-full h-screen bg-neutral-900 text-white flex items-center justify-center">
                    <div className="section-inner text-center">
                        <h2 className="text-6xl font-bold">FOOTER / NEXT SECTION</h2>
                    </div>
                </div> */}

      </div>
    </div>
  )
}