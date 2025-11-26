"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getArticles, saveArticles } from "@/utils/articles-storage";
import Header from "@/components/Header";

const HEADER_HEIGHT = 64; // Adjust if your header is taller!

// Dummy article if none exist
const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: "Cognitive Development Theory",
    author: "Jean Piaget",
    image: "/articlePerson.png",
    content: `
      <p>Jean Piaget (1896–1980) was a Swiss psychologist renowned for his groundbreaking work in developmental psychology, particularly in understanding how children's cognitive abilities develop over time. His theory of cognitive development is one of the most influential frameworks in developmental psychology, explaining how children actively construct their understanding of the world through stages of increasingly complex thinking.</p>
      <h3 class="font-semibold text-lg mt-5 mb-2">Key Concepts of Piaget's Theory:</h3>
      <ul class="list-disc ml-6">
        <li><b>Schemes:</b> Mental frameworks or structures that help individuals organize and interpret information.</li>
        <li><b>Assimilation: </b> The process of incorporating new information into existing schemas.</li>
        <li><b>Accommodation: </b> Modifying existing schemas to incorporate new information.</li>
        <li><b>Equilibration: </b> The process of balancing assimilation and accommodation to achieve cognitive stability.</li>
      </ul>
      <h4 class="mt-5 font-semibold">The Four Stages of Cognitive Development:</h4>
      <ol class="list-decimal ml-6">
        <li><b>Sensorimotor Stage (Birth to 2 Years)</b><br />
          <ul class="list-disc ml-9">
            <li><b>Key Characteristics:</b> Infants learn about the world through sensory experiences and motor activities (e.g., touching, mouthing, grasping).</li>
            <li><b>Object Permanence:</b> A major milestone occurs when infants realize that objects continue to exist even when out of sight (around 8-12 months).</li>
            <li><b>Developmental Focus:</b> Coordination of sensory input and motor actions; beginnings of symbolic thought.</li>
          </ul>
        </li>
        <li class="mt-2"><b>Preoperational Stage (2 to 7 Years)</b><br />
           <ul class="list-disc ml-9">
            <li><b>Key Characteristics:</b> Children begin to use language and symbols to represent objects but still struggle with logical reasoning.</li>
          </ul>
        </li>
      </ol>
      `,
  },
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Load articles on mount
  useEffect(() => {
    const all = getArticles();
    if (all.length === 0) {
      saveArticles(SAMPLE_ARTICLES);
      setArticles(SAMPLE_ARTICLES);
      setSelected(SAMPLE_ARTICLES[0]);
    } else {
      setArticles(all);
      setSelected(all[0]);
    }
  }, []);
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Clean up on unmount just in case
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);


  useEffect(() => {
    window.onstorage = () => {
      const all = getArticles();
      setArticles(all);
      if (all.length && (!selected || !all.find(a => a.id === selected.id))) {
        setSelected(all[0]);
      }
    };
  }, []);

  // Hamburger button for mobile
  const MobileSidebarButton = (
    <div className="flex items-center lg:hidden px-4 pt-2 pb-2 bg-white shadow z-30 relative">
      <button
        aria-label="Open articles"
        onClick={() => setSidebarOpen(true)}
        className="p-2 rounded hover:bg-gray-200 mr-2"
      >
        <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <span className="text-lg font-bold text-gray-800">Articles</span>
    </div>
  );

  // Place this below your imports and hooks:
  const HEADER_HEIGHT = typeof window !== "undefined"
    ? document.querySelector("header")?.offsetHeight || 112 // default estimate
    : 112;

  // In your ArticlesPage component:
  const SidebarDrawer = sidebarOpen && (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Overlay, under header */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setSidebarOpen(false)}
        style={{ top: HEADER_HEIGHT, height: `calc(100% - ${HEADER_HEIGHT}px)` }}
      />
      {/* Drawer */}
      <div
        className="absolute left-0 right-auto bg-white shadow-lg w-80 animate-slideIn z-50"
        style={{
          top: HEADER_HEIGHT,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
        }}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <span className="font-bold text-lg">Articles</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-800"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="overflow-y-auto flex flex-col pl-5 pt-3 pb-5">
          {articles.map((a) => (
            <li
              key={a.id}
              className={`group relative px-6 py-3 flex items-center gap-2 cursor-pointer text-gray-800 border-b border-gray-100 transition-colors ${selected && selected.id === a.id
                ? "bg-white font-bold"
                : "hover:bg-gray-100"
                }`}
              onClick={() => {
                setSelected(a);
                setSidebarOpen(false);
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[1.05rem] leading-5 truncate">{a.title}</div>
                <div className="text-[0.9rem] text-gray-500 mt-0.5 truncate">{a.author}</div>
              </div>
              {selected && selected.id === a.id && (
                <svg
                  className="w-5 h-5 text-blue-500 ml-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
      @keyframes slideIn {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
      .animate-slideIn {
        animation: slideIn 0.3s cubic-bezier(.4,0,.2,1);
      }
    `}</style>
    </div>
  );


  return (
    <>
      <Header />
      {/* Hamburger on mobile, always below header */}
      <div className="sticky top-0 z-30 bg-white shadow lg:hidden">{MobileSidebarButton}</div>
      {SidebarDrawer}

      <div className="bg-[#f3f3f3] min-h-screen">
        <div className="flex flex-col lg:flex-row h-full min-h-screen gap-3 xl:w-[98vw]">
          {/* Sidebar: vertical on desktop only */}
          <div className="hidden lg:block w-full lg:w-80 2xl:w-95 bg-white border-b lg:border-b-0 lg:border-r border-white  flex-shrink-0">
            <ul className="overflow-x-auto flex lg:block flex-row lg:flex-col pl-5 pt-5 lg:pt-10">
              {articles.map((a) => (
                <li
                  key={a.id}
                  className={`group relative px-6 py-3 flex items-center gap-2 cursor-pointer text-gray-800 border-b border-gray-100 transition-colors ${selected && selected.id === a.id
                    ? "bg-white font-bold"
                    : "hover:bg-gray-100"
                    }`}
                  onClick={() => setSelected(a)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[1.05rem] leading-5 truncate">{a.title}</div>
                    <div className="text-[0.9rem] text-gray-500 mt-0.5 truncate">{a.author}</div>
                  </div>
                  {/* Arrow RIGHT side for active only */}
                  {selected && selected.id === a.id && (
                    <svg
                      className="w-5 h-5 text-blue-500 ml-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Main content */}
          <div className="flex-1 bg-white flex flex-col min-h-0 lg:px-10 2xl:px-0">
            <div className="flex justify-end items-center px-2 sm:px-10 pt-3 sm:pt-5 pb-2">
              <button
                className="flex items-center gap-1 text-[#298ade] font-semibold px-2 py-1 rounded active:bg-blue-100 transition select-none"
                onClick={() => router.push("/articles/writearticle")}
                style={{ fontSize: "17px" }}
              >
                <img
                  src="/articles.svg"
                  alt="Write"
                  className="w-5.5 h-5.5 sm:w-7 sm:h-7 mr-1 sm:mr-2 lg:mr-5 sm:mb-3 object-contain"
                  style={{ display: "inline-block" }}
                />
                Write Articles / Blogs
              </button>
            </div>
            <div className="bg-[#f3f3f3] w-full h-1.5 hidden lg:block"></div>
            {selected && (
              <div className="flex flex-col items-center w-full max-w-full 2xl:px-10">
                <div className="flex flex-col md:flex-row w-full max-w-6xl px-2 sm:px-6 md:px-9 pt-4 sm:pt-7 md:pt-10 items-start gap-5 md:gap-14 pb-5">
                  {/* LEFT: Article Image */}
                  <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-[340px]">

                    <img
                      src={selected.image}
                      alt={selected.title}
                     className="w-full max-w-[400px] h-[50vh] md:h-auto object-contain"
                      style={{
                        minWidth: "0",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />

                    <div className="text-base font-semibold text-black flex self-center pt-1">
                      {selected.author}
                    </div>
                  </div>
                  {/* RIGHT: Article Content */}
                  <div className="flex-1 min-w-0 pt-1 sm:pt-4 md:pt-0 pb-7">
                    <h1 className="font-bold text-[1.4rem] sm:text-[1.6rem] md:text-[1.7rem] mb-5">{selected.title}</h1>
                    <div
                      className="prose max-w-none text-gray-900"
                      style={{ fontSize: "15px", lineHeight: 1.75 }}
                      dangerouslySetInnerHTML={{ __html: selected.content }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
