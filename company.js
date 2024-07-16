function getEslab(mentorName) {
    var data = getSheetData();
    if (data.length === 0) return [];

    var result = {};

    for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var comp = row[7]; // Column index for "รหัสสถานที่ประกอบการที่ไปนิเทศ"
        var compName = row[8]; // Column index for "ชื่อสถานประกอบการ" (assuming it's the 9th column)

        if (!result[comp]) {
            result[comp] = {
                name: compName,
                count: 0,
                students: [],
            };
        }
        var studentDetails = {
            teacher: row[2], // Assuming the 2th column is "ครูนิเทศ"
            name: row[3], // Assuming the 4th column is "ชื่อนักเรียน นักศึกษา"
            id: row[4], // Assuming the 5th column is "รหัสประจำตัวนักเรียน นักศึกษา"
            field: row[5], // Assuming the 6th column is "สาขาวิชา"
            level: row[6], // Assuming the 7th column is "ระดับการศึกษา"
            count: 1, // Initialize count
        };

        // Check if student already exists in the list
        var existingStudent = result[comp].students.find(
            (student) => student.name === studentDetails.name
        );
        if (existingStudent) {
            existingStudent.count += 1; // Increment count if student already exists
        } else {
            result[comp].students.push(studentDetails);
        }

        result[comp].count++;
    }
    return result;
}
