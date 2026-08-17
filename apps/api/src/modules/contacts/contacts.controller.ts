import type { Request, Response, NextFunction } from 'express';
import { contactService } from './contact.service';

export const ContactController = () => {
  const service = contactService();

  return {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await service.getAll();

        return res.status(200).json({ data });
      } catch (error) {
        return next(error);
      }
    },
    getById: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;

        const data = await service.getById(id as string);
        return res.status(200).json({ data });
      } catch (error) {
        return next(error);
      }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
      try {
        await service.create(req.body);

        return res
          .status(201)
          .json({
            success: true,
            message:
              "Thank you for contacting! I'll be in touch with you soon!",
          });
      } catch (error) {
        return next(error);
      }
    },
  };
};
