export interface User {
  id: number
  username: string
  password: string
  firstName?: string
  lastName?: string
  birthDate?: string  
  registrationDate: string
  accountStatus: string
  email: string
  phoneNumber?: string
}

export interface PredictionAttribute {
  id: number
  customerId: number
  birthPlace?: string
  birthTime?: string
  zodiacSign?: string
  career?: string
  relationship?: string
}

export interface Session {
  id: number
  customerId: number
  tellerId: number
  createdAt: string
  endedAt?: string
  sessionStatus: string
  paymentId?: number
}

export interface Payment {
  id: number
  customerId: number
  packageId: number
  sessionId: number
  paymentEvidence?: string
  createdAt: string
  status: string
}

export interface Report {
  id: number
  sessionId: number
  rating: number
  comment?: string
  reviewAt: string
}

export interface Customer {
  id: number
  userId: number
  profilePic?: string
  prediction?: PredictionAttribute
  sessions: Session[]
  payments: Payment[]
  reports: Report[]
  user: User
}

export interface TellerPackage {
  id: number
  tellerId: number
  packageDetail?: string
  questionNumber?: number
  price: number
  status: string
}

export interface Teller {
  id: number
  userId: number
  profilePic?: string
  identificationCard?: string
  identificationNumber?: string
  bankName?: string
  bankAccountNumber?: string
  specialty: string[]
  bio?: string
  verificationStatus?: string
  traffic: number
  packages: TellerPackage[]
  sessions: Session[]
  reports: Report[]
  user: User
}