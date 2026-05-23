import { HttpException } from '../../exceptions/http.exception.js';
import { withTransaction } from '../../config/db.js';

export class InventoryService {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async getAll() {
    return this.inventoryRepository.findAll();
  }

  async getById(id) {
    const item = await this.inventoryRepository.findById(id);
    if (!item) throw new HttpException(404, 'Inventory item not found');
    return item;
  }

  async getByProduct(productId) {
    const item = await this.inventoryRepository.findByProduct(productId);
    if (!item) throw new HttpException(404, 'Inventory not found for this product');
    return item;
  }

  async updateStock(productId, quantity, reason = 'manual') {
    return withTransaction(async (client) => {
      const existing = await this.inventoryRepository.findByProduct(productId, client);
      const change = existing ? quantity - existing.quantity : quantity;
      const item = await this.inventoryRepository.upsert(productId, quantity, client);
      if (change !== 0) await this.inventoryRepository.addHistory(productId, change, reason, client);
      return item;
    });
  }

  async getLowStock(threshold) {
    return this.inventoryRepository.findLowStock(threshold);
  }

  async getHistory(productId) {
    return this.inventoryRepository.getHistory(productId);
  }
}
