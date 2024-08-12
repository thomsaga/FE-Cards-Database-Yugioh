async function fetchQuery({ queryKey }) {
  const { type } = queryKey[1];
  const inputType = `type=${type}&`;

  if (!type) {
    return [];
  }

  const res = await fetch(
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?${inputType}num=25&offset=0`,
  );

  if (!res.ok) {
    throw new Error("Searching Failed, Try again!");
  }

  const result = await res.json();
  console.log("API Response:", result); // Debugging
  return result.data;
}

export default fetchQuery;
