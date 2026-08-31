import type { Request, Response, NextFunction } from 'express';
import { contactService } from './contact.service.js';
import db from '../../db/index.js';
import { sendContactEmail } from '@snoomleng/email';
import env from '../../lib/env.js';

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
        await db.transaction(async (tx) => {
          const contact = req.body;
          await service.create(contact);

          await sendContactEmail({
            ...contact,
            aws: {
              region: env.AWS_REGION,
              accessKeyId: env.AWS_ACCESS_KEY_ID,
              secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            },
          });

          return res.status(201).json({
            success: true,
            message:
              "Thank you for contacting! I'll be in touch with you soon!",
          });
        });
      } catch (error) {
        return next(error);
      }
    },
  };
};
