// Ground truth business data and demo operations data for Intellobyte Command Center
import {
  MarketData,
  Package,
  Opportunity,
  Project,
  Client,
  Invoice,
  PaymentTransaction,
  Conversation,
  CallRecord,
  OperationalTask,
  AutomationWorkflow,
  AuditLogEntry
} from '../types';

// ==========================================
// 1. GROUND TRUTH REAL BUSINESS DATA
// Strictly as provided. Never altered.
// ==========================================
export const REAL_MARKET_DATA: MarketData[] = [
  { market: 'India', country: 'India', projects: 30, revenue: 8200 },
  { market: 'South Africa', country: 'South Africa', projects: 19, revenue: 7600 },
  { market: 'Zimbabwe', country: 'Zimbabwe', projects: 13, revenue: 5710 },
  { market: 'Las Vegas', country: 'United States', projects: 8, revenue: 9630 },
  { market: 'Germany', country: 'Germany', projects: 31, revenue: 20000 },
  { market: 'France', country: 'France', projects: 22, revenue: 22500 },
  { market: 'United Kingdom', country: 'United Kingdom', projects: 17, revenue: 25000 },
  { market: 'Australia', country: 'Australia', projects: 13, revenue: 15000 },
  { market: 'Canada', country: 'Canada', projects: 12, revenue: 12000 },
];

// ==========================================
// 2. PACKAGE CONFIGURATION
// Pricing is defined; purchase distribution is not tracked yet.
// ==========================================
export const INITIAL_PACKAGES: Package[] = [
  {
    id: 'pkg-basic',
    name: 'Basic',
    price: 499,
    description: 'High-conversion roofing landing page, core service showcase, and local Google Map integration.',
    features: [
      'Single-page speed-optimized site',
      'Instant Quote Call-To-Action Form',
      'Local Geo-Targeted SEO Foundation',
      'Mobile-first responsive architecture',
      'Standard SSL & DNS Security'
    ],
    status: 'active',
    projectsSold: null, // UNKNOWN — Display "Not yet tracked"
    revenue: null,      // UNKNOWN — Display "Not yet tracked"
    conversionRate: null
  },
  {
    id: 'pkg-pro',
    name: 'Pro',
    price: 1499,
    description: 'Comprehensive digital suite with project portfolio, shingle/tile visualizer, and speed-to-lead notification routing.',
    features: [
      'Multi-page roofing authority site (Residential + Commercial)',
      'Dynamic Interactive Shingle/Roof Estimator',
      'Jobsite Portfolio Gallery with Before/After Sliders',
      'Direct SMS & Email Dispatch for Incoming Leads',
      'Google Review Auto-Sync & Schema Markup'
    ],
    status: 'active',
    projectsSold: null, // UNKNOWN — Display "Not yet tracked"
    revenue: null,      // UNKNOWN — Display "Not yet tracked"
    conversionRate: null
  },
  {
    id: 'pkg-pro-plus',
    name: 'Pro Plus',
    price: 2499,
    description: 'Full-stack enterprise revenue machine with drone survey showcase, automated follow-ups, and CRM integration.',
    features: [
      'Enterprise Multi-Location / Multi-Crew Architecture',
      'Drone Survey 4K Video Showcase Module',
      'Automated Speed-To-Lead SMS Follow-up Engine',
      'Direct Integration into Intellobyte Command Center',
      'Custom Roofing Warranty & Financing Calculator',
      'Dedicated Account Manager & Monthly SEO Audits'
    ],
    status: 'active',
    projectsSold: null, // UNKNOWN — Display "Not yet tracked"
    revenue: null,      // UNKNOWN — Display "Not yet tracked"
    conversionRate: null
  }
];

