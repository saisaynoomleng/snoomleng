import { Router } from 'express';
import { ContactController } from './contacts.controller';
import { ValidateBody, ValidateParams } from '../../middlewares/validations';
import { ContactFormSchema, ParamsIDSchema } from '@snoomleng/utils';

const router: Router = Router();
const controller = ContactController();

router.get('/', controller.getAll);
router.get('/:id', ValidateParams(ParamsIDSchema), controller.getById);
router.post('/', ValidateBody(ContactFormSchema), controller.create);

export default router;
