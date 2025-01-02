"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const sevaks_1 = __importDefault(require("./sevaks"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const sevak of sevaks_1.default) {
            const locality = yield prisma_1.default.locality.create({
                data: {
                    area: sevak.area,
                    district: "Mumbai",
                    state: "Maharashtra",
                }
            });
            yield prisma_1.default.representative.create({
                data: {
                    name: sevak.name,
                    party: sevak.party,
                    designation: "Municipal Councillor",
                    phone: sevak.contact[0],
                    locality: {
                        connect: { id: locality.id }
                    }
                }
            });
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
}));