// ==========================================
// 3. DEMO CRM & OPERATIONAL DATA
// Explicitly tagged with isDemoData: true.
// Kept separate from real financial totals.
// ==========================================
export const DEMO_CLIENTS: Client[] = [
  {
    id: 'cl-101',
    name: 'Marcus Vance',
    company: 'Apex Summit Roofing LLC',
    country: 'United States',
    market: 'Las Vegas',
    email: 'marcus@apexsummitroofing.com',
    phone: '+1 (702) 555-0194',
    website: 'https://apexsummitroofing.com',
    totalContractValue: 2499,
    totalCollected: 2499,
    outstandingBalance: 0,
    activeProjectsCount: 1,
    tags: ['Commercial', 'Tile Replacement', 'Vegas Strip'],
    status: 'active',
    joinedDate: '2026-03-15',
    isDemoData: true
  },
  {
    id: 'cl-102',
    name: 'Arthur Pendelton',
    company: 'Thames & Cotswold Roofing Ltd',
    country: 'United Kingdom',
    market: 'United Kingdom',
    email: 'arthur@thamesroofing.co.uk',
    phone: '+44 20 7946 0812',
    website: 'https://thamesroofing.co.uk',
    totalContractValue: 2499,
    totalCollected: 1499,
    outstandingBalance: 1000,
    activeProjectsCount: 1,
    tags: ['Heritage Slate', 'Residential', 'London Metro'],
    status: 'active',
    joinedDate: '2026-04-02',
    isDemoData: true
  },
  {
    id: 'cl-103',
    name: 'Christoph Weber',
    company: 'Bavaria Dachwerk GmbH',
    country: 'Germany',
    market: 'Germany',
    email: 'c.weber@bavaria-dachwerk.de',
    phone: '+49 89 2018 4400',
    website: 'https://bavaria-dachwerk.de',
    totalContractValue: 1499,
    totalCollected: 1499,
    outstandingBalance: 0,
    activeProjectsCount: 1,
    tags: ['Industrial Metal', 'Solar Roofing'],
    status: 'active',
    joinedDate: '2026-05-18',
    isDemoData: true
  },
  {
    id: 'cl-104',
    name: 'Julien Moreau',
    company: 'Toitures de Provence & Fils',
    country: 'France',
    market: 'France',
    email: 'j.moreau@toitures-provence.fr',
    phone: '+33 4 91 13 88 20',
    website: 'https://toitures-provence.fr',
    totalContractValue: 2499,
    totalCollected: 1250,
    outstandingBalance: 1249,
    activeProjectsCount: 1,
    tags: ['Terracotta Tiles', 'Zinc Gutters'],
    status: 'active',
    joinedDate: '2026-06-11',
    isDemoData: true
  },
  {
    id: 'cl-105',
    name: 'Liam Henderson',
    company: 'Sydney Coastal Roofing Services',
    country: 'Australia',
    market: 'Australia',
    email: 'liam@sydneycoastalroofing.com.au',
    phone: '+61 2 9155 4230',
    totalContractValue: 1499,
    totalCollected: 1499,
    outstandingBalance: 0,
    activeProjectsCount: 1,
    tags: ['Colorbond Steel', 'Storm Repair'],
    status: 'active',
    joinedDate: '2026-07-20',
    isDemoData: true
  },
  {
    id: 'cl-106',
    name: 'Rajesh Patel',
    company: 'Shree Krishna Roofing & Waterproofing',
    country: 'India',
    market: 'India',
    email: 'rajesh@shreekrishnaroofing.in',
    phone: '+91 98201 55412',
    totalContractValue: 499,
    totalCollected: 499,
    outstandingBalance: 0,
    activeProjectsCount: 1,
    tags: ['Commercial Waterproofing', 'Cool Roof Coatings'],
    status: 'active',
    joinedDate: '2026-08-01',
    isDemoData: true
  }
];

