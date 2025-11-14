"use client";
import Image from "next/image";

export default function FooterSection() {
  return (
    <footer className="bg-[#1E1E1E] text-gray-300 py-12">
      {/* Top Quote Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-10 pb-10">
        {/* Image */}
        <div className="flex-shrink-0 p-[10px]">
          <Image
            src="/footer.svg"
            alt="Urie Bronfenbrenner"
            width={260}
            height={180}
            className="object-cover grayscale w-full h-full"
          />
        </div>

        {/* Quote and Author */}
        <div className="flex flex-col w-full gap-10">
          {/* Quote */}
          <p className="text-[#C1C1C1] leading-relaxed mb-4 text-sm lg:text-2xl">
            In order to develop—intellectually, emotionally, socially—a child
            requires participation in progressively more complex activities,
            typically with one or more adults who have an irrational emotional
            attachment to the child.
          </p>

          {/* Author info aligned right but text left */}
          <div className="flex flex-col md:items-end items-center">
            <div className="text-left">
              <h3 className="text-white font-semibold text-[24px]">
                -Urie Bronfenbrenner (1917–2005)
              </h3>
              <p className=" text-[#C1C1C1] text-sm lg:text-xl">
                Developmental Psychologist, Researcher, and Professor <br />
                (Cornell University)
              </p>
            </div>
          </div>
        </div>
      </div>

<div className="w-full h-[0.4px] bg-[#C1C1C1] opacity-5"></div>


      {/* Bottom Footer Links */}
      <div className="max-w-5xl mx-auto px-6 mt-10 lg:mt-12 flex flex-col items-center justify-between text-sm lg:text-xl text-[#8F8F8F] space-y-15">
        <div className="flex space-x-8">
          <a href="#" className="hover:text-white transition">
            About
          </a>
          <a href="#" className="hover:text-white transition">
            Contact Us
          </a>
        </div>
        <p className="text-[#8F8F8F]">@2025 CognitiveAllianceForumz</p>
      </div>
    </footer>
  );
}
