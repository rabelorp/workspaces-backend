import { Module } from '@nestjs/common';
import { AuthRabelodigitalService } from './auth-rabelodigital.service';
import { ConfigModule } from '@nestjs/config';
import { AuthRabelodigitalController } from './auth-rabelodigital.controller';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, AuthModule, HttpModule],
  providers: [AuthRabelodigitalService],
  exports: [AuthRabelodigitalService],
  controllers: [AuthRabelodigitalController],
})
export class AuthRabelodigitalModule {}
