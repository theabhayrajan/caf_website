"use client";

import { useState, useEffect, useRef } from 'react';

export default function StepForm({ onSubmit, onCancel, initialData }) {
  const [videoLink, setVideoLink] = useState('');
  const [questionCount, setQuestionCount] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const stepRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  // Initialize form with existing data when editing
  useEffect(() => {
    if (initialData) {
      setVideoLink(initialData.videoLink);
      setQuestionCount(initialData.questions.length.toString());
      setQuestions(initialData.questions);
      setCurrentStep(1);
      setIsEditMode(true);
    }
  }, [initialData]);

  //FIXED: Scroll to current step with delay for mobile
  useEffect(() => {
    if (currentStep > 0 && stepRefs.current[currentStep - 1] && scrollContainerRef.current) {
      // Add delay to ensure DOM is ready
      setTimeout(() => {
        const stepElement = stepRefs.current[currentStep - 1];
        const container = scrollContainerRef.current;
        
        if (stepElement && container) {
          const containerWidth = container.offsetWidth;
          const stepLeft = stepElement.offsetLeft;
          const stepWidth = stepElement.offsetWidth;
          
          // Calculate scroll position to center the step
          const scrollPosition = stepLeft - (containerWidth / 2) + (stepWidth / 2);
          
          container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [currentStep]);

  const handleQuestionCountInput = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setQuestionCount(value);
    }
  };

  const handleQuestionCountSubmit = () => {
    const count = parseInt(questionCount);
    if (count > 0 && count <= 100) {
      const currentCount = questions.length;
      
      if (count > currentCount) {
        const newQuestions = Array.from({ length: count - currentCount }, () => ({
          title: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          image: null,
          imagePreview: null
        }));
        setQuestions([...questions, ...newQuestions]);
      } else if (count < currentCount) {
        setQuestions(questions.slice(0, count));
      }
      
      setCurrentStep(1);
    } else if (count > 100) {
      alert('Maximum 100 questions allowed per video');
    } else {
      alert('Please enter a valid number greater than 0');
    }
  };

  const handleQuestionChange = (field, value) => {
    const updated = [...questions];
    updated[currentStep - 1] = {
      ...updated[currentStep - 1],
      [field]: value
    };
    setQuestions(updated);
    
    if (validationErrors[field]) {
      const newErrors = { ...validationErrors };
      delete newErrors[field];
      setValidationErrors(newErrors);
    }
  };

  const handleOptionChange = (optionIndex, value) => {
    const updated = [...questions];
    updated[currentStep - 1].options[optionIndex] = value;
    setQuestions(updated);
    
    if (validationErrors[`option-${optionIndex}`]) {
      const newErrors = { ...validationErrors };
      delete newErrors[`option-${optionIndex}`];
      setValidationErrors(newErrors);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const updated = [...questions];
        updated[currentStep - 1] = {
          ...updated[currentStep - 1],
          image: file,
          imagePreview: event.target.result
        };
        setQuestions(updated);
      };
      
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleRemoveImage = () => {
    const updated = [...questions];
    updated[currentStep - 1] = {
      ...updated[currentStep - 1],
      image: null,
      imagePreview: null
    };
    setQuestions(updated);
  };

  const validateCurrentQuestion = () => {
    const current = questions[currentStep - 1];
    const errors = {};

    if (!current.title.trim()) {
      errors.title = 'Question title is required';
    }

    current.options.forEach((option, index) => {
      if (!option.trim()) {
        errors[`option-${index}`] = `Option ${String.fromCharCode(65 + index)} is required`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (currentStep < questions.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    setValidationErrors({});
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(0);
    }
  };

  const handleSubmit = () => {
    if (validateCurrentQuestion()) {
      const formData = {
        videoLink,
        questions
      };
      onSubmit(formData);
    }
  };

  const getVisibleSteps = () => {
    const totalSteps = questions.length;
    const maxVisible = 7;
    
    if (totalSteps <= maxVisible) {
      return Array.from({ length: totalSteps }, (_, i) => i + 1);
    }
    
    let start = Math.max(1, currentStep - Math.floor(maxVisible / 2));
    let end = Math.min(totalSteps, start + maxVisible - 1);
    
    if (end === totalSteps) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    const steps = [];
    
    if (start > 1) {
      steps.push(1);
      if (start > 2) steps.push('...');
    }
    
    for (let i = start; i <= end; i++) {
      steps.push(i);
    }
    
    if (end < totalSteps) {
      if (end < totalSteps - 1) steps.push('...');
      steps.push(totalSteps);
    }
    
    return steps;
  };

  if (currentStep === 0) {
    return (
      <div className="bg-white shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditMode ? 'Edit Video and Questions' : 'Add Video and Questions'}
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm xl:text-base font-semibold text-gray-700 mb-2">
              Video Link
            </label>
            <input
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#6ebdfc] focus:border-transparent outline-none"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div>
            <label className="block text-sm xl:text-base font-semibold text-gray-700 mb-2">
              Number of Questions
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={questionCount}
              onChange={handleQuestionCountInput}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#6ebdfc] focus:border-transparent outline-none text-lg"
              placeholder="Enter number of questions (max 100)"
              maxLength="3"
            />
            {questionCount && parseInt(questionCount) > 0 && parseInt(questionCount) <= 100 && (
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                {questionCount} question{parseInt(questionCount) > 1 ? 's' : ''} will be created
              </p>
            )}
            {questionCount && parseInt(questionCount) > 100 && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                Maximum 100 questions allowed
              </p>
            )}
            {isEditMode && questions.length > 0 && (
              <p className="text-sm text-blue-600 mt-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                Current: {questions.length} questions. You can increase or decrease.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-3 font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleQuestionCountSubmit}
              disabled={!videoLink || !questionCount || parseInt(questionCount) <= 0 || parseInt(questionCount) > 100}
              className="flex-1 bg-[#3690e5] text-white py-3 font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditMode ? 'Update & Continue' : 'Start Adding Questions'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep - 1];
  const totalSteps = questions.length;
  const visibleSteps = getVisibleSteps();

  return (
    <div className="bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              setValidationErrors({});
              setCurrentStep(0);
            }}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>

          <div className="bg-white px-4 py-2 shadow-md">
            <h3 className="text-emerald-600 font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              Question Form
            </h3>
          </div>

          <div className="text-white text-sm font-semibold">
            {currentStep} / {totalSteps}
          </div>
        </div>

        {/* FIXED: Progress Steps with Proper Mobile Scroll & Padding */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 pt-2 px-2 -mx-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex items-center justify-center gap-2 min-w-min">
            {visibleSteps.map((step, index) => {
              if (step === '...') {
                return (
                  <div key={`ellipsis-${index}`} className="text-white font-bold px-2 flex-shrink-0">
                    ...
                  </div>
                );
              }
              
              return (
                <div key={step} className="flex items-center flex-shrink-0">
                  <button
                    ref={(el) => (stepRefs.current[step - 1] = el)}
                    onClick={() => {
                      setValidationErrors({});
                      setCurrentStep(step);
                    }}
                    className={`min-w-[44px] h-11 rounded-full flex items-center justify-center font-semibold transition-all px-3 ${
                      step < currentStep ? 'bg-emerald-500 text-white shadow-md' :
                      step === currentStep ? 'bg-white text-emerald-600 ring-4 ring-white/30 scale-110 shadow-lg' :
                      'bg-emerald-200 text-emerald-700 hover:bg-emerald-300'
                    }`}
                  >
                    {step}
                  </button>
                  {index < visibleSteps.length - 1 && visibleSteps[index + 1] !== '...' && (
                    <div className={`w-8 h-1 ${step < currentStep ? 'bg-emerald-500' : 'bg-emerald-200'}`}/>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Label */}
      <div className="bg-emerald-50 py-3 text-center">
        <p className="text-emerald-700 font-semibold">Step {currentStep} of {totalSteps}</p>
      </div>

      {/* Validation Error Banner */}
      {Object.keys(validationErrors).length > 0 && (
        <div className="bg-red-50 border-b-2 border-red-200 px-6 py-3">
          <p className="text-red-700 text-sm font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            Please fill all required fields before proceeding
          </p>
        </div>
      )}

      {/* Form Content */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Question Form */}
          <div className="space-y-6 order-2 lg:order-1">
            <div>
              <label className="block text-sm xl:text-base font-semibold text-gray-700 mb-2">
                Question Title <span className="text-red-500">*</span>
              </label>
              <textarea
                value={currentQuestion.title}
                onChange={(e) => handleQuestionChange('title', e.target.value)}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none transition-colors ${
                  validationErrors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                rows="3"
                placeholder="Type your question here..."
              />
              {validationErrors.title && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {validationErrors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm xl:text-base font-semibold text-gray-700 mb-3">
                Options (Multiple Choice) <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex items-center h-12">
                      <input
                        type="radio"
                        name={`correct-answer-${currentStep}`}
                        checked={currentQuestion.correctAnswer === index}
                        onChange={() => handleQuestionChange('correctAnswer', index)}
                        className="w-5 h-5 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs xl:text-base text-gray-500 mb-1">
                        {String.fromCharCode(65 + index)}.
                      </label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className={`w-full px-4 py-3 border focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-colors ${
                          validationErrors[`option-${index}`] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      />
                      {validationErrors[`option-${index}`] && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors[`option-${index}`]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  Select the radio button for the correct answer
                </span>
              </p>
            </div>

            <div className="lg:hidden">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Question Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-semibold hover:file:bg-emerald-100 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Side - Image Upload & Preview */}
          <div className="space-y-4 order-1 lg:order-2">
            <div className="hidden lg:block">
              <label className="block text-sm xl:text-base font-semibold text-gray-700 mb-2">
                Question Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-semibold hover:file:bg-emerald-100 cursor-pointer"
              />
            </div>

            <div className="relative w-full overflow-hidden border-2 border-dashed border-[#6ebdfc] bg-gray-50" style={{ aspectRatio: '4 / 3' }}>
              {currentQuestion.imagePreview ? (
                <>
                  <img
                    src={currentQuestion.imagePreview}
                    alt="Question preview"
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ objectFit: 'contain' }}
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 z-10 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                    type="button"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 text-sm font-semibold">No image selected</p>
                  <p className="text-gray-400 text-xs mt-1">Upload an image to preview (4:3 ratio)</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-3 font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-[#3690e5] text-white py-3 font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isEditMode ? 'Update Question Set' : 'Save Question Set'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
