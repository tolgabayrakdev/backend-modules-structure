import { noteRepository } from './note.repository.js';
import { NotFoundError, ForbiddenError } from '../../utils/errors.js';

export const noteService = {
  getAllByUser: (userId) => noteRepository.findAllByUser(userId),

  getById: async (id, userId) => {
    const note = await noteRepository.findById(id);
    if (!note) throw new NotFoundError('Note not found');
    if (note.user_id !== userId) throw new ForbiddenError();
    return note;
  },

  create: (userId, data) => noteRepository.create({ ...data, user_id: userId }),

  update: async (id, userId, data) => {
    await noteService.getById(id, userId);
    return noteRepository.update(id, data);
  },

  remove: async (id, userId) => {
    await noteService.getById(id, userId);
    return noteRepository.remove(id);
  },
};
