type LocalityInfo = {
  administrative: never[]; // Не уверен, какие типы здесь должны быть, поэтому использовал any
  informative: {
    name: string;
    description: string;
    order: number;
    wikidataId?: string;
    geonameId?: number;
  }[];
};

type Location = {
  latitude: number;
  longitude: number;
  lookupSource: string;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;
  localityInfo: LocalityInfo;
};

interface GetAddressArgs {
  latitude: number;
  longitude: number;
}

export async function getAddress({
  latitude,
  longitude,
}: GetAddressArgs): Promise<Location> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();
  return data;
}
