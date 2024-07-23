function countStudentsPerMentor() {
  const data = getSheetData("คุณครูนิเทศ");

  const headers = data.shift();

  const codeIndex = headers.indexOf("รหัส");
  const nameIndex = headers.indexOf("ชื่อ");
  const internshipCountIndex = headers.indexOf("จำนวนการนิเทศก์");

  if (nameIndex > -1 || internshipCountIndex > -1 || codeIndex > -1) {
    console.error(
      "Required headers 'รหัส' or 'ชื่อ' or 'จำนวนการนิเทศก์' not found"
    );
  }

  const dataWithoutHeaders = data;

  // Create the JSON object to return
  const result = {};
  const filteredData = dataWithoutHeaders.filter(
    (row) => row[internshipCountIndex] != 0
  );

  // Process the remaining rows of data
  filteredData.forEach((row) => {
    const code = row[codeIndex];
    const name = row[nameIndex];
    const internshipCount = row[internshipCountIndex];

    if (!result[code]) {
      result[code] = [];
    }

    result[code].push({
      name: name,
      internshipCount: internshipCount,
    });
  });

  // Return the result as a JSON object
  return result;
}
