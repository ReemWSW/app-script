function getEslab(mentorName) {
    const data = getSheetData("สถานประกอบการ");

    const headers = data.shift();

    const codeIndex = headers.indexOf("เลขที่รหัส");
    const nameIndex = headers.indexOf("รายชื่อสถานประกอบการ");
    const countIndex = headers.indexOf("จำนวนครั้ง");

    if (codeIndex < -1 || nameIndex < -1 || countIndex < -1) {
        console.error(
            "Required headers 'เลขที่รหัส' or 'ชื่อ' or 'รายชื่อสถานประกอบการ' or 'จำนวนครั้ง' not found"
        );
    }

    const dataWithoutHeaders = data;

    const result = {};
    const filteredData = dataWithoutHeaders.filter(
        (row) => row[countIndex] != 0
    );

    filteredData.forEach((row) => {
        const code = row[codeIndex];
        const name = row[nameIndex];
        const count = row[countIndex];

        if (!result[code]) {
            result[code] = [];
        }

        result[code].push({
            name: name,
            count: count,
        });
    });

    return result;
}
