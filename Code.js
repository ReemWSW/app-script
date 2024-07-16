function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function doGet(e) {
  if (!e.parameter.page) {
    // When no specific page requested, return "home page"
    return HtmlService.createTemplateFromFile('index').evaluate();
  }
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
}

// Function to include HTML files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getSheetData() {
  try {
    var sheet = SpreadsheetApp.openById('1qSpMNLfZIFT023d9BjdmVj54zFMAYpzDlRKbYF3M6bM').getSheetByName('Form Responses 1');
    if (!sheet) {
      throw new Error('Sheet not found');
    }

    var data = sheet.getDataRange().getValues();
    if (data.length === 0) {
      throw new Error('No data found');
    }

    return data;
  } catch (e) {
    Logger.log('Error: ' + e.message);
    return [];
  }
}


