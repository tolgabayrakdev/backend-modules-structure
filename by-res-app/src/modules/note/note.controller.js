import { noteService } from './note.service.js';
import { sendSuccess } from '../../utils/response.js';

export const noteController = {
  getAll: async (req, res, next) => {
    try {
      const notes = await noteService.getAllByUser(req.user.id);
      sendSuccess(res, notes);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const note = await noteService.getById(Number(req.params.id), req.user.id);
      sendSuccess(res, note);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const note = await noteService.create(req.user.id, req.body);
      sendSuccess(res, note, 201);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const note = await noteService.update(Number(req.params.id), req.user.id, req.body);
      sendSuccess(res, note);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await noteService.remove(Number(req.params.id), req.user.id);
      sendSuccess(res, { message: 'Note deleted' });
    } catch (err) {
      next(err);
    }
  },
};