export const DEMO_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-201',
    company: 'Silver State Flat Roofers',
    contactName: 'Darren Miller',
    email: 'darren@silverstateroofing.com',
    phone: '+1 (702) 555-8821',
    country: 'United States',
    market: 'Las Vegas',
    potentialValue: 2499,
    packageName: 'Pro Plus',
    stage: 'negotiation',
    leadSource: 'Google Ads',
    assignedPerson: 'Sarah Jenkins',
    lastContactDate: '2026-09-28',
    nextTask: 'Send adjusted drone visualizer contract addendum',
    createdAt: '2026-09-15',
    updatedAt: '2026-09-28',
    isDemoData: true
  },
  {
    id: 'opp-202',
    company: 'Caledonian Slate Specialists',
    contactName: 'Hamish MacLeod',
    email: 'hamish@caledonianslate.co.uk',
    phone: '+44 131 496 0300',
    country: 'United Kingdom',
    market: 'United Kingdom',
    potentialValue: 1499,
    packageName: 'Pro',
    stage: 'proposal_sent',
    leadSource: 'Referral',
    assignedPerson: 'David Chen',
    lastContactDate: '2026-09-27',
    nextTask: 'Follow up on proposal review email',
    createdAt: '2026-09-20',
    updatedAt: '2026-09-27',
    isDemoData: true
  },
  {
    id: 'opp-203',
    company: 'Melbourne Metal & Tile Restoration',
    contactName: 'Jack O’Connor',
    email: 'jack@melbourneroofrestoration.com.au',
    phone: '+61 3 9901 8810',
    country: 'Australia',
    market: 'Australia',
    potentialValue: 2499,
    packageName: 'Pro Plus',
    stage: 'qualified',
    leadSource: 'Organic SEO',
    assignedPerson: 'Sarah Jenkins',
    lastContactDate: '2026-09-26',
    nextTask: 'Prepare live architecture demo',
    createdAt: '2026-09-22',
    updatedAt: '2026-09-26',
    isDemoData: true
  },
  {
    id: 'opp-204',
    company: 'Maple Leaf Residential Roofing',
    contactName: 'Ethan Tremblay',
    email: 'ethan@mapleleafroofing.ca',
    phone: '+1 (416) 555-0914',
    country: 'Canada',
    market: 'Canada',
    potentialValue: 1499,
    packageName: 'Pro',
    stage: 'contacted',
    leadSource: 'Cold Outreach',
    assignedPerson: 'Alex Rivera',
    lastContactDate: '2026-09-25',
    nextTask: 'Schedule 15-min discovery call',
    createdAt: '2026-09-24',
    updatedAt: '2026-09-25',
    isDemoData: true
  },
  {
    id: 'opp-205',
    company: 'Durban Zinc & Tile Contractors',
    contactName: 'Sipho Ndlovu',
    email: 'sipho@durbanroofing.co.za',
    phone: '+27 31 555 9012',
    country: 'South Africa',
    market: 'South Africa',
    potentialValue: 499,
    packageName: 'Basic',
    stage: 'new_lead',
    leadSource: 'Google Ads',
    assignedPerson: 'David Chen',
    lastContactDate: '2026-09-29',
    nextTask: 'Send introduction SMS and portfolio links',
    createdAt: '2026-09-29',
    updatedAt: '2026-09-29',
    isDemoData: true
  },
  {
    id: 'opp-206',
    company: 'Lyon Rénovation Toitures',
    contactName: 'Camille Bernard',
    email: 'camille@lyontoitures.fr',
    phone: '+33 4 72 00 11 22',
    country: 'France',
    market: 'France',
    potentialValue: 2499,
    packageName: 'Pro Plus',
    stage: 'won',
    leadSource: 'Trade Association',
    assignedPerson: 'Alex Rivera',
    lastContactDate: '2026-09-24',
    nextTask: 'Trigger Client Onboarding Automation',
    createdAt: '2026-09-10',
    updatedAt: '2026-09-24',
    isDemoData: true
  },
  {
    id: 'opp-207',
    company: 'Harare Premium Trusses & Roofing',
    contactName: 'Tendai Moyo',
    email: 'tendai@harareroofing.co.zw',
    phone: '+263 24 255 1200',
    country: 'Zimbabwe',
    market: 'Zimbabwe',
    potentialValue: 499,
    packageName: 'Basic',
    stage: 'lost',
    leadSource: 'Referral',
    assignedPerson: 'David Chen',
    lastContactDate: '2026-09-18',
    nextTask: 'Archive and tag for 90-day re-engagement',
    createdAt: '2026-09-05',
    updatedAt: '2026-09-18',
    isDemoData: true
  }
];

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'prj-301',
    name: 'Apex Commercial Portal & Drone Gallery',
    company: 'Apex Summit Roofing LLC',
    clientId: 'cl-101',
    clientName: 'Marcus Vance',
    country: 'United States',
    market: 'Las Vegas',
    packageId: 'pkg-pro-plus',
    packageName: 'Pro Plus',
    contractValue: 2499,
    amountPaid: 2499,
    amountOutstanding: 0,
    startDate: '2026-09-01',
    expectedLaunch: '2026-10-05',
    assignedTeam: ['Elena R. (Lead UI)', 'Kenji T. (Frontend)'],
    progress: 85,
    status: 'client_approval',
    notes: 'Awaiting client review of interactive drone inspection module.',
    isDemoData: true,
    createdAt: '2026-09-01',
    updatedAt: '2026-09-28'
  },
  {
    id: 'prj-302',
    name: 'Thames Heritage Slate Experience',
    company: 'Thames & Cotswold Roofing Ltd',
    clientId: 'cl-102',
    clientName: 'Arthur Pendelton',
    country: 'United Kingdom',
    market: 'United Kingdom',
    packageId: 'pkg-pro-plus',
    packageName: 'Pro Plus',
    contractValue: 2499,
    amountPaid: 1499,
    amountOutstanding: 1000,
    startDate: '2026-09-10',
    expectedLaunch: '2026-10-15',
    assignedTeam: ['Kenji T. (Dev)', 'Sofia M. (Copy)'],
    progress: 62,
    status: 'development',
    notes: 'Developing custom slate visualizer & British heritage case studies.',
    isDemoData: true,
    createdAt: '2026-09-10',
    updatedAt: '2026-09-27'
  },
  {
    id: 'prj-303',
    name: 'Bavaria Solar & Tile Estimator',
    company: 'Bavaria Dachwerk GmbH',
    clientId: 'cl-103',
    clientName: 'Christoph Weber',
    country: 'Germany',
    market: 'Germany',
    packageId: 'pkg-pro',
    packageName: 'Pro',
    contractValue: 1499,
    amountPaid: 1499,
    amountOutstanding: 0,
    startDate: '2026-08-15',
    expectedLaunch: '2026-09-20',
    actualLaunch: '2026-09-22',
    assignedTeam: ['Elena R. (Lead UI)'],
    progress: 100,
    status: 'live',
    notes: 'Launched successfully. 18 qualified quote requests in first week.',
    isDemoData: true,
    createdAt: '2026-08-15',
    updatedAt: '2026-09-22'
  },
  {
    id: 'prj-304',
    name: 'Provence Terracotta Showcase',
    company: 'Toitures de Provence & Fils',
    clientId: 'cl-104',
    clientName: 'Julien Moreau',
    country: 'France',
    market: 'France',
    packageId: 'pkg-pro-plus',
    packageName: 'Pro Plus',
    contractValue: 2499,
    amountPaid: 1250,
    amountOutstanding: 1249,
    startDate: '2026-09-18',
    expectedLaunch: '2026-10-25',
    assignedTeam: ['Sofia M. (Design)', 'Kenji T. (Dev)'],
    progress: 40,
    status: 'design',
    notes: 'Translating quote builder into French localized terminology.',
    isDemoData: true,
    createdAt: '2026-09-18',
    updatedAt: '2026-09-28'
  },
  {
    id: 'prj-305',
    name: 'Sydney Colorbond Fast-Lead Site',
    company: 'Sydney Coastal Roofing Services',
    clientId: 'cl-105',
    clientName: 'Liam Henderson',
    country: 'Australia',
    market: 'Australia',
    packageId: 'pkg-pro',
    packageName: 'Pro',
    contractValue: 1499,
    amountPaid: 1499,
    amountOutstanding: 0,
    startDate: '2026-08-01',
    expectedLaunch: '2026-08-28',
    actualLaunch: '2026-08-28',
    assignedTeam: ['Elena R. (Lead UI)'],
    progress: 100,
    status: 'completed',
    notes: 'Client completed maintenance transition plan.',
    isDemoData: true,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-28'
  }
];

