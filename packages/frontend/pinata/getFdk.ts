import { PinataFDK } from "pinata-fdk";

export function getFdk() {
  return new PinataFDK({
    pinata_jwt: `${process.env.PINATA_JWT}`,
    pinata_gateway: "",
    app_fid: `${process.env.NEXT_PUBLIC_FC_APP_FID}`,
    app_mnemonic: `${process.env.FARCASTER_DEVELOPER_MNEMONIC}`,
  });
}
