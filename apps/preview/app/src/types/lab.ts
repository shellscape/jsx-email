export interface LabState {
  colorScheme: boolean;
  invertColors: boolean;
  preset: string;
  sendEmail: string;
  sendError: string | null;
  sendState: 'idle' | 'sending' | 'sent' | 'error';
}

export interface CardState {
  id: string;
  templateId: string;
}
