import { useAllBooks } from '../Data/AllBooks'; // renamed to useAllBooks
import { Form } from '../Components/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { data: books, loading, error } = useAllBooks();
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      Classic: 'bg-amber-100 text-amber-800 border-amber-200',
      Fiction: 'bg-blue-100 text-blue-800 border-blue-200',
      Dystopian: 'bg-purple-100 text-purple-800 border-purple-200',
      Romance: 'bg-pink-100 text-pink-800 border-pink-200',
      Fantasy: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    };
    return colors[genre] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex justify-center items-start pt-20">
      <div className="bg-white rounded-lg shadow border border-gray-200 w-full max-w-6xl">

        {/* HEADER */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Book Collection
          </h2>

          <button
            onClick={() => setFormVisible(true)}
            className="btn btn-sm btn-success"
          >
            + Add Book
          </button>
        </div>

        {formVisible && <Form onClose={() => setFormVisible(false)} />}

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-center bg-gray-50">ID</th>
                <th className="bg-gray-50">Title</th>
                <th className="bg-gray-50">Author</th>
                <th className="text-center bg-gray-50">Year</th>
                <th className="text-center bg-gray-50">Genre</th>
                <th className="text-center bg-gray-50">Status</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  onClick={() => navigate(`/booksinfo/${book.id}`)}
                  className="border-b cursor-pointer hover:bg-gray-100 transition"
                >
                  <td className="text-center">{book.id}</td>
                  <td className="font-semibold">{book.title}</td>
                  <td>{book.author}</td>
                  <td className="text-center">{book.year}</td>
                  <td className="text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getGenreColor(
                        book.genre
                      )}`}
                    >
                      {book.genre}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                      Available
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t bg-gray-50 text-sm">
          Total Books:{' '}
          <span className="font-semibold">{books.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;