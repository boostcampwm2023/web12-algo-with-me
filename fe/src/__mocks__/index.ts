import { algoWithMeApi } from './algoWithMeApi';
import { setupWorker } from 'msw/browser';

const worker = setupWorker(...algoWithMeApi);

export default worker;
