import { useFetch } from "../hooks/useGet";

export const useAllBooks = () => { 
  return useFetch("http://localhost:8080/getBook.php");
};