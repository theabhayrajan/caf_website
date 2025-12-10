"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";

const mockTests = [
    {
        id: "hdi-kids",
        title: "HDI Assessments for kids",
        subtitle: "Empowering Growth Through Holistic Evaluations",
        priceLabel: "Free",
    },
    {
        id: "hdi-kids1",
        title: "HDI Assessments for kids",
        subtitle: "Empowering Growth Through Holistic Evaluations",
        priceLabel: "Free",
    },
    {
        id: "hdi-kids2",
        title: "HDI Assessments for kids",
        subtitle: "Empowering Growth Through Holistic Evaluations",
        priceLabel: "Free",
    },
     {
        id: "hdi-kids4",
        title: "HDI Assessments for kids",
        subtitle: "Empowering Growth Through Holistic Evaluations",
        priceLabel: "Free",
    },
     {
        id: "hdi-kids5",
        title: "HDI Assessments for kids",
        subtitle: "Empowering Growth Through Holistic Evaluations",
        priceLabel: "Free",
    },
];

export default function TestsPage() {
    const [openModalFor, setOpenModalFor] = useState(null);
    const [testCode, setTestCode] = useState("");

    const handleNext = () => {
        if (!testCode.trim()) return;
        window.location.href = `/tests/${openModalFor}?code=${encodeURIComponent(
            testCode.trim()
        )}`;
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-[#f6f7fb]">
                {/* top strip with button */}
                <div className="flex flex-col items-center justify-between gap-5 px-10 py-4">
                    <div className="flex justify-end self-end mt-5">

                        <button className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
                            <span className="inline-flex h-7 w-7 items-center mr-2 justify-center overflow-hidden">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_PROD_URL}/result.png`}
                                    alt="User avatar"
                                    width={36}
                                    height={36}
                                    className="object-cover"
                                />
                            </span>
                            <span className="font-bold text-[1rem]">My previous Result</span>
                        </button>
                    </div>
                    <div className="bg-[#8f8f8f] h-0.5 w-full">

                    </div>

                </div>

                {/* line + Add new kid */}
                <div className="px-10 pt-3 pb-2 flex items-center justify-between">
                    <div className="flex-1 bg-gray-200 mr-4" />
                    <Link
                        href="/evaluation/kidsedit"
                        className="rounded-md bg-[#3690e5] border border-gray-300 px-4 py-3 text-base font-medium text-white hover:bg-[#5eb1ff]"
                    >
                        + Add New Kid
                    </Link>
                </div>

                {/* content area */}
                {/* content area */}
                <main className="px-10 py-10">
                    {/* grid wrapper: small = 1 col, md+ = 3 col */}
                    <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 2x:gap-0">
                        {mockTests.map((test) => (
                            <article
                                key={test.id}
                                className=" bg-white border border-gray-200 px-10 py-8 rounded-lg w-full max-w-[420px] mx-auto"
                            >
                                {/* title + pill */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {test.title}
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {test.subtitle}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-[#3690e5] px-4 py-1 text-[0.8rem] text-white">
                                        {test.priceLabel}
                                    </span>
                                </div>

                                {/* image */}
                                <div className="mb-6 flex justify-start">
                                    <div className="relative w-[220px] h-[160px] rounded-lg overflow-hidden">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_PROD_URL}/image 64.png`}
                                            alt="HDI kids illustration"
                                            fill
                                            className="object-contain"
                                            sizes="220px"
                                        />
                                    </div>
                                </div>

                                {/* text */}
                                <div className="mb-6 text-xs leading-relaxed text-gray-800">
                                    <p className="font-semibold mb-1 text-[0.9rem]">✨ Why Take This Test?</p>
                                    <p className="mb-1 text-[0.9rem] xl:px-2">Taking this test helps:</p>
                                    <ul className="list-disc pl-5 space-y-0.5 text-[0.9rem] xl:px-4">
                                        <li>You understand yourself better</li>
                                        <li>
                                            Parents and educators support your learning style and emotions
                                        </li>
                                        <li>
                                            Build your Holistic Development Index (HDI) — a measure of your
                                            social and emotional growth
                                        </li>
                                    </ul>
                                </div>

                                {/* button */}
                                <button
                                    onClick={() => {
                                        setOpenModalFor(test.id);
                                        setTestCode("");
                                    }}
                                    className="w-full h-11 rounded-sm bg-black text-sm font-medium text-white hover:bg-gray-900"
                                >
                                    Take Test
                                </button>
                            </article>
                        ))}
                    </div>
                </main>


                {/* modal same as before */}
                {openModalFor && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Enter Test Code
                                </h3>
                                <button
                                    className="text-gray-400 hover:text-gray-600"
                                    onClick={() => setOpenModalFor(null)}
                                >
                                    ✕
                                </button>
                            </div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Test Code
                            </label>
                            <input
                                type="text"
                                value={testCode}
                                onChange={(e) => setTestCode(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter code"
                            />

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setOpenModalFor(null)}
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-900"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
