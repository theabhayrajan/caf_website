// src/utils/storage.js
export const LOCAL_STORAGE_KEY = "ADMIN_QUESTION_SETS";

export function saveToLocal(allSets) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allSets));
}
export function loadFromLocal() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
