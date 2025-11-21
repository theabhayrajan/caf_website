"use client";

import { useState } from 'react';
import StepForm from '@/components/StepForm';
import SuperAdminHeader from '@/components/SuperAdminHeader';

export default function AdminDashboard() {
  const [selectedClass, setSelectedClass] = useState('');
  const [testCode, setTestCode] = useState('');
  const [questionSets, setQuestionSets] = useState([]);
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [editingSetIndex, setEditingSetIndex] = useState(null);
  const [showValidationError, setShowValidationError] = useState(false);

  // Validation: Check if class and test code are filled
  const isFormValid = selectedClass !== '' && testCode.trim() !== '';

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

  // BACKEND API CALL - Save Question Set to DB
  const handleAddQuestionSet = async (newSet) => {
    const dataToSave = {
      class: selectedClass,
      testCode: testCode,
      videoLink: newSet.videoLink,
      questions: newSet.questions
    };

    // 🔴 API INTEGRATION POINT #1 - Save/Update Question Set
    // const formData = new FormData();
    // formData.append('class', selectedClass);
    // formData.append('testCode', testCode);
    // formData.append('videoLink', newSet.videoLink);
    // 
    // newSet.questions.forEach((q, qIndex) => {
    //   formData.append(`questions[${qIndex}][title]`, q.title);
    //   formData.append(`questions[${qIndex}][options]`, JSON.stringify(q.options));
    //   formData.append(`questions[${qIndex}][correctAnswer]`, q.correctAnswer);
    //   if (q.image) {
    //     formData.append(`questions[${qIndex}][image]`, q.image);
    //   }
    // });
    // 
    // const endpoint = editingSetIndex !== null ? '/api/admin/update-question-set' : '/api/admin/create-question-set';
    // const response = await fetch(endpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: formData
    // });
    // 
    // const result = await response.json();
    // if (result.success) {
    //   if (editingSetIndex !== null) {
    //     const updated = [...questionSets];
    //     updated[editingSetIndex] = { ...newSet, id: result.data.id };
    //     setQuestionSets(updated);
    //   } else {
    //     setQuestionSets([...questionSets, { ...newSet, id: result.data.id }]);
    //   }
    //   setEditingSetIndex(null);
    //   setShowNewQuestionForm(false);
    // } else {
    //   alert('Error: ' + result.message);
    // }

    // Temporary: Local state update for frontend testing
    if (editingSetIndex !== null) {
      const updated = [...questionSets];
      updated[editingSetIndex] = newSet;
      setQuestionSets(updated);
      setEditingSetIndex(null);
    } else {
      setQuestionSets([...questionSets, newSet]);
    }
    setShowNewQuestionForm(false);
  };

  const handleEditQuestionSet = (index) => {
    setEditingSetIndex(index);
    setShowNewQuestionForm(true);
  };

  // BACKEND API CALL - Delete Question Set from DB
  const handleDeleteQuestionSet = async (index) => {
    if (!confirm('Are you sure you want to delete this question set?')) return;

    const setToDelete = questionSets[index];

    // 🔴 API INTEGRATION POINT #2 - Delete Question Set
    // const response = await fetch('/api/admin/delete-question-set', {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: JSON.stringify({ id: setToDelete.id })
    // });
    // 
    // const result = await response.json();
    // if (result.success) {
    //   const updated = questionSets.filter((_, i) => i !== index);
    //   setQuestionSets(updated);
    // } else {
    //   alert('Error: ' + result.message);
    // }

    // Temporary: Local state update
    const updated = questionSets.filter((_, i) => i !== index);
    setQuestionSets(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminHeader />

      <div className="max-w-7xl mx-auto p-6">
        {/* Class and Test Code Selection */}
        <div className="bg-white shadow-md p-6 mb-6">
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
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-[#6ebdfc] focus:border-transparent outline-none transition-colors ${
                  showValidationError && !selectedClass
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300'
                }`}
              >
                <option value="">Choose a class</option>
                <option value="class-1">Class 1</option>
                <option value="class-2">Class 2</option>
                <option value="class-3">Class 3</option>
                <option value="class-4">Class 4</option>
                <option value="class-5">Class 5</option>
                <option value="class-6">Class 6</option>
                <option value="class-7">Class 7</option>
                <option value="class-8">Class 8</option>
                <option value="class-9">Class 9</option>
                <option value="class-10">Class 10</option>
                <option value="class-11">Class 11</option>
                <option value="class-12">Class 12</option>
              </select>
              {showValidationError && !selectedClass && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
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
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-[#6ebdfc] focus:border-transparent outline-none transition-colors ${
                  showValidationError && !testCode.trim()
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300'
                }`}
                placeholder="Enter unique test code (e.g., TEST001)"
              />
              {showValidationError && !testCode.trim() && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Please enter a test code
                </p>
              )}
            </div>
          </div>

          {/* Status Indicator */}
          {isFormValid && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 flex items-center gap-2 text-green-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">
                Ready to add questions for <strong>{selectedClass.replace('-', ' ').toUpperCase()}</strong> - <strong>{testCode}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Step Form */}
        {showNewQuestionForm && (
          <div className="mb-6">
            <StepForm
              onSubmit={handleAddQuestionSet}
              onCancel={() => {
                setShowNewQuestionForm(false);
                setEditingSetIndex(null);
              }}
              initialData={editingSetIndex !== null ? questionSets[editingSetIndex] : null}
              selectedClass={selectedClass}
              testCode={testCode}
            />
          </div>
        )}

        {/* Question Sets Display - Table-like Horizontal Rows */}
        {questionSets.length > 0 && !showNewQuestionForm && (
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Created Question Sets</h2>
            
            <div className="bg-white shadow-md overflow-hidden">
              {questionSets.map((set, index) => (
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
                          Video {index + 1} Questions
                        </h3>
                        <p className="text-sm text-gray-500">
                          {set.questions.length} Questions
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
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteQuestionSet(index)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔥 Add New Question Button - MOVED HERE (Below Question Cards) */}
        {!showNewQuestionForm && (
          <div className="mb-6">
            <button
              onClick={handleAddQuestionClick}
              disabled={!isFormValid}
              className={`px-6 py-3 transition-all duration-200 flex items-center gap-2 ${
                isFormValid
                  ? 'bg-[#3690e5] text-white xl:text-lg hover:shadow-lg cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Question Set
              {!isFormValid && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Validation Message */}
            {showValidationError && (
              <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-pulse">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-red-800 font-semibold">Required Information Missing</p>
                  <p className="text-red-600 text-sm mt-1">
                    Please select a class and enter a test code before adding questions.
                  </p>
                </div>
              </div>
            )}

            {!isFormValid && !showValidationError && (
              <p className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Complete the class and test code fields above to start adding questions
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
