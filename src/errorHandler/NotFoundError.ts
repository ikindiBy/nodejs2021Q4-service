import {
	StatusCodes,
  getReasonPhrase
} from 'http-status-codes';

class NotFoundError extends Error {
  status: StatusCodes;

  text: string;

  message: string;

  constructor(message: string) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
    this.text = getReasonPhrase(this.status);
    this.message = message ?? '';
  }
}

export default NotFoundError;
