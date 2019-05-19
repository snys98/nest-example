import { Module } from '@nestjs/common';
import { UserFriendlyExceptionFilter } from './user-friendly-exception.filter';
import { ModuleRef } from '@nestjs/core';
import { LoggingService } from '@shared/logging/logging.service';

@Module({
    providers: [UserFriendlyExceptionFilter]
})
export class ExceptionFilterModule { }
