import shelljs from 'shelljs';
import ngrok from 'ngrok';

export const isEnv = (environment: string): boolean =>
  process.env.NODE_ENV === environment;

export const connectToTunnelAndSetWebhookUrl = async (port) => {
  const url = await ngrok.connect(port);
  shelljs.exec(`npm run telegram-webhook:set ${url}/webhooks/telegram`);
};
