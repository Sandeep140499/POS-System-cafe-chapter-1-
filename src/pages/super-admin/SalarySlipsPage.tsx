import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineOutlined from '@mui/icons-material/RemoveCircleOutlineOutlined';
import PageHeader from 'components/common/PageHeader';

// Employee data with IDs
const EMPLOYEES = [
  { id: 1, name: 'Sandeep Kumar', employeeId: 'EMP001' },
  { id: 2, name: 'Shweta Tiwari', employeeId: 'EMP002' },
  { id: 3, name: 'Shivam Sagar Mishra', employeeId: 'EMP003' },
  { id: 4, name: 'Suman Kumar', employeeId: 'EMP004' },
];

const hSx = {
  fontSize: 10,
  fontWeight: 700,
  color: '#999',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  borderBottom: '1px solid #eae7e2',
  py: 1.5,
  fontFamily: 'Josefin Sans, sans-serif',
};
const cSx = { borderBottom: '1px solid #eae7e2', py: 1.8, fontFamily: 'Josefin Sans, sans-serif' };

// Input styling matching project theme
const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    bgcolor: '#faf9f7',
    fontSize: 14,
    fontFamily: 'Josefin Sans, sans-serif',
    '& fieldset': { borderColor: '#e8e4de' },
    '&:hover fieldset': { borderColor: '#c86030' },
    '&.Mui-focused fieldset': { borderColor: '#c86030', borderWidth: 1.5 },
  },
  '& .MuiInputLabel-root': { fontFamily: 'Josefin Sans, sans-serif', fontSize: 13.5 },
  '& .MuiInputLabel-root.Mui-focused': { color: '#c86030' },
};

// Card section styling
const cardSx = {
  border: '1px solid #eae7e2',
  borderRadius: '16px',
  bgcolor: '#fff',
  p: 3,
  mb: 2,
};

// Section title styling
const sectionTitleSx = {
  fontSize: 14,
  fontWeight: 600,
  color: '#1a1a1a',
  fontFamily: 'Josefin Sans, sans-serif',
  mb: 2,
};

// Subtext styling
const subtextSx = {
  fontSize: 12,
  color: '#666',
  fontFamily: 'Josefin Sans, sans-serif',
  mb: 2,
};

// Company/branch info
const COMPANY_INFO = {
  name: 'Cafe Chapter 1 Restro Private Limited',
  address: 'Gautam Nagar',
  pincode: '110049',
  phone: '+91 98765 43210',
  get logoUrl() {
    return localStorage.getItem('branch_logo_url') || '';
  },
};

interface SalaryComponent {
  id: string;
  name: string;
  amount: number;
}

interface Slip {
  id: number;
  slipNo: string;
  employee: string;
  employeeId: string;
  period: string;
  payDate: string;
  payPeriodStart: string;
  basic: number;
  allowances: SalaryComponent[];
  deductions: SalaryComponent[];
  paidDays: number;
  lopDays: number;
  overtimeHours: number;
  overtimeAmount: number;
  lateDeductions: number;
  status: 'Generated' | 'Sent';
}

const INIT_SLIPS: Slip[] = [
  {
    id: 1,
    slipNo: 'CC1/04/2026/00001',
    employee: 'Sandeep Kumar',
    employeeId: 'EMP001',
    period: 'April 2026',
    payDate: '2026-04-30',
    payPeriodStart: '2026-04-01',
    basic: 18000,
    allowances: [
      { id: 'hra', name: 'House Rent Allowance', amount: 4500 },
      { id: 'other', name: 'Other Allowance', amount: 2000 },
    ],
    deductions: [
      { id: 'tax', name: 'Income Tax', amount: 1800 },
      { id: 'pf', name: 'Provident Fund', amount: 2160 },
    ],
    paidDays: 30,
    lopDays: 0,
    overtimeHours: 0,
    overtimeAmount: 0,
    lateDeductions: 0,
    status: 'Generated',
  },
];

// Calculate salary breakdown
const calcSalary = (slip: Slip) => {
  const grossEarnings =
    slip.basic + slip.allowances.reduce((sum, a) => sum + a.amount, 0) + slip.overtimeAmount;
  const totalDeductions =
    slip.deductions.reduce((sum, d) => sum + d.amount, 0) + slip.lateDeductions;
  const dailyRate = grossEarnings / 30;
  const earnedSalary = dailyRate * slip.paidDays;
  const netSalary = Math.round(earnedSalary - totalDeductions);
  return { grossEarnings, totalDeductions, netSalary, earnedSalary };
};

// Generate next slip number
const generateSlipNo = (slips: Slip[]) => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const nextNum = String(slips.length + 1).padStart(5, '0');
  return `CC1/${month}/${year}/${nextNum}`;
};

// Get month name
const getMonthName = (monthNum: number) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[monthNum - 1];
};

