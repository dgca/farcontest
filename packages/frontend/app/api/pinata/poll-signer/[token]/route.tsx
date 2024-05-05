import { NextRequest, NextResponse } from "next/server";

import { getFdk } from "@/pinata/getFdk";

export async function GET(
  _request: NextRequest,
  { params }: { params: { token: string } }
) {
  console.log("token", params.token);
  const fdk = getFdk();
  1;
  const response = await fdk.pollSigner(params.token);
  console.log(response);
  return NextResponse.json({
    token: response.token,
    deeplinkUrl: response.deeplinkUrl,
    key: response.key,
    requestFid: response.requestFid,
    state: response.state,
    isSponsored: response.isSponsored,
    userFid: response.userFid,
  });
}
