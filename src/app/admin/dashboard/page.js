"use client";

import { useState } from "react";
import SuperAdminHeader from "@/components/SuperAdminHeader";
import StepForm from "@/components/StepForm";

// Static class options
const CLASS_OPTIONS = [
  { value: "", label: "All Classes" },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: `class-${i + 1}`,
    label: `Class ${i + 1}`,
  })),
];

export default function AdminDashboard() {
  const [selectedClass, setSelectedClass] = useState("");
  const [testCode, setTestCode] = useState("");
  const [questionSets, setQuestionSets] = useState([]);
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [editingSetIndex, setEditingSetIndex] = useState(null);
  const [showValidationError, setShowValidationError] = useState(false);

  const isFormValid = selectedClass !== "" && testCode.trim() !== "";

  // Filter for display by class
  const displayedSets =
    selectedClass === ""
      ? questionSets
      : questionSets.filter((set) => set.class === selectedClass);

  const handleAddQuestionClick = () => {
    if (!isFormValid) {
      setShowValidationError(true);
      setTimeout(() => setShowValidationError(false), 3000);
      return;
    }
    setShowValidationError(false);
    setShowNewQuestionForm(true);
    setEditingSetIndex(null);
  };

  const handleAddQuestionSet = (newSet) => {
    if (editingSetIndex !== null) {
      const updated = [...questionSets];
      updated[editingSetIndex] = {
        ...newSet,
        class: selectedClass,
        testCode: testCode,
      };
      setQuestionSets(updated);
      setEditingSetIndex(null);
    } else {
      setQuestionSets([
        ...questionSets,
        {
          ...newSet,
          class: selectedClass,
          testCode: testCode,
        },
      ]);
    }
    setShowNewQuestionForm(false);
  };

  const handleEditQuestionSet = (index) => {
    setEditingSetIndex(index);
    setShowNewQuestionForm(true);
  };

  const handleDeleteQuestionSet = (index) => {
    const setToDelete = displayedSets[index];
    setQuestionSets((prev) =>
      prev.filter((item, i) =>
        selectedClass
          ? !(item.class === selectedClass && displayedSets.indexOf(item) === index)
          : displayedSets.indexOf(item) !== index
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminHeader />
      <div className="max-w-7xl mx-auto p-6">
        {/* Filters */}
        <div className="bg-white shadow-md px-6 py-4.5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm xl:text-base font-semibold text-gray-700 mb-2">
                Select Class <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setShowValidationError(false);
                }}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-[#6ebdfc] focus:border-transparent outline-none transition-colors ${showValidationError && !selectedClass
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  }`}
              >
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls.value} value={cls.value}>
                    {cls.label}
                  </option>
                ))}
              </select>
              {showValidationError && !selectedClass && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  Please select a class
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm xl:text-base font-semibold text-gray-700 mb-2">
                Test Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={testCode}
                onChange={(e) => {
                  setTestCode(e.target.value);
                  setShowValidationError(false);
                }}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-[#6ebdfc] focus:border-transparent outline-none transition-colors ${showValidationError && !testCode.trim()
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  }`}
                placeholder="Enter unique test code (e.g., TEST001)"
              />
              {showValidationError && !testCode.trim() && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  Please enter a test code
                </p>
              )}
            </div>
          </div>
          {/* Status Indicator */}
          {isFormValid && (
            <div className="mt-2 flex items-center gap-2 text-green-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[0.8rem] sm:text-sm font-medium">
                Ready to add questions for <strong>{selectedClass.replace('-', ' ').toUpperCase()}</strong> - <strong>{testCode}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Add New Question Set */}
        {!showNewQuestionForm && (
          <div className="mb-6">
            <button
              onClick={handleAddQuestionClick}
              disabled={!isFormValid}
              className={`px-6 py-3 transition-all duration-200 flex items-center gap-2 ${isFormValid
                  ? "bg-[#3690e5] text-white xl:text-lg hover:shadow-lg cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Question Set
            </button>
            {showValidationError && (
              <p className="mt-3 text-red-600">
                Please select both class and test code to add questions.
              </p>
            )}
          </div>
        )}

        {/* Step Form */}
        {showNewQuestionForm && (
          <div className="mb-6">
            <StepForm
              onSubmit={handleAddQuestionSet}
              onCancel={() => {
                setShowNewQuestionForm(false);
                setEditingSetIndex(null);
              }}
              initialData={editingSetIndex !== null ? displayedSets[editingSetIndex] : null}
              selectedClass={selectedClass}
              testCode={testCode}
            />
          </div>
        )}

        {/* Question Sets Table */}
        {displayedSets.length > 0 && !showNewQuestionForm && (
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Created Question Sets</h2>
            <div className="bg-white shadow-md overflow-hidden">
              {displayedSets.map((set, index) => {
                // === Proper per-class video numbering ===
                const classSets = displayedSets.filter(s => s.class === set.class);
                const videoNum = classSets.findIndex(s => s === set) + 1;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {/* Left Side - Info */}
                    <div className="flex items-center gap-6 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#3690e5] text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Video {videoNum} Questions of {set.class.replace("class-", "Class ")}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {set.questions?.length || 0} Questions
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-xs text-gray-500">Video Link</p>
                        <p className="text-sm text-gray-700 truncate max-w-xs">
                          {set.videoLink}
                        </p>
                      </div>
                    </div>
                    {/* Right Side - Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditQuestionSet(index)}
                        className="bg-[#3690e5] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                      >
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteQuestionSet(index)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                      >
                        <span>Delete</span>
                      </button>
                    </div>

                  </div>
                );
              })} v
            </div>
          </div>
        )}
        {displayedSets.length === 0 && (
          <div className="text-center py-12 text-gray-400">No question sets found.</div>
        )}
      </div>
    </div>
  );
}
