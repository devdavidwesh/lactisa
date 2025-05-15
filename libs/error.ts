export class TwoFactorRequiredError extends Error {
  constructor() {
    super("Two-factor authentication required");
    this.name = "TwoFactorRequiredError";
  }
}


export class TwoFactorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TwoFactorError";
  }
}