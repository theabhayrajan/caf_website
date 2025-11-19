"use client";
import Image from "next/image";

export default function QuoteSection() {
  return (
    <div className="flex justify-center items-center">

    <section className="flex flex-col lg:flex-row items-center justify-center bg-white w-[90vw] xl:w-[95vw] [@media(min-width:1024px)_and_(max-width:1279px)]:w-[95vw]  [@media(min-width:1536px)_and_(max-width:1620px)]:w-[95vw] [@media(min-width:1621px)_and_(max-width:1715px)]:w-[90vw] [@media(min-width:1716px)_and_(max-width:1800px)]:w-[88vw] [@media(min-width:1801px)_and_(max-width:3000px)]:w-[80vw] gap-5 sm:gap-5 md:gap-5 lg:gap-10 xl:gap-20">
      {/* Left Side - Image */}
      <div className="flex justify-center lg:justify-start items-center ">
        <Image
          src="/hero.svg"
          alt="Urie Bronfenbrenner teaching"
          width={450}
          height={400}
          className="object-cover w-80 md:w-100 lg:w-110 xl:w-155 2xl:w-175"
        />
      </div>

      {/* Right Side - Text */}
      <div className="w-full  flex flex-col justify-center gap-8 sm:gap-10 md:gap-10 lg:gap-14 lg:pl-20 text-md sm:text-lg md:text-lg lg:text-xl xl:text-2xl">
        {/* Quote Text */}
        <p className="text-gray-700 self-center lg:self-start md:w-[75%] lg:w-[90%] 2xl:w-[70%] w-full  leading-tight mb-2 md:mb-4 text-center md:text-left ">
          The world of the child is not defined by the walls of the home, nor
          even of the classroom, but extends outward to encompass the larger
          society—the community, the culture, the economic system, and the
          political structure.
        </p>

        {/* Author Info */}
        <div className="text-center md:text-left md:self-end lg:mr-20 w-full md:w-[70%]">
          <p className="text-gray-900 font-semibold">
            - Urie Bronfenbrenner (1917–2005)
          </p>
          <p className="text-gray-600 sm:whitespace-nowrap">
            Developmental Psychologist, Researcher, and Professor
            <br />
            (Cornell University)
          </p>
        </div>
      </div>
    </section>
    
    </div>
  );
}
