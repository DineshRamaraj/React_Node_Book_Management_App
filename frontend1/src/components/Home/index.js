import React, { useCallback, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import UpdateBook from "../UpdateBook";

const Home = () => {
  const [search, setSearch] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [updateItem, setUpdateItem] = useState({
    showUpdate: false,
    updateInput: "",
  });
  // const navigate = useNavigate();

  const handleSearch = async () => {
    // navigate(`/search?query=${search}`);
    getBooksList();
  };

  const getBooksList = useCallback(async () => {
    const response = await fetch(
      `https://api-book-manage.onrender.com/api/books/?searchQuery=${search}`
    );
    const result = await response.json();
    const updatedResult = result.booksList.map((each) => ({
      authorId: each.author_id,
      authorName: each.author_name,
      bookId: each.book_id,
      genreDescription: each.genre_description,
      genreId: each.genre_id,
      genreList: each.genre_names,
      pages: each.pages,
      publishedDate: each.published_date,
      title: each.title,
    }));
    setBooksList(updatedResult);
  }, [search]);

  useEffect(() => {
    getBooksList();
  }, [getBooksList]);

  // console.log(booksList);

  const deleteHandle = async (bookId) => {
    try {
      const apiUrl = `https://api-book-manage.onrender.com/api/books/${bookId}`;
      const options = {
        method: "DELETE",
      };
      const response = await fetch(apiUrl, options);
      const result = await response.json();
      console.log(result);
      getBooksList();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative">
      {updateItem.showUpdate && (
        <div className="top-0 right-0 left-0 bottom-100 absolute z-20 bg-slate-200">
          <UpdateBook
            existBook={updateItem.updateInput}
            setUpdateItem={setUpdateItem}
            getBooksList={getBooksList}
          />
        </div>
      )}
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Book Management System
        </h1>
        <div className="flex justify-center space-x-4">
          <input
            type="text"
            placeholder="Search for books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>
      {booksList.length === 0 && (
        <div className="flex justify-center items-center min-h-full">
          No Item Found
        </div>
      )}
      {booksList.length > 0 && (
        <div className="px-20">
          <ul className="grid grid-cols-1 md:grid-cols-3">
            {booksList.map((eachBook) => (
              <li
                key={eachBook.bookId}
                className="border-2 border-slate-300 p-3 m-2 rounded-md flex justify-between items-center"
              >
                <span>{eachBook.title}</span>
                <div className="flex justify-center items-center">
                  <MdEdit
                    size={20}
                    className="text-blue-500 mr-3 cursor-pointer"
                    onClick={() => {
                      setUpdateItem({
                        showUpdate: true,
                        updateInput: eachBook,
                      });
                    }}
                  />
                  <MdDelete
                    size={20}
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteHandle(eachBook.bookId)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
