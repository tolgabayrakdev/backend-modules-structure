export class ReportService {
  constructor(reportRepository) {
    this.reportRepository = reportRepository;
  }

  async getSalesReport() {
    const [totalOrders, byStatus] = await Promise.all([
      this.reportRepository.getTotalOrders(),
      this.reportRepository.getOrderStats(),
    ]);
    return { totalOrders, byStatus };
  }

  async getUsersReport() {
    const [totalUsers, byRole] = await Promise.all([
      this.reportRepository.getTotalUsers(),
      this.reportRepository.getUserStats(),
    ]);
    return { totalUsers, byRole };
  }

  async getProductsReport() {
    const [totalProducts, byCategory] = await Promise.all([
      this.reportRepository.getTotalProducts(),
      this.reportRepository.getProductStats(),
    ]);
    return { totalProducts, byCategory };
  }

  async getRevenueReport() {
    const { total, count } = await this.reportRepository.getRevenueStats();
    return {
      totalRevenue: total,
      totalTransactions: count,
      average: count ? total / count : 0,
    };
  }
}
