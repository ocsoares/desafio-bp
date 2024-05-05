import { ProductResponse } from "../../../modules/product/responses/ProductResponse";
import { UserEntity } from "../../../entity/UserEntity";
import { ProductEntity } from "../../../entity/ProductEntity";

export class FindAllUserProductsUtils {
    static userId(): string {
        return "53d5f2deabcf965a1605";
    }

    static createUser(): UserEntity {
        return new UserEntity(
            "Teste Testando",
            "teste@gmail.com",
            "616.561.300-41",
            "teste123",
        );
    }

    static createProductArray(): ProductEntity[] {
        return [
            new ProductEntity(
                "Any Name",
                "Any Brand",
                "53024210000186",
                15.3,
                "dd2ff4174d588ee7f102d423a1dbace9d5b21d6d",
            ),
            new ProductEntity(
                "Random Name",
                "Random Brand",
                "64853535000198",
                2.47,
                "e7129a305453cf7493b40590001939611f76eb6a",
            ),
            new ProductEntity(
                "Idk Name",
                "Idk Brand",
                "39706171000176",
                30.53,
                "2d54f0ac02158c713671c04d165e85c2c2016868",
            ),
        ];
    }

    static productResponseArray(): ProductResponse[] {
        return [
            new ProductResponse("Any Name", "Any Brand", 15.3),
            new ProductResponse("Random Name", "Random Brand", 2.47),
            new ProductResponse("Idk Name", "Idk Brand", 30.53),
        ];
    }
}
