import * as admin from 'firebase-admin';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(path.resolve(__dirname, '../../config.json'));
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const firebaseStorage = app.storage();
export default app;
