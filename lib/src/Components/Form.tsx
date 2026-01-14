import { useState } from "react";
import type { IBooks } from "../Interface/IBooks";
import { useSubmitForm } from "../hooks/useSubmitForm";

export const Form = ({ onClose }: { onClose: () => void }) => {

  const { submitForm } = useSubmitForm();

  const [formData, setFormData] = useState<IBooks>({
    title: "",
    author: "",
    year: 0,
    genre: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData);
    alert("Book saved successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Add New Book
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Year
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Save Book
        </button>
      </form>
    </div>
  );
};
