export const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
export const DATA01 = [1, 2, 3, 4, 5, 6, 7];
export const DATA02 = [1, 2, 3];

export const AVATAR =
  'https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/307203668_1797476410594461_1699256264537083652_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=uhIrX6DNo6AAX_zIppk&tn=-FMaB6BtpBMcmJuN&_nc_ht=scontent-hkg4-2.xx&oh=00_AT-ljBslhi4k1Q8lk5IjL2IAzb9mmhJmcPiGJd2fuVCL1w&oe=63346718';

export const HOME_KEYWORD = {
  RevenueWallet: 'Ví doanh thu',
  WithdrawMoney: 'Rút tiền',
  Reinvestment: 'Tái đầu tư',
  RemainingRevenue: 'Doanh thu còn lại',
  List: 'Danh sách',
  WithdrawalPending: 'Lệnh rút đang chờ',
  TodayRevenue: 'Doanh thu hôm nay',
  InvestmentList: 'Danh sách đang đầu tư',
  TotalInvestment: 'Tổng đầu tư',
  RevenueReceived: 'Doanh thu đã nhận',
  TotalRevenue: 'Tổng doanh thu',
  Detail: 'Chi tiết',
  SeeContract: 'Xem hợp đồng',
  Contract: 'Hợp đồng',
  NewProjects: 'Dự án mới',
  ViewToAll: 'Xem tất cả',
  Website: 'Website',
  StartDate: 'Ngày khởi tạo',
  Turnover: 'Doanh thu',
  Invest: 'Đầu tư',
  Investors: 'Nhà đầu tư',
  News: 'Tin tức',
  Event: 'Sự kiện',
  NewsAndEvent: 'Tin tức và Sự kiện',
  AmountInRevenueWallet: 'Số tiền trong ví doanh thu',
  AmountWantToWithdraw: 'Số tiền muốn rút',
  SecurityCode: 'Mã bảo mật',
  Cancel: 'Hủy',
  InputWithdrawMoney01: 'Nhập số tiền trong ví doanh thu',
  InputWithdrawMoney02: 'Nhập số tiền cần rút',
  InputWithdrawMoney03: 'Nhập mã bảo mật',
  Notification: 'Thông báo',
  NoticeDetails: 'Chi tiết thông báo',
  Discount: 'Khuyến mãi',
  InvestmentManagement: 'Quản lý đầu tư',
  Management: 'Quản lý',
  InvestmentDetails: 'Chi tiết đầu tư',
  InvestmentStatistics: 'Thống kê đầu tư',
  RevenueChart: 'Biểu đồ doanh thu',
  TotalReceipt: 'Tổng nhận',
  Expected: 'Dự kiến',
  InvestmentInformation: 'Thông tin đầu tư',
  NumberOfInvestedProjects: 'Số dự án đã đầu tư',
  TotalEstimatedRevenue: 'Tổng doanh thu\ndự kiến',
  TotalRevenueReceived: 'Tổng doanh thu\nđã nhận',
  TotalRemainingRevenue: 'Tổng doanh thu\ncòn lại',
  StartDay: 'Ngày bắt đầu',
  SalesReport: 'Báo cáo doanh thu',
  DetailLists: 'Danh sách chi tiết',
  InvestmentOrder: 'Lệnh đầu tư',
  Status: 'Trạng thái',
  Order: 'Đơn hàng',
  Time: 'Thời gian',
  AmountOfMoney: 'Số tiền',
  Currency: 'Loại tiền',
  TransferInformation: 'Thông tin chuyển khoản',
  ImplementationDate: 'Ngày thực hiện',
  Project: 'Dự án',
  Day: 'Ngày',
  Month: 'Tháng',
  Year: 'Năm',
  Guide: 'Hướng dẫn',
  Bank: 'Ngân hàng',
  AccountNumber: 'Số tài khoản',
  AccountHolder: 'Chủ tài khoản',
  TransferContents: 'Nội dung chuyển khoản',
  Success: 'Thành công',
  Cancelled: 'Đã hủy',
  WaitingForPayment: 'Đang chờ thanh toán',
  WaitForConfirmation: 'Chờ xác nhận',
  WaitForCompletion: 'Chờ hoàn tất',
  SelectProject: 'Chọn dự án',
  SelectFilterTime: 'Chọn thời gian lọc',
  Received: 'Đã nhận',
  NotAvailableYet: 'Chưa có',
  RevenueDetails: 'Chi tiết doanh thu',
  AtTime: 'Vào thời gian',
  GetTheAmount: 'Thu được số tiền',
  Projects: 'Dự án',
  NoRevenue: 'Dự án không có doanh thu',
};

export const TAB_NEWS_EVENT = [
  {
    value: HOME_KEYWORD.News,
  },
  {
    value: HOME_KEYWORD.Event,
  },
];

export const TAB_DETAIL_LISTS = [
  {
    value: HOME_KEYWORD.InvestmentOrder,
  },
  {
    value: HOME_KEYWORD.Turnover,
  },
];

export const TURNOVER_TITLE_ITEM = [
  {
    title: '#',
  },
  {
    title: HOME_KEYWORD.Time,
  },
  {
    title: HOME_KEYWORD.AmountOfMoney,
  },
  {
    title: HOME_KEYWORD.Currency,
  },
];

export const INVESTMENT_ORDER_TITLE_ITEM = [
  {
    title: HOME_KEYWORD.Status,
  },
  {
    title: HOME_KEYWORD.Order,
  },
  {
    title: HOME_KEYWORD.AmountOfMoney,
  },
  {
    title: HOME_KEYWORD.Currency,
  },
  {
    title: HOME_KEYWORD.TransferInformation,
  },
];

export const FILTER_DATE = [
  {
    name: HOME_KEYWORD.Day,
    value: 'day',
  },
  {
    name: HOME_KEYWORD.Month,
    value: 'month',
  },
  {
    name: HOME_KEYWORD.Year,
    value: 'year',
  },
];

export const FORMAT_TIME = {
  DATE: 'DD/MM/YYYY',
  DATE_AND_HOUR: 'DD/MM/YYYY HH:MM',
  FULL: 'DD/MM/YYYY HH:MM:SS',
  FULL_REVERSE: 'YYYY/MM/DD HH:MM:SS',
  DATE_REVERSE: 'YYYY/MM/DD',
  DATE_AND_HOUR_REVERSE: 'YYYY/MM/DD HH:MM',
  HOUR: 'HH:MM',
};

export const PAGE_DEFAULT = 1;