export function SalarySlipsPage() {
  const [slips, setSlips] = useState<Slip[]>(INIT_SLIPS);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewSlip, setPreviewSlip] = useState<Slip | null>(null);
  const [toast, setToast] = useState('');
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  // Form state
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [payDate, setPayDate] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [paidDays, setPaidDays] = useState('22');
  const [lopDays, setLopDays] = useState('0');

  // Dynamic earnings and deductions
  const [allowances, setAllowances] = useState<SalaryComponent[]>([
    { id: 'hra', name: 'House Rent Allowance', amount: 0 },
    { id: 'other', name: 'Other Allowance', amount: 0 },
  ]);
  const [deductions, setDeductions] = useState<SalaryComponent[]>([
    { id: 'tax', name: 'Income Tax', amount: 0 },
    { id: 'pf', name: 'Provident Fund', amount: 0 },
  ]);

  // Overtime and late
  const [overtimeStart, setOvertimeStart] = useState('');
  const [overtimeEnd, setOvertimeEnd] = useState('');
  const [lateStart, setLateStart] = useState('');
  const [lateEnd, setLateEnd] = useState('');

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(''), 3000);
  };

  const f = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  // Get company info with logo
  const companyInfo = useMemo(
    () => ({
      ...COMPANY_INFO,
      logoUrl: localStorage.getItem('branch_logo_url') || '',
    }),
    []
  );

  // Get selected employee details
  const selectedEmpDetails = useMemo(() => {
    return EMPLOYEES.find(e => e.name === selectedEmployee);
  }, [selectedEmployee]);

  // Calculate salary summary
  const salarySummary = useMemo(() => {
    const basic = Number(basicSalary) || 0;
    const totalAllowances = allowances.reduce((sum, a) => sum + (Number(a.amount) || 0), 0);
    const grossSalary = basic + totalAllowances;
    const totalDeduction = deductions.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    const netSalary = grossSalary - totalDeduction;
    return { grossSalary, totalDeduction, netSalary };
  }, [basicSalary, allowances, deductions]);

  const totalPaid = slips.reduce((s, sl) => s + calcSalary(sl).netSalary, 0);

  // Reset form
  const resetForm = () => {
    setSelectedEmployee('');
    setSelectedMonth(new Date().getMonth() + 1);
    setSelectedYear(new Date().getFullYear());
    setPayDate('');
    setBasicSalary('');
    setPaidDays('22');
    setLopDays('0');
    setAllowances([
      { id: 'hra', name: 'House Rent Allowance', amount: 0 },
      { id: 'other', name: 'Other Allowance', amount: 0 },
    ]);
    setDeductions([
      { id: 'tax', name: 'Income Tax', amount: 0 },
      { id: 'pf', name: 'Provident Fund', amount: 0 },
    ]);
    setOvertimeStart('');
    setOvertimeEnd('');
    setLateStart('');
    setLateEnd('');
  };

  // Handle add/remove allowance
  const addAllowance = () => {
    setAllowances([...allowances, { id: Date.now().toString(), name: '', amount: 0 }]);
  };
  const removeAllowance = (id: string) => {
    setAllowances(allowances.filter(a => a.id !== id));
  };
  const updateAllowance = (id: string, field: keyof SalaryComponent, value: string | number) => {
    setAllowances(allowances.map(a => (a.id === id ? { ...a, [field]: value } : a)));
  };

  // Handle add/remove deduction
  const addDeduction = () => {
    setDeductions([...deductions, { id: Date.now().toString(), name: '', amount: 0 }]);
  };
  const removeDeduction = (id: string) => {
    setDeductions(deductions.filter(d => d.id !== id));
  };
  const updateDeduction = (id: string, field: keyof SalaryComponent, value: string | number) => {
    setDeductions(deductions.map(d => (d.id === id ? { ...d, [field]: value } : d)));
  };

  // Generate HTML salary slip
  const generateSalarySlipHTML = (slip: Slip): string => {
    const calc = calcSalary(slip);
    const monthName = slip.period.split(' ')[0];
    const year = slip.period.split(' ')[1];
    const payDateFormatted = new Date(slip.payDate).toISOString().split('T')[0];

    // Logo HTML for header
    const logoHtml = companyInfo.logoUrl
      ? `<img src="${companyInfo.logoUrl}" alt="Logo" style="width: 64px; height: 64px; border-radius: 12px; object-fit: cover;" />`
      : `<div style="width: 64px; height: 64px; border-radius: 12px; background: linear-gradient(135deg, #c86030 0%, #a8502a 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px; font-family: 'Josefin Sans', sans-serif;">CC1</div>`;

    // Watermark HTML
    const watermarkHtml = companyInfo.logoUrl
      ? `<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.06; pointer-events: none; z-index: 0;"><img src="${companyInfo.logoUrl}" style="width: 200px; height: 200px; object-fit: contain; filter: grayscale(100%) brightness(1.2);" /></div>`
      : `<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.06; font-size: 120px; font-weight: 700; color: #c86030; pointer-events: none; z-index: 0; font-family: 'Josefin Sans', sans-serif;">CC1</div>`;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <title>Salary Slip - ${slip.employee}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Josefin Sans', sans-serif;
      background: #fff;
      padding: 40px;
      color: #1a1a1a;
    }
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.06;
      font-size: 120px;
      font-weight: 700;
      color: #c86030;
      pointer-events: none;
      z-index: 0;
      font-family: 'Josefin Sans', sans-serif;
    }
    .header {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #eae7e2;
    }
    .logo {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      background: linear-gradient(135deg, #c86030 0%, #a8502a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 24px;
      font-family: 'Josefin Sans', sans-serif;
    }
    .company-info h1 {
      font-size: 20px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 4px;
      font-family: 'Josefin Sans', sans-serif;
    }
    .company-info p {
      font-size: 13px;
      color: #666;
      font-family: 'Josefin Sans', sans-serif;
    }
    .slip-title, .detail-label, .detail-value, .section-title, th, td, .summary-row, .signature-line, .footer {
      font-family: 'Josefin Sans', sans-serif;
    }
    .slip-title {
      font-size: 16px;
      font-weight: 600;
      color: #c86030;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px 40px;
      margin-bottom: 30px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      padding: 8px 0;
      border-bottom: 1px solid #f0ede8;
    }
    .detail-label { color: #666; font-weight: 500; }
    .detail-value { color: #1a1a1a; font-weight: 600; }
    .section-title {
      background: #faf9f7;
      padding: 10px 15px;
      font-size: 12px;
      font-weight: 700;
      color: #1a1a1a;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 20px 0 0 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th {
      text-align: left;
      padding: 12px 15px;
      font-size: 11px;
      font-weight: 700;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      background: #faf9f7;
      border-bottom: 2px solid #eae7e2;
    }
    td {
      padding: 12px 15px;
      font-size: 13px;
      border-bottom: 1px solid #f0ede8;
    }
    .amount { text-align: right; font-weight: 600; }
    .total-row {
      background: #f5f3ef;
      font-weight: 700;
    }
    .summary-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 12px;
      padding: 20px;
      margin-top: 20px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .summary-row:last-child {
      margin-bottom: 0;
      padding-top: 10px;
      border-top: 2px solid #86efac;
      font-size: 16px;
      font-weight: 700;
      color: #047857;
    }
    .net-salary {
      color: #047857;
      font-weight: 700;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
    .signature-line {
      margin-top: 40px;
      border-top: 1px solid #eae7e2;
      padding-top: 10px;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  ${watermarkHtml}
  
  <div class="header">
    ${logoHtml}
    <div class="company-info">
      <h1>${companyInfo.name}</h1>
      <p>${companyInfo.address}, India - ${companyInfo.pincode} | ${companyInfo.phone}</p>
    </div>
  </div>
  
  <div class="slip-title">Salary Slip — ${monthName} ${year}</div>
  
  <div class="details-grid">
    <div class="detail-row">
      <span class="detail-label">Salary Slip No:</span>
      <span class="detail-value">${slip.slipNo}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Employee Name:</span>
      <span class="detail-value">${slip.employee}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Employee ID:</span>
      <span class="detail-value">${slip.employeeId || '—'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Pay Period:</span>
      <span class="detail-value">${slip.payPeriodStart ? slip.payPeriodStart.split('-').reverse().join('-') : '—'} — ${payDateFormatted.split('-').reverse().join('-')}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Pay Date:</span>
      <span class="detail-value">${payDateFormatted}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Paid Days:</span>
      <span class="detail-value">${slip.paidDays}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">LOP Days:</span>
      <span class="detail-value">${slip.lopDays}</span>
    </div>
  </div>
  
  <div class="section-title">Earnings</div>
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th class="amount">Amount (₹)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Basic Salary</td>
        <td class="amount">₹${slip.basic.toLocaleString('en-IN')}</td>
      </tr>
      ${slip.allowances
        .map(
          a => `
      <tr>
        <td>${a.name}</td>
        <td class="amount">₹${a.amount.toLocaleString('en-IN')}</td>
      </tr>
      `
        )
        .join('')}
      ${
        slip.overtimeAmount > 0
          ? `
      <tr>
        <td>Overtime (${slip.overtimeHours} hrs)</td>
        <td class="amount">₹${slip.overtimeAmount.toLocaleString('en-IN')}</td>
      </tr>
      `
          : ''
      }
    </tbody>
  </table>
  
  <div class="section-title">Deductions</div>
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th class="amount">Amount (₹)</th>
      </tr>
    </thead>
    <tbody>
      ${slip.deductions
        .map(
          d => `
      <tr>
        <td>${d.name}</td>
        <td class="amount">₹${d.amount.toLocaleString('en-IN')}</td>
      </tr>
      `
        )
        .join('')}
      ${
        slip.lateDeductions > 0
          ? `
      <tr>
        <td>Late Deductions</td>
        <td class="amount">₹${slip.lateDeductions.toLocaleString('en-IN')}</td>
      </tr>
      `
          : ''
      }
    </tbody>
  </table>
  
  <div class="summary-box">
    <div class="summary-row">
      <span>Gross Salary</span>
      <span class="amount">₹${calc.grossEarnings.toLocaleString('en-IN')}</span>
    </div>
    <div class="summary-row">
      <span>Total Deductions</span>
      <span class="amount" style="color: #c62828;">₹${calc.totalDeductions.toLocaleString('en-IN')}</span>
    </div>
    <div class="summary-row">
      <span>Net Salary</span>
      <span class="net-salary">₹${calc.netSalary.toLocaleString('en-IN')}</span>
    </div>
  </div>
  
  <div class="signature-line">
    Authorized Signature — Cafe Chapter 1 Restro Private Limited
  </div>
  
  <div class="footer no-print">
    <p>This is a computer generated salary slip and does not require signature.</p>
  </div>
</body>
</html>`;
  };

  // Handle generate slip
  const handleGenerate = () => {
    if (!selectedEmployee || !payDate || !basicSalary) {
      showToast('Please fill in all required fields');
      return;
    }

    const newSlip: Slip = {
      id: Date.now(),
      slipNo: generateSlipNo(slips),
      employee: selectedEmployee,
      employeeId: selectedEmpDetails?.employeeId || '',
      period: `${getMonthName(selectedMonth)} ${selectedYear}`,
      payDate,
      payPeriodStart: `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`,
      basic: Number(basicSalary),
      allowances: allowances
        .filter(a => a.name && a.amount)
        .map(a => ({ ...a, amount: Number(a.amount) })),
      deductions: deductions
        .filter(d => d.name && d.amount)
        .map(d => ({ ...d, amount: Number(d.amount) })),
      paidDays: Number(paidDays) || 22,
      lopDays: Number(lopDays) || 0,
      overtimeHours: 0,
      overtimeAmount: 0,
      lateDeductions: 0,
      status: 'Generated',
    };

    setSlips([...slips, newSlip]);
    showToast('Salary slip generated successfully!');
    resetForm();
    setModalOpen(false);
  };

  // Handle preview
  const handlePreview = (slip: Slip) => {
    const html = generateSalarySlipHTML(slip);
    setHtmlContent(html);
    setShowHtmlPreview(true);
  };

  // Handle download
  const handleDownload = (slip: Slip) => {
    const html = generateSalarySlipHTML(slip);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SalarySlip_${slip.employee}_${slip.period.replace(' ', '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Salary slip downloaded!');
  };

  return (
    <Box>
      {toast && (
        <Box
          sx={{
            position: 'fixed',
            top: 80,
            right: 24,
            zIndex: 9999,
            bgcolor: '#1a1a1a',
            color: '#fff',
            px: 3,
            py: 1.5,
            borderRadius: '12px',
            fontSize: 14,
            fontFamily: 'Josefin Sans, sans-serif',
          }}
        >
          {toast}
        </Box>
      )}

      <PageHeader
        label="FINANCE"
        title="Salary Slips"
        subtitle="Generate, preview, and send employee payslips."
        action={
          <Button
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              resetForm();
              setModalOpen(true);
            }}
            sx={{
              bgcolor: '#c86030',
              color: '#fff',
              borderRadius: '20px',
              px: 2.5,
              py: 1,
              textTransform: 'none',
              fontSize: 14,
              fontFamily: 'Josefin Sans, sans-serif',
              '&:hover': { bgcolor: '#a8502a' },
            }}
          >
            Generate Slip
          </Button>
        }
      />

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
        <Box sx={{ bgcolor: '#fff', borderRadius: '20px', border: '1px solid #eae7e2', p: 2.5 }}>
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 700,
              color: '#c86030',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              mb: 0.5,
              fontFamily: 'Josefin Sans, sans-serif',
            }}
          >
            TOTAL SALARY PAID (THIS MONTH)
          </Typography>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 700,
              color: '#1a1a1a',
              fontFamily: 'Josefin Sans, sans-serif',
            }}
          >
            {f(totalPaid)}
          </Typography>
        </Box>
        <Box sx={{ bgcolor: '#fff', borderRadius: '20px', border: '1px solid #eae7e2', p: 2.5 }}>
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 700,
              color: '#c86030',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              mb: 0.5,
              fontFamily: 'Josefin Sans, sans-serif',
            }}
          >
            PAYSLIPS GENERATED
          </Typography>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 700,
              color: '#1a1a1a',
              fontFamily: 'Josefin Sans, sans-serif',
            }}
          >
            {slips.length}
          </Typography>
        </Box>
      </Box>

      {/* Table */}
      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid #eae7e2',
          overflow: 'hidden',
        }}
      >
        {slips.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ReceiptOutlinedIcon sx={{ fontSize: 40, color: '#ddd', mb: 1.5 }} />
            <Typography
              sx={{ fontSize: 15, color: '#999', fontFamily: 'Josefin Sans, sans-serif' }}
            >
              No salary slips generated yet.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={hSx}>Slip No.</TableCell>
                  <TableCell sx={hSx}>Employee</TableCell>
                  <TableCell sx={hSx}>Period</TableCell>
                  <TableCell sx={{ ...hSx, textAlign: 'right' }}>Gross</TableCell>
                  <TableCell sx={{ ...hSx, textAlign: 'right' }}>Deductions</TableCell>
                  <TableCell sx={{ ...hSx, textAlign: 'right' }}>Net Pay</TableCell>
                  <TableCell sx={hSx}>Status</TableCell>
                  <TableCell sx={{ ...hSx, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slips.map(sl => {
                  const calc = calcSalary(sl);
                  return (
                    <TableRow
                      key={sl.id}
                      sx={{ '&:hover': { bgcolor: '#faf9f7' }, '&:last-child td': { border: 0 } }}
                    >
                      <TableCell sx={cSx}>
                        <Typography
                          sx={{
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: '#c86030',
                            fontFamily: 'Josefin Sans, sans-serif',
                          }}
                        >
                          {sl.slipNo}
                        </Typography>
                      </TableCell>
                      <TableCell sx={cSx}>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: '#1a1a1a',
                            fontFamily: 'Josefin Sans, sans-serif',
                          }}
                        >
                          {sl.employee}
                        </Typography>
                      </TableCell>
                      <TableCell sx={cSx}>
                        <Typography
                          sx={{
                            fontSize: 13.5,
                            color: '#555',
                            fontFamily: 'Josefin Sans, sans-serif',
                          }}
                        >
                          {sl.period}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ ...cSx, textAlign: 'right' }}>
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: '#333',
                            fontFamily: 'Josefin Sans, sans-serif',
                          }}
                        >
                          {f(calc.grossEarnings)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ ...cSx, textAlign: 'right' }}>
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: '#c62828',
                            fontFamily: 'Josefin Sans, sans-serif',
                          }}
                        >
                          -{f(calc.totalDeductions)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ ...cSx, textAlign: 'right' }}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: '#2e7d32',
                            fontFamily: 'Josefin Sans, sans-serif',
                          }}
                        >
                          {f(calc.netSalary)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={cSx}>
                        <Chip
                          label={sl.status}
                          size="small"
                          sx={{
                            bgcolor: sl.status === 'Sent' ? '#e3f0e8' : '#eeedea',
                            color: sl.status === 'Sent' ? '#2e7d32' : '#555',
                            fontWeight: 600,
                            fontSize: 11,
                            height: 24,
                            borderRadius: '12px',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ ...cSx, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handlePreview(sl)}
                            sx={{
                              color: '#888',
                              '&:hover': { color: '#c86030', bgcolor: '#fef3f0' },
                            }}
                          >
                            <VisibilityOutlinedIcon sx={{ fontSize: 17 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDownload(sl)}
                            sx={{
                              color: '#888',
                              '&:hover': { color: '#1565c0', bgcolor: '#e8f0fe' },
                            }}
                          >
                            <DownloadOutlinedIcon sx={{ fontSize: 17 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSlips(p =>
                                p.map(s => (s.id === sl.id ? { ...s, status: 'Sent' } : s))
                              );
                              showToast('Email sent!');
                            }}
                            sx={{
                              color: '#888',
                              '&:hover': { color: '#2e7d32', bgcolor: '#e3f0e8' },
                            }}
                          >
                            <EmailOutlinedIcon sx={{ fontSize: 17 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => showToast('WhatsApp message prepared!')}
                            sx={{
                              color: '#888',
                              '&:hover': { color: '#2e7d32', bgcolor: '#e3f0e8' },
                            }}
                          >
                            <WhatsAppIcon sx={{ fontSize: 17 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => setSlips(p => p.filter(s => s.id !== sl.id))}
                            sx={{
                              color: '#888',
                              '&:hover': { color: '#c62828', bgcolor: '#fce4e4' },
                            }}
                          >
                            <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Generate Slip Dialog */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': { borderRadius: '20px', overflow: 'hidden', maxHeight: '90vh' },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #c86030 0%, #a8502a 100%)',
            color: '#fff',
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {companyInfo.logoUrl ? (
              <Box
                component="img"
                src={companyInfo.logoUrl}
                alt="Logo"
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '12px',
                  objectFit: 'cover',
                  bgcolor: 'rgba(255,255,255,0.15)',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '12px',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 700,
                  fontFamily: 'Josefin Sans, sans-serif',
                }}
              >
                CC1
              </Box>
            )}
            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  opacity: 0.8,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  mb: 0.5,
                  fontFamily: 'Josefin Sans, sans-serif',
                }}
              >
                RESTAURANT / COMPANY
              </Typography>
              <Typography
                sx={{ fontSize: 18, fontWeight: 700, fontFamily: 'Josefin Sans, sans-serif' }}
              >
                {companyInfo.name}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: 13, mb: 1, fontFamily: 'Josefin Sans, sans-serif' }}>
              Payslip For The Month
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(255,255,255,0.15)',
                borderRadius: '10px',
                px: 2,
                py: 1,
              }}
            >
              <FormControl variant="standard" sx={{ minWidth: 100 }}>
                <Select
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(Number(e.target.value))}
                  sx={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'Josefin Sans, sans-serif',
                    '& .MuiSelect-icon': { color: '#fff' },
                    '&:before': { borderBottom: 'none' },
                    '&:after': { borderBottom: 'none' },
                    '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                  }}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem
                      key={i + 1}
                      value={i + 1}
                      sx={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {getMonthName(i + 1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, fontFamily: 'Josefin Sans, sans-serif' }}
              >
                ,
              </Typography>
              <FormControl variant="standard" sx={{ minWidth: 80 }}>
                <Select
                  value={selectedYear}
                  onChange={e => setSelectedYear(Number(e.target.value))}
                  sx={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'Josefin Sans, sans-serif',
                    '& .MuiSelect-icon': { color: '#fff' },
                    '&:before': { borderBottom: 'none' },
                    '&:after': { borderBottom: 'none' },
                    '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                  }}
                >
                  {[2024, 2025, 2026, 2027, 2028].map(year => (
                    <MenuItem
                      key={year}
                      value={year}
                      sx={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <CalendarTodayIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{ fontSize: 12, mt: 0.5, opacity: 0.8, fontFamily: 'Josefin Sans, sans-serif' }}
            >
              {String(selectedMonth).padStart(2, '0')} - {getMonthName(selectedMonth)}{' '}
              {selectedYear}
            </Typography>
          </Box>
        </Box>

        <DialogContent sx={{ p: 3, bgcolor: '#faf9f7' }}>
          {/* Employee Selection */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: '#1a1a1a',
                mb: 1,
                fontFamily: 'Josefin Sans, sans-serif',
              }}
            >
              Employee <span style={{ color: '#c86030' }}>*</span>
            </Typography>
            <FormControl fullWidth sx={inputSx}>
              <InputLabel>Select employee</InputLabel>
              <Select
                value={selectedEmployee}
                label="Select employee"
                onChange={e => setSelectedEmployee(e.target.value)}
              >
                {EMPLOYEES.map(emp => (
                  <MenuItem key={emp.id} value={emp.name}>
                    {emp.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Employee Details Card */}
          <Box sx={cardSx}>
            <Typography sx={sectionTitleSx}>Employee Details</Typography>

            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: '#666',
                  mb: 0.5,
                  fontFamily: 'Josefin Sans, sans-serif',
                }}
              >
                Salary Slip No. (auto-generated, not editable)
              </Typography>
              <TextField
                fullWidth
                value={generateSlipNo(slips)}
                disabled
                sx={{
                  ...inputSx,
                  '& .MuiOutlinedInput-root': {
                    ...inputSx['& .MuiOutlinedInput-root'],
                    bgcolor: '#f0f0f0',
                  },
                }}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
              <TextField
                label="Employee Name"
                value={selectedEmpDetails?.name || ''}
                disabled
                sx={{
                  ...inputSx,
                  '& .MuiOutlinedInput-root': {
                    ...inputSx['& .MuiOutlinedInput-root'],
                    bgcolor: '#f0f0f0',
                  },
                }}
              />
              <TextField
                label="Employee ID"
                value={selectedEmpDetails?.employeeId || ''}
                disabled
                sx={{
                  ...inputSx,
                  '& .MuiOutlinedInput-root': {
                    ...inputSx['& .MuiOutlinedInput-root'],
                    bgcolor: '#f0f0f0',
                  },
                }}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="Pay Period"
                type="date"
                value={`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`}
                disabled
                sx={{
                  ...inputSx,
                  '& .MuiOutlinedInput-root': {
                    ...inputSx['& .MuiOutlinedInput-root'],
                    bgcolor: '#f0f0f0',
                  },
                }}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Pay Date"
                type="date"
                required
                value={payDate}
                onChange={e => setPayDate(e.target.value)}
                sx={inputSx}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
          </Box>

          {/* Overtime Section */}
          <Box sx={cardSx}>
            <Typography sx={sectionTitleSx}>Overtime (optional)</Typography>
            <Typography sx={subtextSx}>
              Load overtime for the selected employee in a date range, then add total hours to the
              slip. Amount is calculated from basic salary and working hours per day.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
              <TextField
                label="Start date"
                type="date"
                value={overtimeStart}
                onChange={e => setOvertimeStart(e.target.value)}
                sx={inputSx}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="End date"
                type="date"
                value={overtimeEnd}
                onChange={e => setOvertimeEnd(e.target.value)}
                sx={inputSx}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#e8e4de',
                color: '#666',
                textTransform: 'none',
                borderRadius: '10px',
                fontFamily: 'Josefin Sans, sans-serif',
                '&:hover': { borderColor: '#c86030', color: '#c86030', bgcolor: '#fef3f0' },
              }}
            >
              Load overtime
            </Button>
          </Box>

          {/* Late Section */}
          <Box sx={cardSx}>
            <Typography sx={sectionTitleSx}>Late (optional)</Typography>
            <Typography sx={subtextSx}>
              Load late entries for the selected employee in a date range. You can add a late
              deduction to the slip if needed.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
              <TextField
                label="Start date"
                type="date"
                value={lateStart}
                onChange={e => setLateStart(e.target.value)}
                sx={inputSx}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="End date"
                type="date"
                value={lateEnd}
                onChange={e => setLateEnd(e.target.value)}
                sx={inputSx}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#e8e4de',
                color: '#666',
                textTransform: 'none',
                borderRadius: '10px',
                fontFamily: 'Josefin Sans, sans-serif',
                '&:hover': { borderColor: '#c86030', color: '#c86030', bgcolor: '#fef3f0' },
              }}
            >
              Load late
            </Button>
          </Box>

          {/* Salary Earnings */}
          <Box sx={cardSx}>
            <Typography sx={sectionTitleSx}>Salary Earnings</Typography>

            {/* Basic Salary */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
                pb: 2,
                borderBottom: '1px solid #f0ede8',
              }}
            >
              <Typography sx={{ flex: 1, fontSize: 14, fontFamily: 'Josefin Sans, sans-serif' }}>
                Basic Salary
              </Typography>
              <Typography sx={{ fontSize: 16, color: '#666' }}>₹</Typography>
              <TextField
                type="number"
                required
                value={basicSalary}
                onChange={e => setBasicSalary(e.target.value)}
                sx={{ ...inputSx, width: 120 }}
              />
            </Box>

            {/* Allowances */}
            {allowances.map((allowance, index) => (
              <Box
                key={allowance.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                  pb: 2,
                  borderBottom: index < allowances.length - 1 ? '1px solid #f0ede8' : 'none',
                }}
              >
                <TextField
                  placeholder="Allowance name"
                  value={allowance.name}
                  onChange={e => updateAllowance(allowance.id, 'name', e.target.value)}
                  sx={{ ...inputSx, flex: 1 }}
                />
                <Typography sx={{ fontSize: 16, color: '#666' }}>₹</Typography>
                <TextField
                  type="number"
                  value={allowance.amount || ''}
                  onChange={e => updateAllowance(allowance.id, 'amount', Number(e.target.value))}
                  sx={{ ...inputSx, width: 120 }}
                />
                {allowances.length > 1 && (
                  <IconButton
                    onClick={() => removeAllowance(allowance.id)}
                    sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fef2f2' } }}
                  >
                    <RemoveCircleOutlineOutlined />
                  </IconButton>
                )}
              </Box>
            ))}

            <Button
              startIcon={<AddIcon />}
              onClick={addAllowance}
              sx={{
                color: '#10b981',
                textTransform: 'none',
                fontFamily: 'Josefin Sans, sans-serif',
                '&:hover': { bgcolor: '#f0fdf4' },
              }}
            >
              + Add Earnings
            </Button>
          </Box>

          {/* Deductions */}
          <Box sx={cardSx}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <RemoveCircleOutlineOutlined sx={{ color: '#ef4444', fontSize: 20 }} />
              <Typography sx={[sectionTitleSx, { mb: 0 }]}>Deductions</Typography>
            </Box>

            {deductions.map((deduction, index) => (
              <Box
                key={deduction.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                  pb: 2,
                  borderBottom: index < deductions.length - 1 ? '1px solid #f0ede8' : 'none',
                }}
              >
                <TextField
                  placeholder="Deduction name"
                  value={deduction.name}
                  onChange={e => updateDeduction(deduction.id, 'name', e.target.value)}
                  sx={{ ...inputSx, flex: 1 }}
                />
                <Typography sx={{ fontSize: 16, color: '#666' }}>₹</Typography>
                <TextField
                  type="number"
                  value={deduction.amount || ''}
                  onChange={e => updateDeduction(deduction.id, 'amount', Number(e.target.value))}
                  sx={{ ...inputSx, width: 120 }}
                />
                {deductions.length > 1 && (
                  <IconButton
                    onClick={() => removeDeduction(deduction.id)}
                    sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fef2f2' } }}
                  >
                    <RemoveCircleOutlineOutlined />
                  </IconButton>
                )}
              </Box>
            ))}

            <Button
              startIcon={<AddIcon />}
              onClick={addDeduction}
              sx={{
                color: '#ef4444',
                textTransform: 'none',
                fontFamily: 'Josefin Sans, sans-serif',
                '&:hover': { bgcolor: '#fef2f2' },
              }}
            >
              + Add Deductions
            </Button>
          </Box>

          {/* Salary Summary */}
          <Box sx={{ ...cardSx, bgcolor: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <Typography sx={{ ...sectionTitleSx, color: '#047857' }}>Salary Summary</Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: '#666',
                    mb: 0.5,
                    fontFamily: 'Josefin Sans, sans-serif',
                  }}
                >
                  Paid Days
                </Typography>
                <TextField
                  type="number"
                  value={paidDays}
                  onChange={e => setPaidDays(e.target.value)}
                  sx={{ ...inputSx, '& .MuiOutlinedInput-root': { bgcolor: '#fff' } }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: '#666',
                    mb: 0.5,
                    fontFamily: 'Josefin Sans, sans-serif',
                  }}
                >
                  LOP Days
                </Typography>
                <TextField
                  type="number"
                  value={lopDays}
                  onChange={e => setLopDays(e.target.value)}
                  sx={{ ...inputSx, '& .MuiOutlinedInput-root': { bgcolor: '#fff' } }}
                />
              </Box>
            </Box>

            <Box sx={{ borderTop: '1px solid #bbf7d0', pt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography
                  sx={{ fontSize: 14, color: '#374151', fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Gross Salary
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#1a1a1a',
                    fontFamily: 'Josefin Sans, sans-serif',
                  }}
                >
                  {f(salarySummary.grossSalary)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography
                  sx={{ fontSize: 14, color: '#374151', fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Total Deduction
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#ef4444',
                    fontFamily: 'Josefin Sans, sans-serif',
                  }}
                >
                  {f(salarySummary.totalDeduction)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  pt: 2,
                  borderTop: '1px solid #86efac',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#047857',
                    fontFamily: 'Josefin Sans, sans-serif',
                  }}
                >
                  Net Salary
                </Typography>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#047857',
                    fontFamily: 'Josefin Sans, sans-serif',
                  }}
                >
                  {f(salarySummary.netSalary)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 2,
              borderTop: '1px solid #eae7e2',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                startIcon={<VisibilityOutlinedIcon />}
                onClick={() => {
                  const tempSlip: Slip = {
                    id: Date.now(),
                    slipNo: generateSlipNo(slips),
                    employee: selectedEmployee,
                    employeeId: selectedEmpDetails?.employeeId || '',
                    period: `${getMonthName(selectedMonth)} ${selectedYear}`,
                    payDate,
                    payPeriodStart: `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`,
                    basic: Number(basicSalary) || 0,
                    allowances: allowances
                      .filter(a => a.name && a.amount)
                      .map(a => ({ ...a, amount: Number(a.amount) })),
                    deductions: deductions
                      .filter(d => d.name && d.amount)
                      .map(d => ({ ...d, amount: Number(d.amount) })),
                    paidDays: Number(paidDays) || 22,
                    lopDays: Number(lopDays) || 0,
                    overtimeHours: 0,
                    overtimeAmount: 0,
                    lateDeductions: 0,
                    status: 'Generated',
                  };
                  const html = generateSalarySlipHTML(tempSlip);
                  setHtmlContent(html);
                  setShowHtmlPreview(true);
                }}
                disabled={!selectedEmployee || !payDate || !basicSalary}
                sx={{
                  border: '1px solid #e8e4de',
                  color: '#555',
                  textTransform: 'none',
                  borderRadius: '10px',
                  fontFamily: 'Josefin Sans, sans-serif',
                  px: 2,
                  '&:hover': { borderColor: '#c86030', color: '#c86030' },
                  '&:disabled': { color: '#aaa', borderColor: '#eee' },
                }}
              >
                Preview
              </Button>
              <Button
                startIcon={<DownloadOutlinedIcon />}
                disabled={!selectedEmployee || !payDate || !basicSalary}
                sx={{
                  border: '1px solid #e8e4de',
                  color: '#555',
                  textTransform: 'none',
                  borderRadius: '10px',
                  fontFamily: 'Josefin Sans, sans-serif',
                  px: 2,
                  '&:hover': { borderColor: '#c86030', color: '#c86030' },
                  '&:disabled': { color: '#aaa', borderColor: '#eee' },
                }}
              >
                Download
              </Button>
              <Button
                startIcon={<EmailOutlinedIcon />}
                disabled={!selectedEmployee || !payDate || !basicSalary}
                sx={{
                  border: '1px solid #e8e4de',
                  color: '#555',
                  textTransform: 'none',
                  borderRadius: '10px',
                  fontFamily: 'Josefin Sans, sans-serif',
                  px: 2,
                  '&:hover': { borderColor: '#c86030', color: '#c86030' },
                  '&:disabled': { color: '#aaa', borderColor: '#eee' },
                }}
              >
                Send Email
              </Button>
              <Button
                startIcon={<WhatsAppIcon />}
                disabled={!selectedEmployee || !payDate || !basicSalary}
                sx={{
                  border: '1px solid #e8e4de',
                  color: '#555',
                  textTransform: 'none',
                  borderRadius: '10px',
                  fontFamily: 'Josefin Sans, sans-serif',
                  px: 2,
                  '&:hover': { borderColor: '#c86030', color: '#c86030' },
                  '&:disabled': { color: '#aaa', borderColor: '#eee' },
                }}
              >
                WhatsApp
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                onClick={() => setModalOpen(false)}
                sx={{
                  color: '#666',
                  textTransform: 'none',
                  fontFamily: 'Josefin Sans, sans-serif',
                  px: 3,
                }}
              >
                Cancel
              </Button>
              <Button
                startIcon={<AddRoundedIcon />}
                onClick={handleGenerate}
                disabled={!selectedEmployee || !payDate || !basicSalary}
                sx={{
                  bgcolor: '#10b981',
                  color: '#fff',
                  textTransform: 'none',
                  borderRadius: '10px',
                  fontFamily: 'Josefin Sans, sans-serif',
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#059669' },
                  '&:disabled': { bgcolor: '#d1d5db' },
                }}
              >
                Generate Salary Slip
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* HTML Preview Dialog */}
      <Dialog
        open={showHtmlPreview}
        onClose={() => setShowHtmlPreview(false)}
        maxWidth="lg"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '20px', overflow: 'hidden', height: '90vh' } }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#faf9f7',
            borderBottom: '1px solid #eae7e2',
          }}
        >
          <Typography
            sx={{ fontSize: 16, fontWeight: 600, fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Salary Slip Preview
          </Typography>
          <IconButton onClick={() => setShowHtmlPreview(false)} sx={{ color: '#666' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, bgcolor: '#f5f5f5' }}>
          <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <iframe
              srcDoc={htmlContent}
              style={{ width: '100%', height: '100%', border: 'none', minHeight: '600px' }}
              title="Salary Slip Preview"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
