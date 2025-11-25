"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditClient({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [testCode, setTestCode] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadClasses();
    loadTestData();
  }, []);

  const loadClasses = async () => {
    const res = await fetch("/api/classes");
    const data = await res.json();
    setClasses(data);
  };

  const loadTestData = async () => {
    const res = await fetch(`/api/tests/${id}`);
    const data = await res.json();

    setClassId(data.test.class_id);
    setTestCode(data.test.test_code);
    setVideoLink(data.test.video_link);
    setTotalQuestions(data.test.total_questions);

    setQuestions(
      data.questions.map((q) => ({
        id: q.id,
        title: q.title,
        image_url: q.image_url,
        choice1: q.question_choice1,
        choice2: q.question_choice2,
        choice3: q.question_choice3,
        choice4: q.question_choice4,
        correct_answer: q.correct_answer,
      }))
    );

    setLoading(false);
  };

const saveChanges = async () => {
  const updatedQuestions = [];

  for (const q of questions) {
    let imageUrl = q.image_url;

    if (q.newImage) {
      const formData = new FormData();
      formData.append("image", q.newImage);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    updatedQuestions.push({
      ...q,
      image_url: imageUrl,
    });
  }

  const res = await fetch("/api/tests/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      test_id: id,
      class_id: classId,
      test_code: testCode,
      video_link: videoLink,
      total_questions: totalQuestions,
      questions: updatedQuestions,
    }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Updated Successfully!");
    router.push("/admin-dashboard/tests");
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Test</h1>
      <label className="font-medium">Select Class *</label>
      <select
        className="border p-2 w-full mb-4"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
      >
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.class_name}
          </option>
        ))}
      </select>

      <label className="font-medium">Test Code *</label>
      <input
        className="border p-2 w-full mb-4"
        value={testCode}
        onChange={(e) => setTestCode(e.target.value)}
      />
      <label className="font-medium">Video Link *</label>
      <input
        className="border p-2 w-full mb-4"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
      />

      <label className="font-medium">Total Questions *</label>
      <input
        type="number"
        className="border p-2 w-full mb-4"
        value={totalQuestions}
        onChange={(e) => setTotalQuestions(Number(e.target.value))}
      />

      <h2 className="text-lg font-semibold mt-6 mb-3">Questions</h2>

      {questions.map((q, i) => (
        <div key={i} className="border p-4 mb-4 rounded bg-gray-50">
          <label className="font-medium">Title</label>
          <input
            className="border p-2 w-full mb-3"
            value={q.title}
            onChange={(e) => {
              const arr = [...questions];
              arr[i].title = e.target.value;
              setQuestions(arr);
            }}
          />
          <label className="font-medium">Image</label>
              <input
                type="file"
                accept="image/*"
                className="border p-2 w-full mb-3"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const arr = [...questions];
                  arr[i].newImage = file; 
                  setQuestions(arr);
                }}
              />
              {q.image_url && (
                <img src={q.image_url} alt="Question" className="w-32 mt-2 rounded" />
              )}

          {["choice1", "choice2", "choice3", "choice4"].map((key, idx) => (
            <div key={idx} className="mb-2">
              <label>{key}</label>
              <input
                className="border p-2 w-full"
                value={q[key]}
                onChange={(e) => {
                  const arr = [...questions];
                  arr[i][key] = e.target.value;
                  setQuestions(arr);
                }}
              />
            </div>
          ))}
          <label className="font-medium">Correct Answer (1–4)</label>
          <input
            type="number"
            min="1"
            max="4"
            className="border p-2 w-20"
            value={q.correct_answer}
            onChange={(e) => {
              const arr = [...questions];
              arr[i].correct_answer = Number(e.target.value);
              setQuestions(arr);
            }}
          />
        </div>
      ))}

      <button
        onClick={saveChanges}
        className="bg-green-600 text-white p-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
