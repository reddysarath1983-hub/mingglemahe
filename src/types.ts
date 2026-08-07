export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  major: string;
  year: string;
  campus: string;
  quote: string;
  bio: string;
  interests: string[];
  verified: boolean;
  avatarUrl: string;
  photos: string[];
  spotifyTrack?: string;
  coffeeSpot?: string;
  distance?: string;
  isOnline?: boolean;
  regNumber?: string;
  email?: string;
}

export interface PaymentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentRegNo: string;
  amount: string;
  upiNumber: string;
  transactionRef: string;
  screenshotUrl: string;
  submittedAt: string;
  status: 'Pending Verification' | 'Approved' | 'Rejected';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}

export interface MatchItem {
  id: string;
  student: StudentProfile;
  matchedAt: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface SecretCrush {
  id: string;
  crushEmail: string;
  studentName?: string;
  status: 'pending' | 'matched' | 'notified';
  timestamp: string;
}

export type ViewScreen = 
  | 'splash' 
  | 'onboarding-details'
  | 'verify' 
  | 'payment-step'
  | 'awaiting-approval'
  | 'credential-login'
  | 'discover' 
  | 'match' 
  | 'campus-pass' 
  | 'chats' 
  | 'chat-detail' 
  | 'crush' 
  | 'admin' 
  | 'profile'
  | 'how-it-works';

export interface ApprovedCredential {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentRegNo: string;
  loginId: string;
  passcode: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedAt?: string;
  utrRef?: string;
}

export interface AdminActivity {
  id: string;
  userName: string;
  action: string;
  status: 'Pending Review' | 'Completed' | 'Investigation Required';
  time: string;
  avatarUrl?: string;
  paymentDetails?: {
    upiNumber: string;
    transactionRef: string;
    amount: string;
    screenshotUrl: string;
    studentRegNo: string;
    studentEmail?: string;
  };
  assignedCredential?: {
    loginId: string;
    passcode: string;
  };
}

export interface AdminStats {
  totalUsers: number;
  verifiedStudents: number;
  pendingPayments: number;
  paidMembers: number;
}

