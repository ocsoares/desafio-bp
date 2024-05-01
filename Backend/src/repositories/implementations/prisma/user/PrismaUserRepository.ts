import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/repositories/abstracts/UserRepository";
import { PrismaService } from "../prisma-client.service";
import { CreateUserDTO } from "src/modules/user/use-cases/create-user/dtos/CreateUserDTO";
import { UserEntity } from "src/entity/UserEntity";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: CreateUserDTO): Promise<UserEntity> {
        const createUser = await this.prismaService.user.create({ data });

        return createUser;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const findByEmail = await this.prismaService.user.findUnique({
            where: { email },
        });

        return findByEmail;
    }
}
