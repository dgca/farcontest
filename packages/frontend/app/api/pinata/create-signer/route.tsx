import { NextResponse } from "next/server";

import { getFdk } from "@/pinata/getFdk";

export async function GET() {
  const fdk = getFdk();
  console.log(fdk.config);

  const signerData = await fdk.createSigner();

  return NextResponse.json({
    deep_link_url: signerData.deep_link_url,
    signer_id: signerData.signer_id,
    status: signerData.status,
    token: signerData.token,
  });
}
