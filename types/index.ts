// ─── Auth ─────────────────────────────────────────────────────────────────────

export type UserRole = "user" | "admin";

export type UserProfile = {
  heightCm?: number;
  weightKg?: number;
  fitnessLevel?: "beginner" | "intermediate" | "advanced";
  goals?: string[];
  bio?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  profile?: UserProfile;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
};

// ─── Plans ────────────────────────────────────────────────────────────────────

export type PlanCategory =
  | "strength"
  | "cardio"
  | "yoga"
  | "hiit"
  | "mobility"
  | "nutrition"
  | "therapy";

export type PlanLevel = "beginner" | "intermediate" | "advanced";

export type Plan = {
  _id: string;
  title: string;
  description: string;
  category: PlanCategory;
  level: PlanLevel;
  durationWeeks?: number;
  durationMinutes?: number;
  priceCents: number;
  isFree: boolean;
  bannerImage?: string;
  isPublished: boolean;
  isActive: boolean;
  tags: string[];
  enrollmentCount: number;
  createdAt: string;
  updatedAt: string;
};

// ─── Bookings ─────────────────────────────────────────────────────────────────

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded";

export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded";

export type Booking = {
  _id: string;
  user: User | string;
  plan: Plan | string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amountPaidCents: number;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  bookedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

// ─── Chat ─────────────────────────────────────────────────────────────────────

export type MessageRole = "user" | "assistant";

export type ChatMessage = {
  _id: string;
  user: string;
  role: MessageRole;
  content: string;
  sessionId: string;
  tokensUsed?: number;
  model?: string;
  createdAt: string;
};

export type ChatSession = {
  sessionId: string;
  preview: string;
  messageCount: number;
  lastActivity: string;
  createdAt: string;
};

// ─── API Responses ────────────────────────────────────────────────────────────

// Generic wrapper that matches your backend's response shape
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

// For paginated endpoints
export type PaginatedResponse<T> = {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: T[];
};

// ─── Stats ────────────────────────────────────────────────────────────────────

export type DashboardOverview = {
  totalUsers: number;
  activeUsers: number;
  totalBookings: number;
  confirmedBookings: number;
  totalPlans: number;
  publishedPlans: number;
  totalChatMessages: number;
  totalRevenueCents: number;
  totalRevenueFormatted: string;
};

export type MonthlyRevenue = {
  year: number;
  month: number;
  label: string;
  revenueCents: number;
  revenueFormatted: string;
  bookings: number;
};

export type DashboardStats = {
  overview: DashboardOverview;
  monthlyRevenue: MonthlyRevenue[];
  topPlans: Plan[];
  recentBookings: Booking[];
};