export const DEMO_INVOICES: Invoice[] = [
  {
    id: 'inv-401',
    invoiceNumber: 'INV-2026-089',
    clientId: 'cl-101',
    clientName: 'Marcus Vance',
    company: 'Apex Summit Roofing LLC',
    country: 'United States',
    market: 'Las Vegas',
    projectId: 'prj-301',
    projectName: 'Apex Commercial Portal & Drone Gallery',
    packageName: 'Pro Plus',
    amount: 2499,
    amountPaid: 2499,
    dueDate: '2026-09-15',
    issueDate: '2026-09-01',
    status: 'paid',
    isDemoData: true,
    createdAt: '2026-09-01'
  },
  {
    id: 'inv-402',
    invoiceNumber: 'INV-2026-092',
    clientId: 'cl-102',
    clientName: 'Arthur Pendelton',
    company: 'Thames & Cotswold Roofing Ltd',
    country: 'United Kingdom',
    market: 'United Kingdom',
    projectId: 'prj-302',
    projectName: 'Thames Heritage Slate Experience',
    packageName: 'Pro Plus (Milestone 1)',
    amount: 1499,
    amountPaid: 1499,
    dueDate: '2026-09-20',
    issueDate: '2026-09-10',
    status: 'paid',
    isDemoData: true,
    createdAt: '2026-09-10'
  },
  {
    id: 'inv-403',
    invoiceNumber: 'INV-2026-093',
    clientId: 'cl-102',
    clientName: 'Arthur Pendelton',
    company: 'Thames & Cotswold Roofing Ltd',
    country: 'United Kingdom',
    market: 'United Kingdom',
    projectId: 'prj-302',
    projectName: 'Thames Heritage Slate Experience',
    packageName: 'Pro Plus (Final Balance)',
    amount: 1000,
    amountPaid: 0,
    dueDate: '2026-10-15',
    issueDate: '2026-09-25',
    status: 'sent',
    isDemoData: true,
    createdAt: '2026-09-25'
  },
  {
    id: 'inv-404',
    invoiceNumber: 'INV-2026-094',
    clientId: 'cl-104',
    clientName: 'Julien Moreau',
    company: 'Toitures de Provence & Fils',
    country: 'France',
    market: 'France',
    projectId: 'prj-304',
    projectName: 'Provence Terracotta Showcase',
    packageName: 'Pro Plus (Deposit)',
    amount: 1250,
    amountPaid: 1250,
    dueDate: '2026-09-25',
    issueDate: '2026-09-18',
    status: 'paid',
    isDemoData: true,
    createdAt: '2026-09-18'
  },
  {
    id: 'inv-405',
    invoiceNumber: 'INV-2026-078',
    clientId: 'cl-106',
    clientName: 'Rajesh Patel',
    company: 'Shree Krishna Roofing & Waterproofing',
    country: 'India',
    market: 'India',
    projectId: 'prj-306',
    projectName: 'Krishna Waterproofing Site',
    packageName: 'Basic',
    amount: 499,
    amountPaid: 499,
    dueDate: '2026-08-15',
    issueDate: '2026-08-01',
    status: 'paid',
    isDemoData: true,
    createdAt: '2026-08-01'
  }
];

