export interface CowEvent {
  type: string;
  date: Date;
  details?: string;
}

export interface Cow {
  id: string;
  sex: 'Male' | 'Female';
  pen: string;
  status: 'Active' | 'In Treatment' | 'Deceased';
  weight?: number;
  lastEventDate: Date;
  events: CowEvent[];
}
