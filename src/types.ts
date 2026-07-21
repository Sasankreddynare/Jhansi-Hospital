export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  role: string;
  fellowship?: string;
  experience?: string;
  specialty: string;
  bio: string;
  imageUrl?: string;
  schedule?: string;
}

export interface Department {
  id: string;
  name: string;
  iconName: string;
  description: string;
  symptoms: string[];
  features: string[];
}

export interface Service {
  id: string;
  name: string;
  iconName: string;
  category: 'diagnostic' | 'rehabilitation' | 'care';
  description: string;
  highlight?: string;
}

export interface Booking {
  id: string;
  ticketId: string;
  name: string;
  phone: string;
  departmentId: string;
  doctorId: string;
  date: string;
  message?: string;
  status: 'Confirmed' | 'Completed' | 'Pending';
  timeSlot: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  condition: string;
  review: string;
  rating: number;
  treatmentDoctor: string;
}

export interface RehabMilestone {
  id: string;
  title: string;
  patientInitials: string;
  condition: string;
  preTreatment: string;
  postTreatment: string;
  duration: string;
  percentageRecovery: number;
}
