export const isEnv = (environment: string): boolean =>
  process.env.NODE_ENV === environment;