export const DEMO_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'pay-501',
    date: '2026-09-12',
    clientId: 'cl-101',
    clientName: 'Marcus Vance',
    company: 'Apex Summit Roofing LLC',
    projectId: 'prj-301',
    projectName: 'Apex Commercial Portal & Drone Gallery',
    country: 'United States',
    market: 'Las Vegas',
    invoiceNumber: 'INV-2026-089',
    amount: 2499,
    paymentMethod: 'Stripe Credit Card',
    status: 'completed',
    isDemoData: true
  },
  {
    id: 'pay-502',
    date: '2026-09-18',
    clientId: 'cl-102',
    clientName: 'Arthur Pendelton',
    company: 'Thames & Cotswold Roofing Ltd',
    projectId: 'prj-302',
    projectName: 'Thames Heritage Slate Experience',
    country: 'United Kingdom',
    market: 'United Kingdom',
    invoiceNumber: 'INV-2026-092',
    amount: 1499,
    paymentMethod: 'Bank SEPA',
    status: 'completed',
    isDemoData: true
  },
  {
    id: 'pay-503',
    date: '2026-09-20',
    clientId: 'cl-104',
    clientName: 'Julien Moreau',
    company: 'Toitures de Provence & Fils',
    projectId: 'prj-304',
    projectName: 'Provence Terracotta Showcase',
    country: 'France',
    market: 'France',
    invoiceNumber: 'INV-2026-094',
    amount: 1250,
    paymentMethod: 'Stripe Credit Card',
    status: 'completed',
    isDemoData: true
  }
];

