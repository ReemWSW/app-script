//------------------------------------ Get Data Unique --------------------------
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

// ------------------------------------------------------------------------------------------
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
