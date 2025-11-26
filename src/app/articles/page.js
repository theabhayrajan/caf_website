"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getArticles, saveArticles } from "@/utils/articles-storage";
import Header from "@/components/Header";

// Dummy article if none exist
const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: "Cognitive Development Theory",
    author: "Jean Piaget",
    image: "/sample-piaget.jpg", // Make sure this image exists in /public or change path
    content: `<h2 class="font-bold text-2xl mb-4 mt-0">Cognitive Development Theory</h2>
      <p>Jean Piaget (1896–1980) was a Swiss psychologist renowned for his groundbreaking work in developmental psychology, particularly in understanding how children's cognitive abilities develop over time. His theory of cognitive development is one of the most influential frameworks in developmental psychology, explaining how children actively construct their understanding of the world through stages of increasingly complex thinking.</p>
      <h3 class="font-semibold text-lg mt-5 mb-2">Key Concepts of Piaget's Theory:</h3>
      <ul class="list-disc ml-6">
        <li><b>Schemes:</b> Mental frameworks or structures that help individuals organize and interpret information.</li>
        <li><b>Assimilation:</b> The process of incorporating new information into existing schemas.</li>
        <li><b>Accommodation:</b> Modifying existing schemas to incorporate new information.</li>
        <li><b>Equilibration:</b> The process of balancing assimilation and accommodation to achieve cognitive stability.</li>
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

  useEffect(() => {
    window.onstorage = () => {
      const all = getArticles();
      setArticles(all);
      if (all.length && (!selected || !all.find(a => a.id === selected.id))) {
        setSelected(all[0]);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <div className="bg-[#f3f3f3]">
        <div className="flex flex-col lg:flex-row h-screen gap-3 xl:w-[98vw]">
          {/* Sidebar: horizontal on mobile/tablet, vertical on desktop */}
          <div className="w-full lg:w-80 2xl:w-95 bg-gray-50 border-b lg:border-b-0 lg:border-r border-white  flex-shrink-0">
            {/* <h3 className="font-bold text-lg px-4 py-4 border-b border-gray-200">Articles</h3> */}
            <ul className="overflow-x-auto flex lg:block flex-row lg:flex-col pl-5 pt-10">
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
          <div className="flex-1 overflow-y-auto bg-white flex flex-col min-h-0">
            {/* Top bar with button */}
            <div className="flex justify-end items-center px-10 pt-5 pb-2">
              <button
                className="flex items-center gap-1 text-[#298ade] font-semibold px-2 py-1 rounded active:bg-blue-100 transition select-none"
                onClick={() => router.push("/articles/writearticle")}
                style={{ fontSize: "17px" }}
              >
                {/* Use your icon image here */}
                <img
                  src="/articles.svg"
                  alt="Write"
                  className="w-7 h-7 mr-5 mb-3 object-contain"
                  style={{ display: "inline-block" }}
                />
                Write Articles / Blogs
              </button>
            </div>
            <div className="bg-[#f3f3f3] w-full h-1.5">

            </div>

            {/* Article content */}
            {selected && (
              <div className="flex flex-col items-center w-full max-w-full">
                <div className="flex flex-col md:flex-row w-full max-w-6xl px-4 sm:px-10 lg:pl-0 lg:px-0 pt-8 md:pt-10 items-start gap-10 md:gap-14">
                  {/* LEFT: Article Image */}
                  <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-[340px]">
                    <div className="w-[280px] h-[420px] md:w-[340px] md:h-[440px] rounded shadow mb-3 flex items-center justify-center overflow-hidden">
                      <img
                        src={selected.image}
                        alt={selected.title}
                        className="w-full h-full object-contain"
                        style={{
                          minWidth: "0",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                      />
                    </div>
                    <div className="text-base font-semibold text-black flex self-center pt-1">
                      {selected.author}
                    </div>
                  </div>
                  {/* RIGHT: Article Content */}
                  <div className="flex-1 min-w-0 pt-5 md:pt-0">
                    <h1 className="font-bold text-[1.7rem] mb-5">{selected.title}</h1>
                    <div
                      className="prose max-w-none text-gray-900"
                      style={{ fontSize: "16px", lineHeight: 1.75 }}
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
