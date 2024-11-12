// src/app/models/applicant.model.ts

export interface VerificationDocument {
  name: string;
  isVerified: boolean;
}

export interface Applicant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  uncheckedList: string;
  documents: {
    pan: string;
    aadhaar: string;
    tenthCertificate: string;
    twelthCertificate: string;
    degreeCertificate: string;
  };
}
