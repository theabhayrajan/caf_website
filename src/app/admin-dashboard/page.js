"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [testCode, setTestCode] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);

  // Fetch classes
  useEffect(() => {
    fetch("/api/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Class fetch error:", err));
  }, []);

  useEffect(() => {
    if (step === 3) {
      setQuestions(
        Array.from({ length: totalQuestions }, () => ({
          title: "",
          image_file: null,
          image_url: "",
          choice1: "",
          choice2: "",
          choice3: "",
          choice4: "",
          correct_answer: 1,
        }))
      );
      setCurrentQ(0);
    }
  }, [step, totalQuestions]);

  const uploadImage = (index, file) => {
    const updated = [...questions];
    updated[index].image_file = file;
    updated[index].image_url = URL.createObjectURL(file);
    setQuestions(updated);
  };

  const handleCreateTest = () => {
    setStep(3);
  };

  const handleSubmitTest = async () => {
    const fd = new FormData();

    fd.append("class_id", classId);
    fd.append("test_code", testCode);
    fd.append("video_link", videoLink);
    fd.append("total_questions", totalQuestions);
    fd.append("questions", JSON.stringify(questions));

    questions.forEach((q, i) => {
      if (q.image_file) {
        fd.append(`image_${i}`, q.image_file);
      }
    });

    const res = await fetch("/api/create-full-test", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (data.success) {
      alert("Test Created Successfully!");
      router.push("/admin-dashboard/tests"); 
    }
  };

  const q = questions[currentQ] || {};

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Test</h1>
      {step === 3 && (
        <div className="flex gap-3 mb-6 justify-center">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`p-2 px-4 rounded-full ${
                currentQ === i ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="bg-white p-6 shadow rounded">
          <label>Select Class *</label>
          <select
            className="border p-2 w-full mb-4"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.class_name}
              </option>
            ))}
          </select>

          <label>Test Code *</label>
          <input
            className="border p-2 w-full mb-4"
            value={testCode}
            onChange={(e) => setTestCode(e.target.value)}
          />

          <button
            disabled={!classId || !testCode}
            onClick={() => setStep(2)}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-6 shadow rounded">
          <label>Video Link *</label>
          <input
            className="border p-2 w-full mb-4"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />

          <label>Total Questions *</label>
          <input
            type="number"
            className="border p-2 w-full mb-4"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(Number(e.target.value))}
          />

          <button
            disabled={!videoLink || totalQuestions < 1}
            onClick={handleCreateTest}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Create Questions
          </button>
        </div>
      )}
      {step === 3 && questions.length > 0 && (
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-6">
            Question {currentQ + 1} of {totalQuestions}
          </h2>

          <input
            className="border p-2 w-full mb-4"
            placeholder="Question Title"
            value={q.title}
            onChange={(e) => {
              const updated = [...questions];
              updated[currentQ].title = e.target.value;
              setQuestions(updated);
            }}
          />
          <input
            type="file"
            onChange={(e) => uploadImage(currentQ, e.target.files[0])}
          />

          {q.image_url && (
            <img
              src={q.image_url}
              className="w-32 h-32 object-cover border rounded mt-3"
            />
          )}

          <div className="mt-4">
            {["A", "B", "C", "D"].map((label, i) => {
              const field = `choice${i + 1}`;
              return (
                <div key={i} className="flex items-center mb-3 gap-3">
                  <div className="w-6 font-semibold">{label}.</div>

                  <input
                    className="border p-2 w-full"
                    value={q[field]}
                    placeholder={`Option ${label}`}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[currentQ][field] = e.target.value;
                      setQuestions(updated);
                    }}
                  />

                  <input
                    type="radio"
                    name="correct"
                    checked={q.correct_answer === i + 1}
                    onChange={() => {
                      const updated = [...questions];
                      updated[currentQ].correct_answer = i + 1;
                      setQuestions(updated);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-6">
            {currentQ > 0 && (
              <button
                onClick={() => setCurrentQ(currentQ - 1)}
                className="bg-gray-400 text-white p-2 rounded"
              >
                Previous
              </button>
            )}

            {currentQ < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQ(currentQ + 1)}
                className="bg-blue-600 text-white p-2 rounded ml-auto"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="bg-green-600 text-white p-2 rounded ml-auto"
              >
                Submit Test
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
