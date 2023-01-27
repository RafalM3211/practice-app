import { setupWorker } from 'msw';
import { handlers } from './posts';

export const worker = setupWorker(...handlers);
