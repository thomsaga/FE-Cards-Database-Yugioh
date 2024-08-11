const fetchCard = async ({ queryKey }) => {
  const id = queryKey[1];
  const res = await fetch(
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`,
  );

  if (!res.ok) {
    throw new Error(`Details of ${id} fetching failed`);
  }

  const result = await res.json();
  console.log("API Response:", result); // Debugging
  return result.data;
};

export default fetchCard;
