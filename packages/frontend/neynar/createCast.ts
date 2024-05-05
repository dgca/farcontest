const URL = "https://api.neynar.com/v2/farcaster/cast";

export async function createCast(signerUuid: string, content: string) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY ?? "",
    },
    body: JSON.stringify({
      signer_uuid: signerUuid,
      text: content,
      channel_id: "farcontest",
    }),
  });
  const data = await response.json();
  return data;
}
