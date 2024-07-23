function getCount() {
  const data = getSheetData("dashboard");

  // Separate the header row (assuming headers are in the first row)
  const headers = data.shift();

  // Access data without headers
  const dataWithoutHeaders = data;

  // Access specific data point using column name (assuming headers exist)
  const studentIndex = headers.indexOf("จำนวนนักเรียน");
  const teacherIndex = headers.indexOf("จำนวนครู");
  const compIndex = headers.indexOf("จำนวนสถานประกอบการ");

  if (studentIndex > -1 && compIndex > -1 && teacherIndex > -1) {
    const student = dataWithoutHeaders.map((row) => row[studentIndex]);
    const teacher = dataWithoutHeaders.map((row) => row[teacherIndex]);
    const estab = dataWithoutHeaders.map((row) => row[compIndex]);
    return {
      student: student[0],
      teacher: teacher[0],
      estab: estab[0],
    };
  } else {
    console.error("Header 'Name' not found");
  }
}

function getDataDashboard() {
  const data = getSheetData("dashboard");

  // Separate the header row (assuming headers are in the first row)
  const headers = data.shift();

  // Access data without headers
  const dataWithoutHeaders = data;

  // Access specific data point using column name (assuming headers exist)
  const scoreIndex = headers.indexOf("คะแนน");
  const nameIndex = headers.indexOf("ประเมินผลการปฏิบัติงาน");

  if (nameIndex > -1) {
    const nameValues = dataWithoutHeaders.map((row) => row[nameIndex]);
    const scoreValues = dataWithoutHeaders.map((row) => row[scoreIndex]);
    return {
      labels: nameValues,
      averages: scoreValues,
    };
  } else {
    console.error("Header 'Name' not found");
  }
}

function getTeacherIntern() {
  const data = getSheetData("คุณครูนิเทศ");

  // Separate the header row (assuming headers are in the first row)
  const headers = data.shift();

  // Access data without headers
  const dataWithoutHeaders = data;
  // Access specific data points using column names
  const nameIndex = headers.indexOf("ชื่อ");
  const internshipCountIndex = headers.indexOf("จำนวนการนิเทศก์");

  if (nameIndex > -1 && internshipCountIndex > -1) {
    const filteredData = dataWithoutHeaders.filter(
      (row) => row[internshipCountIndex] > 0
    );
    const result = filteredData.map((row) => {
      return {
        ชื่อ: row[nameIndex],
        จำนวนการนิเทศก์: row[internshipCountIndex],
      };
    });

    // Get the maximum number of internships
    const maxInternshipCount = Math.max(
      ...dataWithoutHeaders.map((row) => row[internshipCountIndex])
    );

    // Initialize counts for all numbers of internships from 0 to maxInternshipCount
    const internshipCounts = {};
    for (let i = 1; i <= maxInternshipCount; i++) {
      internshipCounts[i] = 0;
    }

    // Group and count teachers based on the number of internships
    result.forEach((row) => {
      const count = row["จำนวนการนิเทศก์"];
      internshipCounts[count]++;
    });

    return {
      internshipCounts: internshipCounts,
      data: result,
    };
  } else {
    console.error("Required headers not found");
  }
}

function getCountProblems() {
  const data = getSheetData("dashboard");

  // Check if data is retrieved successfully
  if (!data || data.length === 0) {
    console.error("No data retrieved from the sheet");
    return null;
  }

  // Separate the header row (assuming headers are in the first row)
  const headers = data.shift();

  // Ensure headers are present
  if (!headers || headers.length === 0) {
    console.error("No headers found in the sheet");
    return null;
  }

  // Access specific data points using column names
  const problemIndex = headers.indexOf("ประเภท");
  const problemCountIndex = headers.indexOf("จำนวนปัญหา");

  // Ensure the necessary columns exist
  if (problemIndex === -1 || problemCountIndex === -1) {
    console.error("Required headers 'ประเภท' or 'จำนวนปัญหา' not found");
    return null;
  }

  // Access data without headers
  const dataWithoutHeaders = data;

  // Filter out rows where the problem value is empty or null
  const filteredData = dataWithoutHeaders.filter((row) => row[problemIndex]);

  const problemValues = filteredData.map((row) => row[problemIndex]);
  const problemCountValues = filteredData.map((row) => row[problemCountIndex]);

  return {
    labels: problemValues,
    counts: problemCountValues,
  };
}

function getProblemsData() {
  const data = getSheetData("dashboard");

  // Separate the header row (assuming headers are in the first row)
  const headers = data.shift();

  // Ensure headers are present
  if (!headers || headers.length === 0) {
    console.error("No headers found in the sheet");
    return null;
  }

  // Access specific data points using column names
  const problemIndex = headers.indexOf("ปัญหาที่พบ");
  const problemCountIndex = headers.indexOf("จำนวนที่พบ");

  // Ensure the necessary columns exist
  if (problemIndex === -1 || problemCountIndex === -1) {
    console.error("Required headers 'ปัญหาที่พบ' or 'จำนวนที่พบ' not found");
    return null;
  }

  // Access data without headers
  const dataWithoutHeaders = data;

  // Filter out rows where the problem value is empty or null
  const filteredData = dataWithoutHeaders.filter(row => row[problemIndex]);

  // Create an object with problems as keys and counts as values
  const problemsData = {};
  filteredData.forEach(row => {
    const problem = row[problemIndex];
    const count = row[problemCountIndex];
    problemsData[problem] = count;
  });

  return problemsData;
}
