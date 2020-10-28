export interface Claim {
  /* LitifyId */ litifyId: string;
  /* MERC-0000001 */ _id: string /** coleção de contadores counter models */;
  /* Client */ clientId: string;
  /* Intake */ claimTypeId: string /** mercedes  */;
  /* Intake */ status: ClaimStatus /** intake. statusasclients */;
  /* LastAnswerDate */ lastModified: Date /** new Date() */;
}

export type ClaimStatus =
  | "ACTIVE"
  | "REQUESTED_CANCELLATION"
  | "CANCELLED"
  | "WITHDRAWN"
  | "SETTELED"
  | "JUDGED"
  | "DELETED";
