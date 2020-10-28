export interface Client {
  _id: string;
  name: string;
  groups: string[];
}

export function validateClient(data: any[]) {
  return !!data;
}

export function validateClientUpdate(update: any) {
  return !!update;
}