export const DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-601',
    clientId: 'cl-101',
    clientName: 'Marcus Vance',
    company: 'Apex Summit Roofing LLC',
    country: 'United States',
    market: 'Las Vegas',
    email: 'marcus@apexsummitroofing.com',
    phone: '+1 (702) 555-0194',
    package: 'Pro Plus',
    dealValue: 2499,
    lastMessageSnippet: 'The drone gallery video looks phenomenal on mobile. Just waiting on my partner’s sign-off.',
    lastMessageTimestamp: '10:42 AM',
    unreadCount: 1,
    status: 'open',
    tags: ['Active Project', 'High Value', 'Vegas'],
    isDemoData: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'agent',
        senderName: 'Elena R. (Intellobyte)',
        timestamp: 'Yesterday 3:15 PM',
        text: 'Hi Marcus, we’ve uploaded the 4K drone footage for the Henderson Commercial Tile project into the staging preview. Take a look here: https://preview.intellobyte.com/apex-summit',
        channel: 'email'
      },
      {
        id: 'msg-2',
        sender: 'client',
        senderName: 'Marcus Vance',
        timestamp: '10:42 AM',
        text: 'The drone gallery video looks phenomenal on mobile. Just waiting on my partner’s sign-off.',
        channel: 'sms'
      }
    ]
  },
  {
    id: 'conv-602',
    clientId: 'cl-102',
    clientName: 'Arthur Pendelton',
    company: 'Thames & Cotswold Roofing Ltd',
    country: 'United Kingdom',
    market: 'United Kingdom',
    email: 'arthur@thamesroofing.co.uk',
    phone: '+44 20 7946 0812',
    package: 'Pro Plus',
    dealValue: 2499,
    lastMessageSnippet: 'We have approved the design mocks for the Cotswold Stone case studies.',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0,
    status: 'open',
    tags: ['UK Slate', 'In Dev'],
    isDemoData: true,
    messages: [
      {
        id: 'msg-3',
        sender: 'client',
        senderName: 'Arthur Pendelton',
        timestamp: 'Yesterday 11:20 AM',
        text: 'We have approved the design mocks for the Cotswold Stone case studies. When will staging be ready?',
        channel: 'email'
      },
      {
        id: 'msg-4',
        sender: 'agent',
        senderName: 'Kenji T. (Intellobyte)',
        timestamp: 'Yesterday 2:00 PM',
        text: 'Superb! Dev environment is already under construction. We will have staging link ready by Friday afternoon.',
        channel: 'email'
      }
    ]
  }
];

