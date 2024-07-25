function generateReportFromTemplate() {
  var templateId = '1OKonBF13RYA7yY6cFpSWNZ92u1k2F_aUyowKvAKecoA';
  var sheetId = '1qSpMNLfZIFT023d9BjdmVj54zFMAYpzDlRKbYF3M6bM';

  // Open sheets by ID 
  var sheetData = SpreadsheetApp.openById(sheetId).getSheetByName('dashboard');
  var sheetTeacher = SpreadsheetApp.openById(sheetId).getSheetByName('คุณครูนิเทศ');
  var sheetCompany = SpreadsheetApp.openById(sheetId).getSheetByName('สถานประกอบการ');

  // count the object data
  var countStudent = sheetData.getRange('D2').getValue();
  var countTeacher = sheetData.getRange('E2').getValue();
  var countCompamy = sheetData.getRange('F2').getValue();
  // Average evaluations
  var patient = sheetData.getRange('B2').getValue();
  var following = sheetData.getRange('B3').getValue();
  var compliance = sheetData.getRange('B4').getValue();
  var good_manners = sheetData.getRange('B5').getValue();
  var maintenance = sheetData.getRange('B6').getValue();
  var learn = sheetData.getRange('B7').getValue();
  // Ploblem data
  var problem = sheetData.getRange("K:L").getValues();


  // Fetch and filter teacher data 
  var teacherData = getFilteredTeacherData(sheetTeacher);
  // Fetch and filter company data 
  var companyData = getFilteredCompanyData(sheetCompany);
  var filtedProblemData = getFilteredProblemData(problem)
  function formatProblemData(problemData) {
    var formattedProblemData = "";
    if (problemData.length > 1) {
      for (var i = 1; i < problemData.length; i++) {
        var problemType = problemData[i][0];
        var problemCount = problemData[i][1];
        formattedProblemData += i + ". " + problemType + " (" + problemCount + " ครั้ง)\n";
      }
    }
    return formattedProblemData;
  }
  // Generate report content with template replacement
  function generateReportContent() {
    // Template for the report content (assuming it's already present in the template)
    var reportTemplate = doc.getBody().getText(); // Get existing body text

    // Replace placeholders with actual values
    var formattedDate = Utilities.formatDate(new Date(), "GMT+7", "วันที่ yyyy-MM-dd เวลา hh:mm");


    // Format and add teacher details
    var formattedTeacherData = "";
    for (var i = 1; i < teacherData.length; i++) {
      var codeTeacher = teacherData[i][0];
      var teacherName = teacherData[i][1];
      var countIntern = teacherData[i][3];

      formattedTeacherData += i + ".   " + codeTeacher + ". " + teacherName + " จำนวน " + countIntern + " วัน\n";
    }

    // Format and add company details
    var formattedCompanyData = "";
    for (var i = 1; i < companyData.length; i++) {
      var codeCompany = companyData[i][0];
      var companyName = companyData[i][1];

      formattedCompanyData += i + ".   " + codeCompany + "   " + companyName + "\n";
    }

    var formattedProblemData = formatProblemData(filtedProblemData);

    var reportContent = reportTemplate
      .replace("{date}", formattedDate)
      .replace("{count_student}", countStudent)
      .replace("{count_teacher}", countTeacher)
      .replace("{count_company}", countCompamy)

      .replace("{patient}", patient)
      .replace("{following}", following)
      .replace("{compliance}", compliance)
      .replace("{good_manners}", good_manners)
      .replace("{maintenance}", maintenance)
      .replace("{learn}", learn);
    // Replace placeholder in the template with formatted teacher data

    reportContent = reportContent.replace("{teacher_details}", formattedTeacherData);
    reportContent = reportContent.replace("{company_details}", formattedCompanyData);
    reportContent = reportContent.replace("{problem_details}", formattedProblemData);

    return reportContent;
  }

  // Open the template and get the body
  var doc = DocumentApp.openById(templateId);

  var reportContent = generateReportContent();

  // Create a new Google Doc from the template content (without modifying the original)
  var filename = "สรุปรายงานผลการนิเทศฝึกงาน_" + Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd");
  var newDoc = DocumentApp.create(filename);
  newDoc.getBody().setText(reportContent);

  // Save and close the new Google Doc
  newDoc.saveAndClose();

  // // Provide a link to download the new Google Doc
  // var newDocId = newDoc.getId();
  // var url = "https://docs.google.com/document/d/" + newDocId + "/edit";

  // Convert the Google Doc to PDF and provide the download URL
  var pdfBlob = DriveApp.getFileById(newDoc.getId()).getAs('application/pdf');
  var pdfFile = DriveApp.createFile(pdfBlob);
  var pdfUrl = pdfFile.getUrl();

  console.log(pdfUrl)
  return pdfUrl;

  // downloadDoc(pdfUrl);
}

function downloadDoc(docId) {
  const doc = DocumentApp.openById(docId);
  const blob = doc.getAs('application/pdf');
  const fileName = doc.getName();
  
  // Simulate clicking a download link (requires Apps Script execution authorization)
  const disposition = ContentService.createAttachment(blob, fileName);
  disposition.setCacheOption('nocache');
  
  return disposition;
}

// Function to retrieve and format teacher data (with filtering)
function getFilteredTeacherData(teacherSheet) {
  // Get data from A:D for all rows
  var rawData = teacherSheet.getRange("A:E").getValues();

  var filteredData = rawData.filter(function (row) {
    return row[3] !== 0 && row[3] !== "";
  });

  return filteredData;
}

function getFilteredCompanyData(sheetCompany) {
  // Get data from A:D for all rows
  var rawData = sheetCompany.getRange("G:I").getValues();

  var filteredData = rawData.filter(function (row) {
    return row[2] !== 0 && row[2] !== "";
  });

  return filteredData;
}

function getFilteredProblemData(rawData) {
  var filteredData = rawData.filter(function (row) {
    return row[1] !== 0 && row[1] !== "";
  });
  return filteredData;
}
