export class ReportController {
  constructor(reportService) {
    this.reportService = reportService;
  }

  getSalesReport = async (req, res, next) => {
    try {
      const data = await this.reportService.getSalesReport();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getUsersReport = async (req, res, next) => {
    try {
      const data = await this.reportService.getUsersReport();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getProductsReport = async (req, res, next) => {
    try {
      const data = await this.reportService.getProductsReport();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getRevenueReport = async (req, res, next) => {
    try {
      const data = await this.reportService.getRevenueReport();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };
}
