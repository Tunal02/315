const salesRecords = [
    { region: "North", salesperson: "Alice", salesAmount: 5000, date: "2025-01-01" },
    { region: "South", salesperson: "Bob", salesAmount: 3000, date: "2025-01-02" },
    { region: "North", salesperson: "Alice", salesAmount: 7000, date: "2025-01-03" },
    { region: "North", salesperson: "Charlie", salesAmount: 4000, date: "2025-01-04" },
    { region: "South", salesperson: "Alice", salesAmount: 2000, date: "2025-01-05" },
    { region: "East", salesperson: "David", salesAmount: 6000, date: "2025-01-06" }
];

function regionalSalesSummary(salesRecords) {
    const regionSummary = salesRecords.reduce((accumulator, record) => {
        const region=record.region
        const salesAmount=record.salesAmount
        const salesperson=record.salesperson
        
        if (!accumulator[region]) {
            accumulator[region] = {
                totalSales: 0,
                salesCount: 0,
                AverageSales: 0,
                salesperson:[ ]

            };
        }
        if (accumulator[region].salesperson==salesperson){
            return accumulator
        }


        accumulator[region].salesperson.push(salesperson)
        accumulator[region].totalSales += salesAmount;
        accumulator[region].salesCount += 1;
        accumulator[region].AverageSales = accumulator[region].totalSales / accumulator[region].salesCount;

        
        return accumulator;
    }, {});

    return regionSummary;
}

console.log(regionalSalesSummary(salesRecords));