export const DEMO_CALLS: CallRecord[] = [
  {
    id: 'call-701',
    contactName: 'Marcus Vance',
    company: 'Apex Summit Roofing LLC',
    country: 'United States',
    market: 'Las Vegas',
    phone: '+1 (702) 555-0194',
    type: 'answered',
    direction: 'inbound',
    durationSeconds: 384,
    isFirstTime: false,
    timestamp: '2026-09-29 09:15',
    source: 'Website Dynamic Number',
    notes: 'Discussed drone embed adjustments for iPad display.',
    isDemoData: true
  },
  {
    id: 'call-702',
    contactName: 'Darren Miller',
    company: 'Silver State Flat Roofers',
    country: 'United States',
    market: 'Las Vegas',
    phone: '+1 (702) 555-8821',
    type: 'answered',
    direction: 'outbound',
    durationSeconds: 520,
    isFirstTime: false,
    timestamp: '2026-09-28 16:30',
    source: 'CRM Lead Followup',
    notes: 'Walked through Pro Plus proposal contract clause 4.2.',
    isDemoData: true
  },
  {
    id: 'call-703',
    contactName: 'Unknown Caller',
    company: 'Inbound Inquiry (Munich)',
    country: 'Germany',
    market: 'Germany',
    phone: '+49 89 9002 110',
    type: 'missed',
    direction: 'inbound',
    durationSeconds: 0,
    isFirstTime: true,
    timestamp: '2026-09-28 14:10',
    source: 'Google Ads Call Extension',
    notes: 'Automated SMS sent to follow up via German template.',
    isDemoData: true
  }
];

export const DEMO_TASKS: OperationalTask[] = [
  {
    id: 'tsk-801',
    title: 'Deploy final SSL & DNS for Apex Summit Roofing',
    clientName: 'Marcus Vance',
    company: 'Apex Summit Roofing LLC',
    projectName: 'Apex Commercial Portal & Drone Gallery',
    dueDate: '2026-10-02',
    priority: 'urgent',
    status: 'in_progress',
    owner: 'Kenji T.',
    isDemoData: true
  },
  {
    id: 'tsk-802',
    title: 'Send adjusted proposal to Silver State Flat Roofers',
    clientName: 'Darren Miller',
    company: 'Silver State Flat Roofers',
    dueDate: '2026-09-30',
    priority: 'high',
    status: 'pending',
    owner: 'Sarah J.',
    isDemoData: true
  },
  {
    id: 'tsk-803',
    title: 'Review French translations on quote calculator',
    clientName: 'Julien Moreau',
    company: 'Toitures de Provence & Fils',
    projectName: 'Provence Terracotta Showcase',
    dueDate: '2026-10-04',
    priority: 'medium',
    status: 'pending',
    owner: 'Sofia M.',
    isDemoData: true
  },
  {
    id: 'tsk-804',
    title: 'Setup automated monthly SEO health check for Sydney Coastal',
    clientName: 'Liam Henderson',
    company: 'Sydney Coastal Roofing Services',
    dueDate: '2026-10-07',
    priority: 'low',
    status: 'pending',
    owner: 'Elena R.',
    isDemoData: true
  }
];

