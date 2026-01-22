import type { IBooks } from "../Interface/IBooks";

export const useUpdateBook = () => {

  const updateBook = async (url: string, data: IBooks) => {

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json()

      console.log(result)

    } catch (e) {
      console.error(e);
    }

  };

  return { updateBook }
};
