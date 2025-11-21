"use client";

export default function QuestionCard({ set, index, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden border border-gray-200">
      <div className="bg-black p-4">
        <h3 className="text-white font-bold text-lg">Video {index + 1} Questions</h3>
        <p className="text-white text-sm mt-1">{set.questions.length} Questions</p>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Video Link</p>
          <p className="text-sm text-gray-700 truncate">{set.videoLink}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 bg-[#3690e5] text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
