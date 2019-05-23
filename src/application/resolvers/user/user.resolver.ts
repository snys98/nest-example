import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { UserType } from '../../types/user.type';
import { PageInput } from '../../inputs/common-args/page.input';
import { PubSub } from 'apollo-server';
import { nameof } from "ts-simple-nameof";
import { UseInterceptors, Catch, InternalServerErrorException, UseFilters } from '@nestjs/common';
import { LoggingService } from '@shared/logging/logging.service';
import { UserFriendlyExceptionFilter } from '@shared/exception-filter/user-friendly-exception.filter';
import { AuthService } from '@shared/auth/auth.service';

@Resolver(of => UserType)
export class UserResolver {
    constructor(private readonly authService: AuthService, private readonly pubSub: PubSub, private readonly logger: LoggingService) { }

    @Query(returns => UserType)
    async user(@Args("id") id: string): Promise<UserType> {
        let user = await this.authService.findById(id);
        return new UserType(user);
    }
}
