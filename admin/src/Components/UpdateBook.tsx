import { useUpdateBook } from "../hooks/useUpdateBook";
import type { IBooks } from "../Interface/IBooks";
import { useState  } from "react";

export const UpdateBook = ({ onClose,book }: { onClose: () => void; book: IBooks }) => {

  const { updateBook }  = useUpdateBook();

  const [formData, setFormData] = useState({
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    await updateBook("http://localhost:8080/updateBook.php", formData)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">

        <button
          onClick={onClose}
          type="button"
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Update Book
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              name="year"
              value={formData.year}
              onChange={handleChange}
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button onClick={handleUpdate} className ="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
            Update Book
          </button>
        </div>
      </div>
    </div>
  );
};