export const DEMO_AUTOMATIONS: AutomationWorkflow[] = [
  {
    id: 'aut-901',
    name: 'Speed-to-Lead Instant Response',
    category: 'Leads',
    trigger: 'New Roofing Lead Form Submitted',
    actions: [
      'Wait 3 minutes',
      'Send personalized SMS introduction with portfolio demo',
      'Wait 2 hours if no reply',
      'Send email with digital roof inspection checklist',
      'Create follow-up task for sales specialist'
    ],
    status: 'active',
    lastExecuted: '12 minutes ago',
    executionCount: 342,
    successRate: 98.4,
    description: 'Engages inbound roofing contractors within 3 minutes to maximize qualification rates.'
  },
  {
    id: 'aut-902',
    name: 'Proposal View & Follow-Up Sequence',
    category: 'Proposals',
    trigger: 'Contract proposal opened by prospect',
    actions: [
      'Notify assigned account manager in Slack / Notification center',
      'Wait 24 hours if proposal remains unsigned',
      'Send polite reminder email highlighting roofing warranty module',
      'Offer 15-minute quick walkthrough booking link'
    ],
    status: 'active',
    lastExecuted: '2 hours ago',
    executionCount: 189,
    successRate: 96.1,
    description: 'Tracks when roofing executives open proposals and automates contextual follow-ups.'
  },
  {
    id: 'aut-903',
    name: 'Milestone Payment Reminder Engine',
    category: 'Payments',
    trigger: 'Invoice status becomes 3 days before due date',
    actions: [
      'Send friendly invoice alert via email with 1-click Stripe payment link',
      'If overdue by 1 day, dispatch SMS reminder to company director',
      'Alert finance manager to hold production release'
    ],
    status: 'active',
    lastExecuted: 'Yesterday at 09:00',
    executionCount: 94,
    successRate: 100,
    description: 'Protects agency cash flow by automating gentle milestone payment notices.'
  },
  {
    id: 'aut-904',
    name: 'Website Launch & Google Review Generator',
    category: 'Projects',
    trigger: 'Project status marked as Live',
    actions: [
      'Trigger DNS cutover validation check',
      'Send congratulations email with Client CMS video tutorial',
      'Wait 7 days after live launch',
      'Send automated review request link for Intellobyte agency page'
    ],
    status: 'active',
    lastExecuted: '7 days ago',
    executionCount: 88,
    successRate: 97.7,
    description: 'Delivers client onboarding materials upon website go-live and collects high-intent testimonials.'
  },
  {
    id: 'aut-905',
    name: 'Cold Lead 90-Day Re-engagement',
    category: 'Leads',
    trigger: 'Opportunity marked Lost or Inactive > 90 days',
    actions: [
      'Check if roofing storm season is starting in prospect region',
      'Send seasonal roofing website audit case study',
      'Trigger prompt for sales re-outreach'
    ],
    status: 'paused',
    lastExecuted: '2 weeks ago',
    executionCount: 42,
    successRate: 91.2,
    description: 'Re-activates stalled roofing prospects during hail and storm repair seasons.'
  }
];

export const DEMO_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    who: 'Elena R. (Lead UI)',
    what: 'Project Status Updated',
    when: '10:45 AM',
    entityType: 'Project',
    details: 'Moved Apex Summit Roofing project to "Client Approval"',
    previousValue: 'Development',
    newValue: 'Client Approval'
  },
  {
    id: 'aud-002',
    who: 'Stripe Webhook',
    what: 'Payment Received',
    when: 'Yesterday 3:20 PM',
    entityType: 'Payment',
    details: 'Received $1,250.00 for INV-2026-094 (Toitures de Provence & Fils)',
    newValue: '$1,250.00'
  },
  {
    id: 'aud-003',
    who: 'Sarah Jenkins (Sales)',
    what: 'Opportunity Stage Changed',
    when: '2026-09-28 11:15',
    entityType: 'Opportunity',
    details: 'Advanced Silver State Flat Roofers to "Negotiation"',
    previousValue: 'Proposal Sent',
    newValue: 'Negotiation'
  },
  {
    id: 'aud-004',
    who: 'David Chen (Admin)',
    what: 'Invoice Created',
    when: '2026-09-25 14:00',
    entityType: 'Invoice',
    details: 'Generated INV-2026-093 for Thames & Cotswold Roofing Ltd ($1,000.00)',
    newValue: 'INV-2026-093'
  },
  {
    id: 'aud-005',
    who: 'System Engine',
    what: 'Automation Executed',
    when: '2026-09-24 09:00',
    entityType: 'Security',
    details: 'Executed Speed-to-Lead Instant Response workflow for new inbound contact',
    newValue: 'Success (200 OK)'
  }
];
