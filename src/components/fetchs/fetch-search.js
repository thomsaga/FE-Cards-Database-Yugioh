async function fetchQuery({ queryKey }) {
  const { type, attribute, race } = queryKey[1];

  const params = new URLSearchParams({
    num: "15",
    offset: "0",
  });

  if (type && type.trim() !== "") {
    params.append("type", type);
  }

  if (attribute && attribute.trim() !== "") {
    params.append("attribute", attribute);
  }

  if (race && race.trim() !== "") {
    params.append("race", race);
  }

  console.log("fetch type:", type);
  console.log("fetch attr:", attribute);
  console.log("fetch race:", race);
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${params.toString()}`;
  console.log("Fetching URL:", url); // Debugging

  try {
    const res = await fetch(url);
    if (res.ok) {
      const result = await res.json();
      console.log("API Response:", result);
      return result.data;
    }
  } catch (error) {
    throw new Error("Searching failed, please try again!");
  }
}

export default fetchQuery;
