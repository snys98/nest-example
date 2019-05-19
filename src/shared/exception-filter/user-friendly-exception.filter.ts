import { Catch, HttpException } from "@nestjs/common";
import { GqlExceptionFilter, GqlArgumentsHost } from "@nestjs/graphql";
import { ArgumentsHost } from "@nestjs/common/interfaces";
import { LoggingService } from "@shared/logging/logging.service";

@Catch()
export class UserFriendlyExceptionFilter implements GqlExceptionFilter {
    /**
     *
     */
    constructor(private readonly loggingService: LoggingService) {

    }
    catch(exception: HttpException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);
        this.loggingService.warn(gqlHost);
        return exception;
    }
}
