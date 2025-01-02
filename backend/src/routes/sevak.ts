import express from "express";
import prisma from "../prisma";

const router = express.Router();

async function searchLocalities(filter: string) {
    // Perform search
    // const results = await prisma.locality.findMany({
    //     where: {
    //         OR: [
    //             { state: { contains: filter, mode: 'insensitive' } },
    //             { district: { contains: filter, mode: 'insensitive' } },
    //             { area: { contains: filter, mode: 'insensitive' } },
    //         ],
    //     },
    //     include: {
    //         representatives: {
    //             select: {
    //                 id: true,
    //                 name: true,
    //                 designation: true,
    //                 email: true,
    //                 phone: true,
    //                 officeAddress: true,
    //                 locality: {
    //                     select: {
    //                         area: true,
    //                         district: true,
    //                         state: true
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // });

    const representatives = await prisma.representative.findMany({
        where: {
            locality: {
                OR: [
                    { state: { contains: filter, mode: 'insensitive' } },
                    { district: { contains: filter, mode: 'insensitive' } },
                    { area: { contains: filter, mode: 'insensitive' } },
                ],
            },
        },
        include: {
            locality: true, // Include locality details if needed
        },
    });

    return representatives;
}

router.post('/sevak', async (req, res) => {
    // console.log(req.body);
    const { locality } = req.body;
    if (!locality) {
        res.status(400).json({
            status: "error",
            message: "Locality parameter is required"
        });
        return;
    }
    try {
        const localityData = await searchLocalities(locality);


        if (!localityData) {
            res.status(404).json({
                status: "error",
                message: "No data found for the specified locality"
            });
            return
        }


        res.status(200).json({
            status: "success",
            data: localityData
        });
        return
    } catch (error) {
        console.error('Error fetching representatives:', error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
        return
    }
});

router.get("/sevak/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const representative = await prisma.representative.findFirst({
            where: {
                id: id
            }
        });

        if (!representative) {
            res.status(404).json({
                status: "error",
                message: "Representative not found"
            });
            return;
        }

        res.status(200).json({
            status: "success",
            data: representative
        });
        return;
    } catch (error) {
        console.error('Error fetching representative:', error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
        return;
    }
});

router.put("/sevak/:id", async (req, res) => {
    const { id } = req.params;
    const { email, phone } = req.body;

    if (!email && !phone) {
        res.status(400).json({ message: 'Email OR phone are required' });
    }

    try {

        if (email && !phone) {
            const updateUser = await prisma.representative.update({
                where: {
                    id: id
                },
                data: {
                    email,
                }
            });
            res.status(200).json({
                status: "success",
                message: "Representative updated successfully",
                data: updateUser
            });
        }
        else if (!email && phone) {
            const updateUser = await prisma.representative.update({
                where: {
                    id: id
                },
                data: {
                    phone,
                }
            });
            res.status(200).json({
                status: "success",
                message: "Representative updated successfully",
                data: updateUser
            });
        }
        else {
            const updateUser = await prisma.representative.update({
                where: {
                    id: id
                },
                data: {
                    email,
                    phone
                }
            });
            res.status(200).json({
                status: "success",
                message: "Representative updated successfully",
                data: updateUser
            });
        }


    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});


// router.post('/sevak', async (req, res) => {
//     try {
//         const { locality, name, designation, party, email, phone, officeAddress, termStart, termEnd } = req.body;

//         const localityData = await prisma.locality.findFirst({
//             where: {
//                 area: {
//                     contains: locality,
//                     mode: 'insensitive'
//                 }
//             }
//         });

//         if (!localityData) {
//             res.status(404).json({
//                 status: "error",
//                 message: "Locality not found"
//             });
//             return;
//         }

//         const localityId = localityData.id;

//         const newRepresentative = await prisma.representative.create({
//             data: {
//                 name,
//                 designation,
//                 party,
//                 email,
//                 phone,
//                 officeAddress,
//                 locality: {
//                     connect: { id: localityId }
//                 }
//             }
//         });

//         res.status(201).json({
//             status: "success",
//             data: newRepresentative
//         });
//         return
//     } catch (error) {
//         console.error('Error creating representative:', error);
//         res.status(500).json({
//             status: "error",
//             message: "Internal server error"
//         });
//         return;
//     }
// });

export default router;