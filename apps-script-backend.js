// Deploy this as a Google Apps Script Web App
// 1. Go to script.google.com
// 2. Paste this code
// 3. Deploy > New deployment > Web app > Anyone can access
// 4. Copy the URL and put it in SYNC_URL in index.html

const SHEET_ID = ''; // Will use Script Properties storage instead

function doGet(e) {
  const data = PropertiesService.getScriptProperties().getProperty('cricket_data') || '{"players":{},"results":{}}';
  return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const incoming = JSON.parse(e.postData.contents);
    const existing = JSON.parse(PropertiesService.getScriptProperties().getProperty('cricket_data') || '{"players":{},"results":{}}');
    
    // Merge players and results
    const merged = {
      players: { ...existing.players, ...incoming.players },
      results: { ...existing.results, ...incoming.results }
    };
    
    PropertiesService.getScriptProperties().setProperty('cricket_data', JSON.stringify(merged));
    return ContentService.createTextOutput(JSON.stringify(merged)).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}
