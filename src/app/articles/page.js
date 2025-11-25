// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getArticles, saveArticles } from "@/utils/articles-storage";
// import Header from "@/components/Header";

// // Dummy article if none exist
// const SAMPLE_ARTICLES = [
//   {
//     id: 1,
//     title: "Cognitive Development Theory",
//     author: "Jean Piaget",
//     image: "/sample-piaget.jpg", // Make sure this image exists in /public or change path
//     content: `<h2 class="font-bold text-2xl mb-4 mt-0">Cognitive Development Theory</h2>
//       <p>Jean Piaget (1896–1980) was a Swiss psychologist renowned for his groundbreaking work in developmental psychology, particularly in understanding how children's cognitive abilities develop over time. His theory of cognitive development is one of the most influential frameworks in developmental psychology, explaining how children actively construct their understanding of the world through stages of increasingly complex thinking.</p>
//       <h3 class="font-semibold text-lg mt-5 mb-2">Key Concepts of Piaget's Theory:</h3>
//       <ul class="list-disc ml-6">
//         <li><b>Schemes:</b> Mental frameworks or structures that help individuals organize and interpret information.</li>
//         <li><b>Assimilation:</b> The process of incorporating new information into existing schemas.</li>
//         <li><b>Accommodation:</b> Modifying existing schemas to incorporate new information.</li>
//         <li><b>Equilibration:</b> The process of balancing assimilation and accommodation to achieve cognitive stability.</li>
//       </ul>
//       <h4 class="mt-5 font-semibold">The Four Stages of Cognitive Development:</h4>
//       <ol class="list-decimal ml-6">
//         <li><b>Sensorimotor Stage (Birth to 2 Years)</b><br />
//           <ul class="list-disc ml-9">
//             <li><b>Key Characteristics:</b> Infants learn about the world through sensory experiences and motor activities (e.g., touching, mouthing, grasping).</li>
//             <li><b>Object Permanence:</b> A major milestone occurs when infants realize that objects continue to exist even when out of sight (around 8-12 months).</li>
//             <li><b>Developmental Focus:</b> Coordination of sensory input and motor actions; beginnings of symbolic thought.</li>
//           </ul>
//         </li>
//         <li class="mt-2"><b>Preoperational Stage (2 to 7 Years)</b><br />
//            <ul class="list-disc ml-9">
//             <li><b>Key Characteristics:</b> Children begin to use language and symbols to represent objects but still struggle with logical reasoning.</li>
//           </ul>
//         </li>
//       </ol>
//       `,
//   },
// ];

// export default function ArticlesPage() {
//   const [articles, setArticles] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const router = useRouter();

//   // Load articles on mount
//   useEffect(() => {
//     const all = getArticles();
//     if (all.length === 0) {
//       saveArticles(SAMPLE_ARTICLES);
//       setArticles(SAMPLE_ARTICLES);
//       setSelected(SAMPLE_ARTICLES[0]);
//     } else {
//       setArticles(all);
//       setSelected(all[0]);
//     }
//   }, []);

//   useEffect(() => {
//     window.onstorage = () => {
//       const all = getArticles();
//       setArticles(all);
//       if (all.length && (!selected || !all.find(a => a.id === selected.id))) {
//         setSelected(all[0]);
//       }
//     };
//   },[]);

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col lg:flex-row h-screen">
//         {/* Sidebar: horizontal on mobile/tablet, vertical on desktop */}
//         <div className="w-full lg:w-80 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 flex-shrink-0">
//           <h3 className="font-bold text-lg px-4 py-4 border-b border-gray-200">Articles</h3>
//           <ul className="overflow-x-auto flex lg:block flex-row lg:flex-col">
//             {articles.map((a) => (
//               <li
//                 key={a.id}
//                 className={`px-4 py-4 lg:py-4 cursor-pointer border-b lg:border-b-0 border-r-0 lg:border-r-0 border-gray-100 transition-colors 
//                   ${selected && selected.id === a.id
//                     ? "bg-blue-50 font-semibold border-l-4 border-l-blue-600"
//                     : "hover:bg-gray-100"}`}
//                 style={{ minWidth: 180 }}
//                 onClick={() => setSelected(a)}
//               >
//                 <div className="text-base">{a.title}</div>
//                 <div className="text-xs text-gray-600 mt-1">{a.author}</div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 overflow-y-auto bg-white flex flex-col min-h-0">
//           {/* Top bar with button */}
//           <div className="w-full flex justify-end items-center pt-5 pr-0 sm:pr-6 md:pr-10 pb-2 bg-white">
//             <button
//               className="bg-blue-600 text-white px-4 py-2 font-semibold rounded hover:bg-blue-700"
//               onClick={() => router.push("/articles/writearticle")}
//             >
//               Write Articles / Blogs
//             </button>
//           </div>
//           {/* Article content */}
//           {selected && (
//             <div className="flex flex-col items-center w-full max-w-full">
//               <div className="flex flex-col md:flex-row w-full max-w-4xl px-4 sm:px-6 md:px-8 pt-4 items-start gap-6 sm:gap-8">
//                 {/* IMAGE: full width on xs, left on md+ */}
//                 <img
//                   src={selected.image}
//                   alt={selected.title}
//                   className="w-full md:w-[230px] md:h-[300px] h-64 max-w-[230px] object-cover rounded shadow mb-4 md:mb-0 mx-auto md:mx-0"
//                   style={{
//                     minWidth: "150px",
//                     maxHeight: "380px",
//                   }}
//                 />
//                 {/* CONTENT */}
//                 <div className="flex-1">
//                   <h1 className="font-bold text-2xl mb-1 mt-2">{selected.title}</h1>
//                   <div className="text-sm sm:text-md text-gray-700 mb-3">{selected.author}</div>
//                   <div
//                     className="prose max-w-none text-base"
//                     dangerouslySetInnerHTML={{ __html: selected.content }}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
