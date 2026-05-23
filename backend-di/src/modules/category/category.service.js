import { HttpException } from '../../exceptions/http.exception.js';

export class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getAll() {
    return this.categoryRepository.findAll();
  }

  async getById(id) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new HttpException(404, 'Category not found');
    return category;
  }

  async getTree() {
    const all = await this.categoryRepository.findAll();
    const buildTree = (parentId = null) =>
      all
        .filter((c) => (c.parentId ?? null) === parentId)
        .map((c) => ({ ...c, children: buildTree(c.id) }));
    return buildTree();
  }

  async create(data) {
    if (data.parentId) {
      const parent = await this.categoryRepository.findById(data.parentId);
      if (!parent) throw new HttpException(404, 'Parent category not found');
    }
    return this.categoryRepository.create(data);
  }

  async update(id, data) {
    const updated = await this.categoryRepository.update(id, data);
    if (!updated) throw new HttpException(404, 'Category not found');
    return updated;
  }

  async delete(id) {
    const deleted = await this.categoryRepository.delete(id);
    if (!deleted) throw new HttpException(404, 'Category not found');
  }
}
