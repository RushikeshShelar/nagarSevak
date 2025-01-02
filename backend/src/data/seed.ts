import prisma from "../prisma";
import sevaks from "./sevaks"

async function main() {
    for (const sevak of sevaks) {
        
        const locality = await prisma.locality.create({
            data: {
                area: sevak.area,
                district: "Mumbai",
                state: "Maharashtra",
            }
        });

        await prisma.representative.create({
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
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });