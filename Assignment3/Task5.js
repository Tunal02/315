function analyzeStudentPerformance(students) {

    

    const record = students.map((student) => {
        const totalScore = student.scores.reduce((sum, current) => sum + current, 0);
        const averageScore = totalScore / student.scores.length;
        return { name: student.name, averageScore: averageScore };
    });

    console.log(record);
    return record;
}

const students = [
    { name: "Alice", scores: [85, 92, 78] },
    { name: "Bob", scores: [90, 88, 94] },
    { name: "Charlie", scores: [70, 85, 80] }
];

analyzeStudentPerformance(students);
