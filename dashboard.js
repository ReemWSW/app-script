
//------------------------------------ Get Data Unique --------------------------

// Get teacher data
function getUniqueTeachersWithCount() {
  var data = getSheetData();

  var teachersCount = {}; // Object to store teacher counts

  for (var row = 1; row < data.length; row++) {
    var teacherName = data[row][2]; // Assuming teacher name is in column 3

    if (teacherName) {
      if (teachersCount.hasOwnProperty(teacherName)) {
        // If teacherName already exists in teachersCount, increment count
        teachersCount[teacherName]++;
      } else {
        // If teacherName is encountered for the first time, initialize count to 1
        teachersCount[teacherName] = 1;
      }
    }
  }
  // Invert the keys and values in teachersCount object
  var teachersCountInverted = {};
  for (var teacher in teachersCount) {
    var count = teachersCount[teacher];
    if (teachersCountInverted.hasOwnProperty(count)) {
      teachersCountInverted[count].push(teacher);
    } else {
      teachersCountInverted[count] = [teacher];
    }
  }

  // Calculate the number of unique teachers by counting the keys in teachersCount
  var uniqueTeacherCount = Object.keys(teachersCount).length;
  // Return an object containing both the total count and the unique teacher count
  return { totalTeachers: data.length - 1, uniqueTeachers: uniqueTeacherCount, teachersCount: teachersCount, teachersCountInverted: teachersCountInverted };
}

// Get student data
function getUniqueStudents() {
  var data = getSheetData();

  var studebtSet = new Set();
  for (var row = 1; row < data.length; row++) { // เริ่มที่ row 1 เนื่องจาก row 0 เป็น header
    var studentId = data[row][3];
    if (studentId) {
      studebtSet.add(studentId);
    }
  }
  return studebtSet.size;
}


// Get Establishments data
function getUniqueEstabs() {
  var data = getSheetData();

  var estabSet = new Set();
  for (var row = 1; row < data.length; row++) { // เริ่มที่ row 1 เนื่องจาก row 0 เป็น header
    var estabName = data[row][7]; // สมมติว่าชื่อครูนิเทศอยู่ในคอลัมน์แรก
    if (estabName) {
      estabSet.add(estabName);
    }
  }
  return estabSet.size;
}

function getCount() {
  var student = getUniqueStudents();
  var teacher = getUniqueTeachersWithCount();
  var estab = getUniqueEstabs();

  return {
    "student": student,
    "teacher": teacher["uniqueTeachers"],
    "estab": estab
  }
}

// ------------------------------------------------------------------------------------------

// Function to Calculate Average Evaluation 
function getEvaluationData() {
  var data = getSheetData();
  var evaluations = [
    'ตรงต่อเวลา/ขยันอดทน',
    'การปฏิบัติตามคำสั่ง คำแนะนำ ของครูฝึก',
    'การปฏิบัติตามกฎระเบียบของสถานประกอบการ',
    'กิริยามารยาทสภาพเรียบร้อย',
    'บำรุงรักษาเครื่องมือเครื่องใช้ และทรัพย์สินขององค์กร',
    'เรียนรู้และพัฒนาตนเองอยู่เสมอ'
  ];
  var averages = [];
  var startCol = 9; // คอลัมน์ที่เริ่มต้นการประเมิน (ตรงต่อเวลา/ขยันอดทน)
  var endCol = 14; // คอลัมน์สุดท้ายของการประเมิน (เรียนรู้และพัฒนาตนเองอยู่เสมอ)

  for (var col = startCol; col <= endCol; col++) {
    var sum = 0;
    var count = 0;
    for (var row = 1; row < data.length; row++) { // เริ่มต้นที่ row 1 เนื่องจาก row 0 เป็น header
      var cellValue = data[row][col];
      if (typeof cellValue === 'number' && !isNaN(cellValue)) { // ตรวจสอบว่าค่าเป็นตัวเลขและไม่ใช่ NaN
        sum += cellValue;
        count++;
      }
    }
    var avg = count > 0 ? sum / count : 0; // ตรวจสอบว่าจำนวน count > 0 เพื่อหลีกเลี่ยงการหารด้วย 0
    averages.push(avg);
  }

  return {
    labels: evaluations,
    averages: averages
  };
}

// Get count problem data
function getCountProblems() {
  var data = getSheetData();
  var problemData = [
    { type: "ไม่พบปัญหา", count: 0 },
    { type: "พบปัญหา", count: 0 }
  ];

  for (var row = 1; row < data.length; row++) { // เริ่มที่ row 1 เนื่องจาก row 0 เป็น header
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

  for (var row = 1; row < data.length; row++) { // เริ่มที่ row 1 เนื่องจาก row 0 เป็น header
    var problem = data[row][16]; // ดึงข้อมูลปัญหาจากคอลัมน์แรก
    if (problem && problem !== " ") { // Check if the problem data is not empty
      if (problems[problem]) {
        problems[problem]++;
      } else {
        problems[problem] = 1;
      }
    }
  }
  return problems;
}



