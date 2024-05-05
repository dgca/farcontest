const URL = "https://api.neynar.com/v2/farcaster/cast";

export async function createCast(
  signerUuid: string,
  content: string,
  parent?: string
) {
  const body = {
    signer_uuid: signerUuid,
    text: content,
  };

  if (parent) {
    // @ts-expect-error - hackathon
    body.parent = parent;
  } else {
    // @ts-expect-error - hackathon
    body.channel_id = "farcontest";
  }

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY ?? "",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}
