import {
	StatusCodes,
  getReasonPhrase
} from 'http-status-codes';

class ValidationError extends Error {
  status = StatusCodes.BAD_GATEWAY;
  
  text = getReasonPhrase(this.status);
}

export default ValidationError;
