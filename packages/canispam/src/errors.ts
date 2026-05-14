export const errInvalidEml = 'ERR_INVALID_EML';

export abstract class BaseError extends Error {
  constructor(
    readonly code: string,
    message: string
  ) {
    super(message);
  }
}

export class InvalidEmlError extends BaseError {
  constructor(message: string) {
    super(errInvalidEml, message);
    this.name = 'InvalidEmlError';
  }
}
