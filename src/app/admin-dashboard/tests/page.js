"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function TestsPage() {
  const router = useRouter();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetch("/api/tests")
      .then((res) => res.json())
      .then((data) => setTests(data));
  }, []);

const deleteTest = async (id) => {
  if (!confirm("Are you sure you want to delete this test?")) return;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  const res = await fetch("/api/tests/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Deleted!");
    setTests(tests.filter((t) => t.id !== id));
  } else {
    alert("Delete failed: " + data.error);
  }
};


  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Created Question Sets</h1>

      {tests.map((t, index) => (
        <div
          key={t.id}
          className="flex items-center justify-between p-4 bg-gray-100 rounded mb-3"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
              {index + 1}
            </div>
            <div>
              <div className="font-semibold">
                Video {index + 1} Questions of {t.class_name}
              </div>
              <div className="text-sm text-gray-600">
                {t.total_questions} Questions
              </div>
              <div className="text-sm text-gray-600">
                Video Link: {t.video_link}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
            onClick={() => router.push(`/admin-dashboard/tests/edit/${t.id}`)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
            >
            Edit
            </button>
                <button
                onClick={() => deleteTest(t.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
                >
                Delete
                </button>

          </div>
        </div>
      ))}
    </div>
  );
}
