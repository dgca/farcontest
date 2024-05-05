import { useMutation } from "@tanstack/react-query";

type ParsedFormData = {
  name: string;
  description: string;
  deadline: string;
  prize_token: string;
  creator_fid: string;
  signer_uuid: string;
  prizes: {
    name: string;
    amount: number;
    description: string;
  }[];
};

export function useCreateContest() {
  return useMutation({
    mutationFn: async (formData: ParsedFormData) => {
      const response = await fetch("/api/contest", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      return response;
    },
  });
}

export function parseFormData(formData: FormData): ParsedFormData {
  const formKeyMapping = {
    contest_name: "name",
    date_time: "deadline",
    prize_name: "name",
    prize_amount: "amount",
    prize_description: "description",
  } as Record<string, string>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultAcc: any = {};

  const returnValue = [...formData.entries()].reduce((acc, [key, value]) => {
    const trailingNumber = key.match(/\d+$/)?.[0];

    if (trailingNumber) {
      if (!acc.prizes) {
        acc.prizes = [];
      }

      const parsed = parseInt(trailingNumber);
      const baseKey = key.replace(/_\d+$/, "");

      if (!acc.prizes[parsed]) {
        acc.prizes[parsed] = {};
      }

      const itemKey = formKeyMapping[baseKey] ?? baseKey;

      acc.prizes[parsed][itemKey] = value;
      return acc;
    }

    const itemKey = formKeyMapping[key] ?? key;
    acc[itemKey] = value;
    return acc;
  }, defaultAcc);

  return returnValue as ParsedFormData;
}
