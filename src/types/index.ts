// Type definitions for Intellobyte Business Command Center

export type MarketName =
  | 'India'
  | 'South Africa'
  | 'Zimbabwe'
  | 'Las Vegas'
  | 'Germany'
  | 'France'
  | 'United Kingdom'
  | 'Australia'
  | 'Canada';

export type UserRole = 'owner' | 'admin' | 'manager' | 'sales' | 'developer' | 'viewer';

export interface MarketData {
  market: MarketName;
  country: string;
  projects: number;
  revenue: number;
  flag?: string;
}

export interface CalculatedMarketMetric extends MarketData {
  avgRevenuePerProject: number;
  revenueSharePercent: number;
  projectSharePercent: number;
}

export interface Package {
  id: string;
  name: 'Basic' | 'Pro' | 'Pro Plus' | string;
  price: number;
  description: string;
  features: string[];
  status: 'active' | 'archived';
  projectsSold: number | null; // null represents "Not yet tracked"
  revenue: number | null;       // null represents "Not yet tracked"
  conversionRate: number | null;
}

export type OpportunityStage =
  | 'new_lead'
  | 'contacted'
  | 'qualified'
  | 'proposal_sent'
  | 'negotiation'
  | 'won'
  | 'lost';

export interface Opportunity {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  market: MarketName;
  potentialValue: number;
  packageId?: string;
  packageName: string;
  stage: OpportunityStage;
  leadSource: 'Google Ads' | 'Referral' | 'Cold Outreach' | 'Organic SEO' | 'Trade Association';
  assignedPerson: string;
  lastContactDate: string;
  nextTask: string;
  createdAt: string;
  updatedAt: string;
  isDemoData: boolean;
}

export type ProjectStatus =
  | 'lead'
  | 'onboarding'
  | 'design'
  | 'development'
  | 'review'
  | 'client_approval'
  | 'live'
  | 'completed'
  | 'on_hold'
  | 'cancelled';

export interface Project {
  id: string;
  name: string;
  company: string;
  clientId: string;
  clientName: string;
  country: string;
  market: MarketName;
  packageId: string;
  packageName: string;
  contractValue: number;
  amountPaid: number;
  amountOutstanding: number;
  startDate: string;
  expectedLaunch: string;
  actualLaunch?: string;
  assignedTeam: string[];
  progress: number; // 0 to 100
  status: ProjectStatus;
  notes?: string;
  isDemoData: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  country: string;
  market: MarketName;
  email: string;
  phone: string;
  website?: string;
  totalContractValue: number;
  totalCollected: number;
  outstandingBalance: number;
  activeProjectsCount: number;
  tags: string[];
  status: 'active' | 'churned' | 'pending';
  joinedDate: string;
  notes?: string;
  isDemoData: boolean;
}

export type InvoiceStatus =
  | 'draft'
  | 'sent'
  | 'partially_paid'
  | 'paid'
  | 'overdue'
  | 'cancelled';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  company: string;
  country: string;
  market: MarketName;
  projectId: string;
  projectName: string;
  packageName: string;
  amount: number;
  amountPaid: number;
  dueDate: string;
  issueDate: string;
  status: InvoiceStatus;
  isDemoData: boolean;
  createdAt: string;
}

export type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded';

export interface PaymentTransaction {
  id: string;
  date: string;
  clientId: string;
  clientName: string;
  company: string;
  projectId: string;
  projectName: string;
  country: string;
  market: MarketName;
  invoiceNumber: string;
  amount: number;
  paymentMethod: 'Stripe Credit Card' | 'ACH Wire Transfer' | 'Bank SEPA' | 'Direct Debit';
  status: PaymentStatus;
  isDemoData: boolean;
}

export interface ConversationMessage {
  id: string;
  sender: 'client' | 'agent' | 'system';
  senderName: string;
  timestamp: string;
  text: string;
  channel: 'sms' | 'email' | 'internal_note';
}

export interface Conversation {
  id: string;
  clientId: string;
  clientName: string;
  company: string;
  country: string;
  market: MarketName;
  email: string;
  phone: string;
  package: string;
  dealValue: number;
  lastMessageSnippet: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  status: 'open' | 'pending' | 'closed';
  messages: ConversationMessage[];
  tags: string[];
  isDemoData: boolean;
}

export interface CallRecord {
  id: string;
  contactName: string;
  company: string;
  country: string;
  market: MarketName;
  phone: string;
  type: 'answered' | 'missed';
  direction: 'inbound' | 'outbound';
  durationSeconds: number;
  isFirstTime: boolean;
  timestamp: string;
  source: string;
  notes?: string;
  isDemoData: boolean;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface OperationalTask {
  id: string;
  title: string;
  clientName: string;
  company: string;
  projectName?: string;
  dueDate: string;
  priority: TaskPriority;
  status: 'pending' | 'in_progress' | 'completed';
  owner: string;
  isDemoData: boolean;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  category: 'Leads' | 'Proposals' | 'Payments' | 'Projects' | 'Feedback';
  trigger: string;
  actions: string[];
  status: 'active' | 'paused' | 'draft' | 'failed';
  lastExecuted: string | null;
  executionCount: number;
  successRate: number;
  description: string;
}

export interface AuditLogEntry {
  id: string;
  who: string;
  what: string;
  when: string;
  entityType: 'Invoice' | 'Payment' | 'Project' | 'Opportunity' | 'Client' | 'Package' | 'Security';
  details: string;
  previousValue?: string;
  newValue?: string;
}

export type ActiveNavTab =
  | 'dashboard'
  | 'leads'
  | 'opportunities'
  | 'clients'
  | 'projects'
  | 'conversations'
  | 'calls'
  | 'revenue'
  | 'invoices'
  | 'payments'
  | 'packages'
  | 'project_pipeline'
  | 'tasks'
  | 'calendar'
  | 'automations'
  | 'analytics'
  | 'country_performance'
  | 'settings';
