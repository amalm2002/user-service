
import { IGenerateOtpService } from '../interfaces/generate-otp.service.interface';

export class GenerateOtpService implements IGenerateOtpService {
  generateOTP(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}