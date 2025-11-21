"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../../components/Header";
import toast from "react-hot-toast";

export default function OTPLoginStatic() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [accreditation, setAccreditation] = useState("");
    const [testCode, setTestCode] = useState("");
    const [website, setWebsite] = useState("");
    const [agreeToMembership, setAgreeToMembership] = useState(false);
    const [agreeToService, setAgreeToService] = useState(false);
    const [errors, setErrors] = useState({});
    const [experience, setExperience] = useState("");

    // Prevent body scroll only on large screens (lg breakpoint = 1024px)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                document.body.style.overflow = "hidden";
                document.body.style.height = "100vh";
            } else {
                document.body.style.overflow = "auto";
                document.body.style.height = "auto";
            }
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        };
    }, []);

    const validateForm = () => {
        const formErrors = {};
        if (!name.trim()) formErrors.name = "Name is required.";
        if (!grade.trim()) formErrors.grade = "City is required.";
        if (!accreditation.trim()) formErrors.accreditation = "Pin code is required.";
        if (!testCode.trim()) formErrors.testCode = "Occupation is required.";
        if (!agreeToMembership) formErrors.agree1 = "You must agree to become a member of CAF.";
        if (!agreeToService) formErrors.agree2 = "You must agree to become a member of CAF.";
        if (!website.trim()) formErrors.website = "Website Link is required.";
        if (!experience.trim()) formErrors.website = "Experience is required.";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        toast.success("Details submitted successfully!");

        setTimeout(() => {
            router.push("/memberlogin/psychologistspolicy");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col xl:overflow-hidden">
            <Header />
            <div className="flex-1 flex items-center justify-center px-4 overflow-y-auto lg:overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center w-full max-w-9xl py-6 lg:py-0">
                    {/* Image for small screens */}
                    <div className="flex lg:hidden items-center justify-center mt-5">
                        <Image
                            src="/principallogin.png"
                            alt="Illustration"
                            width={360}
                            height={300}
                            className="max-h-[300px] sm:max-h-[320px] md:max-h-[350px] w-90 object-contain"
                            priority
                        />
                    </div>

                    {/* Left Section */}
                    <div className="flex flex-col justify-center px-8 md:px-20 w-full sm:w-150 ml-5 mt-5 md:mt-10 lg:mt-0 lg:ml-0 xl:ml-10">
                        <h1 className="text-lg md:text-xl font-semibold mb-10 lg:mb-7 text-black lg:whitespace-nowrap">
                            If you are using it for the first time, Enter the below details
                        </h1>

                        <form onSubmit={handleSubmit}>
                            {/* Principal Name */}
                            <div className="flex flex-col gap-2 mb-10">
                                <label className="block text-[1.05rem] font-medium text-black">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-[100%] lg:w-[80%] border ${errors.name ? "border-red-500" : "border-gray-300"
                                        } p-3 py-4 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400`}
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>

                            {/* Occupation */}
                            <div className="flex flex-col md:flex-row gap-8 mb-10 xl:w-[550px]">

                                <div className="flex flex-col gap-2 mb-0">
                                    <label className="block text-[1.05rem] font-medium text-black">
                                        Occupation
                                    </label>
                                    <input
                                        type="text"
                                        value={testCode}
                                        onChange={(e) => setTestCode(e.target.value)}
                                        className={`w-[100%] md:w-[275px] lg:w-[240px] xl:w-[350px] border ${errors.testCode ? "border-red-500" : "border-gray-300"
                                            } p-3 py-4 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400`}
                                    />
                                    {errors.testCode && (
                                        <p className="text-xs text-red-500">{errors.testCode}</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 mb-0">
                                    <label className="block text-[1.05rem] font-medium text-black">
                                        Experience (years)
                                    </label>
                                    <input
                                        type="number"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className={`w-[100%] md:w-[150px] lg:w-[80px] border ${errors.experience ? "border-red-500" : "border-gray-300"
                                            } p-3 py-4 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400`}
                                    />
                                    {errors.experience && (
                                        <p className="text-xs text-red-500">{errors.experience}</p>
                                    )}
                                </div>

                            </div>

                            {/* City + Pin code */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-0 mb-10 lg:w-[350px]">
                                <div className="flex-1">
                                    <label className="block text-[1.05rem] font-medium text-black">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                        className={`w-[100%] md:w-[275px] lg:w-[220px] border ${errors.grade ? "border-red-500" : "border-gray-300"
                                            } p-3 py-4 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400`}
                                    />
                                    {errors.grade && <p className="text-xs text-red-500">{errors.grade}</p>}
                                </div>

                                <div>
                                    <label className="block text-[1.05rem] font-medium text-black">
                                        Pin code
                                    </label>
                                    <input
                                        type="number"
                                        value={accreditation}
                                        onChange={(e) => setAccreditation(e.target.value)}
                                        className={`w-[100%] md:w-[150px] lg:w-[120px] border ${errors.accreditation ? "border-red-500" : "border-gray-300"
                                            } px-5 py-4 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400`}
                                    />
                                    {errors.accreditation && (
                                        <p className="text-xs text-red-500">{errors.accreditation}</p>
                                    )}
                                </div>
                            </div>

                            {/* Membership Checkbox */}
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex gap-5 items-start">
                                    <input
                                        type="checkbox"
                                        name="agree1"
                                        id="agree1"
                                        checked={agreeToMembership}
                                        onChange={(e) => setAgreeToMembership(e.target.checked)}
                                        className="w-6 h-6 mt-1"
                                    />
                                    <label htmlFor="agree1" className="text-lg">
                                        I will be a member of CAF.
                                    </label>
                                </div>
                                {errors.agree1 && <p className="text-xs text-red-500 ml-11">{errors.agree1}</p>}
                            </div>
                            <div className="flex flex-col gap-2 mb-7">
                                <div className="flex gap-5 items-start">
                                    <input
                                        type="checkbox"
                                        name="agree2"
                                        id="agree2"
                                        checked={agreeToService}
                                        onChange={(e) => setAgreeToService(e.target.checked)}
                                        className="w-6 h-6 mt-1"
                                    />
                                    <label htmlFor="agree2" className="text-lg">
                                        I will also provide counselling service
                                    </label>
                                </div>
                                {errors.agree2 && <p className="text-xs text-red-500 ml-11">{errors.agree2}</p>}
                            </div>
                            <div className="flex flex-col gap-2 mb-10">
                                <label className="block text-[1.05rem] font-medium text-black">
                                    Website link for councelling
                                </label>
                                <input
                                    type="text"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    className={`w-[100%] lg:w-[120%] border ${errors.website ? "border-red-500" : "border-gray-300"
                                        } p-3 py-4 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400`}
                                />
                                {errors.website && <p className="text-xs text-red-500">{errors.website}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-[100%] lg:w-[80%] py-4 bg-[#6ebdfc] hover:bg-sky-400 text-white text-[1.2rem] transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Right Section - Image */}
                    <div className="hidden lg:flex items-center justify-center">
                        <Image
                            src="/principallogin.png"
                            alt="Illustration"
                            width={540}
                            height={420}
                            className="max-h-[420px] 2xl:max-h-[500px] w-135 object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
