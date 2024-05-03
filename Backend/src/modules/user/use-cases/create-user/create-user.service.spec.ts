import { Test } from "@nestjs/testing";
import { UserRepository } from "../../../../repositories/abstracts/UserRepository";
import { CreateUserService } from "./create-user.service";
import { UserEntity } from "../../../../entity/UserEntity";
import { TestUtils } from "../../../../utils/TestUtils";
import { UserMapper } from "../../mappers/UserMapper";
import { PasswordHasher } from "../../../../cryptography/abstracts/password-hasher";
import { UserAlreadyExistsByEmailException } from "../../../../exceptions/user/user-already-exists-by-email.exception";
import { UserAlreadyExistsByCPFException } from "../../../../exceptions/user/user-already-exists-by-cpf.exception";

describe("CreateUserService", () => {
    let userRepository: UserRepository;
    let passwordHasher: PasswordHasher;
    let userMapper: UserMapper;
    let createUserService: CreateUserService;

    const testUser = TestUtils.userBodyData();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CreateUserService,
                {
                    provide: UserRepository,
                    useValue: {
                        findByEmail: jest.fn(),
                        findByCPF: jest.fn(),
                        create: jest.fn(),
                    },
                },
                {
                    provide: PasswordHasher,
                    useValue: {
                        hash: jest.fn(),
                        compare: jest.fn(),
                    },
                },
                {
                    provide: UserMapper,
                    useValue: {
                        toResponse: jest.fn(),
                    },
                },
            ],
        }).compile();

        userRepository = module.get(UserRepository);
        passwordHasher = module.get(PasswordHasher);
        userMapper = module.get(UserMapper);
        createUserService = module.get<CreateUserService>(CreateUserService);
    });

    it("should be defined", () => {
        expect(userRepository).toBeDefined();
        expect(passwordHasher).toBeDefined();
        expect(userMapper).toBeDefined();
        expect(createUserService).toBeDefined();
    });

    it("It SHOULD NOT be possible to create a user if it already exists by email", async () => {
        jest.spyOn(userRepository, "findByEmail").mockResolvedValue(testUser);

        await expect(createUserService.execute(testUser)).rejects.toThrow(
            new UserAlreadyExistsByEmailException(),
        );

        expect(userRepository.findByEmail).toHaveBeenCalledWith(testUser.email);
        expect(passwordHasher.hash).not.toHaveBeenCalledTimes(1);
    });

    it("It SHOULD NOT be possible to create a user if it already exists by CPF", async () => {
        jest.spyOn(userRepository, "findByCPF").mockResolvedValue(testUser);

        await expect(createUserService.execute(testUser)).rejects.toThrow(
            new UserAlreadyExistsByCPFException(),
        );

        expect(userRepository.findByEmail).toHaveBeenCalledWith(testUser.email);
        expect(userRepository.findByCPF).toHaveBeenCalledWith(testUser.cpf);
        expect(passwordHasher.hash).not.toHaveBeenCalledTimes(1);
    });

    it("It should be possible to create a user", async () => {
        const hashedPassword = Math.random().toString();

        jest.spyOn(passwordHasher, "hash").mockResolvedValue(hashedPassword);

        const userWithHashedPassword = new UserEntity(
            testUser.fullName,
            testUser.email,
            testUser.cpf,
            hashedPassword,
        );

        jest.spyOn(userRepository, "create").mockResolvedValue(
            userWithHashedPassword,
        );

        const userResponseData = TestUtils.toResponse(userWithHashedPassword);

        (userMapper.toResponse as jest.Mock).mockResolvedValue(
            userResponseData,
        );

        const createdUser = await createUserService.execute(testUser);

        expect(userRepository.findByEmail).toHaveBeenCalledWith(testUser.email);
        expect(passwordHasher.hash).toHaveBeenCalledWith(
            testUser.password,
            expect.any(Number),
        );
        expect(userRepository.create).toHaveBeenCalledWith(
            userWithHashedPassword,
        );
        expect(userMapper.toResponse).toHaveBeenCalledWith(
            userWithHashedPassword,
        );
        expect(createdUser).toEqual(userResponseData);
    });
});
