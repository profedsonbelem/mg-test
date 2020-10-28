export interface SMSData {
  sender: string;
  receiver: string;
  message: string;
  subject: string;
}

export interface BulkSMSData {
  sender?: string;
  receiver: string[];
  message: string;
  subject: string;
}
