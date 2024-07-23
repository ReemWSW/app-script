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
    const filteredData = dataWithoutHeaders.filter(row => row[internshipCountIndex] > 0);
    const result = filteredData.map(row => {
      return {
        "ชื่อ": row[nameIndex],
        "จำนวนการนิเทศก์": row[internshipCountIndex]
      };
    });

    // Get the maximum number of internships
    const maxInternshipCount = Math.max(...dataWithoutHeaders.map(row => row[internshipCountIndex]));

    // Initialize counts for all numbers of internships from 0 to maxInternshipCount
    const internshipCounts = {};
    for (let i = 0; i <= maxInternshipCount; i++) {
      internshipCounts[i] = 0;
    }

    // Group and count teachers based on the number of internships
    result.forEach(row => {
      const count = row["จำนวนการนิเทศก์"];
      internshipCounts[count]++;
    });

    console.log({
      "internshipCounts": internshipCounts,
      data: result
    })
    return {
      "internshipCounts": internshipCounts,
      data: result
    };
  } else {
    console.error("Required headers not found");
  }
}


// Get count problem data
function getCountProblems() {
  var data = getSheetData();
  var problemData = [
    { type: "ไม่พบปัญหา", count: 0 },
    { type: "พบปัญหา", count: 0 },
  ];

  for (var row = 1; row < data.length; row++) {
    // เริ่มที่ row 1 เนื่องจาก row 0 เป็น header
    var problemType = data[row][15]; // ดึงข้อมูลประเภทของปัญหาจากคอลัมน์แรก
    if (problemType === "พบปัญหา") {
      problemData[1].count++; // เพิ่มจำนวนปัญหา
    } else {
      problemData[0].count++; // เพิ่มจำนวนไม่พบปัญหา
    }
  }

  return problemData;
}

// Get problem data
function getProblemsData() {
  var data = getSheetData();
  var problems = {};

  for (var row = 1; row < data.length; row++) {
    // เริ่มที่ row 1 เนื่องจาก row 0 เป็น header
    var problem = data[row][16]; // ดึงข้อมูลปัญหาจากคอลัมน์แรก
    if (problem && problem !== " ") {
      // Check if the problem data is not empty
      if (problems[problem]) {
        problems[problem]++;
      } else {
        problems[problem] = 1;
      }
    }
  }
  return problems;
}
