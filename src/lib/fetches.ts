export async function getDataFrom(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const { message = "Bad request" } = await res.json();
    throw new Error(message);
  }
  return await res.json();
}

export async function postDataTo(url: string, data: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const { message = "Bad request" } = await res.json();
    throw new Error(message);
  }
  return await res.json();
}
