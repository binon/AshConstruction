# Google Drive Integration Setup

## Overview

The `invoiceNew.html` file includes Google Drive integration for file uploads, which replaces the simple file name storage used in the original `Invoices.html`.

## Key Differences

### Original Invoices.html
- Stores only file names in the `attachmentLinks` field
- Files are not actually uploaded anywhere
- Limited to displaying file names only

### New invoiceNew.html
- Uploads files directly to Google Drive
- Stores shareable Google Drive links
- Provides upload progress indicators
- Files are accessible via direct links from invoices

## Google Apps Script Setup Required

To enable the Google Drive upload functionality, you need to update your Google Apps Script with the following:

### 1. Enable Google Drive API
1. Go to Google Cloud Console
2. Enable the Google Drive API for your project
3. Make sure the Google Apps Script has permissions to access Drive

### 2. Add Upload Handler
Add this function to your Google Apps Script:

```javascript
function doPost(e) {
  const action = e.parameter.action || e.parameters.action?.[0];
  
  if (action === 'uploadToGoogleDrive') {
    return handleGoogleDriveUpload(e);
  }
  // ... your existing action handlers
}

function handleGoogleDriveUpload(e) {
  try {
    const fileBlob = e.parameters.file[0];
    const fileName = e.parameter.fileName || 'uploaded_file';
    
    // Create file in Google Drive
    const driveFile = DriveApp.createFile(fileBlob);
    driveFile.setName(fileName);
    
    // Make file publicly viewable
    driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'File uploaded successfully',
        driveId: driveFile.getId(),
        driveUrl: driveFile.getUrl(),
        shareableLink: 'https://drive.google.com/file/d/' + driveFile.getId() + '/view'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Upload failed: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3. File Organization (Optional)
You can organize uploaded files by creating folders:

```javascript
// Create or get invoice folder
function getInvoiceFolder() {
  const folderName = 'AshConstruction - Invoice Attachments';
  const folders = DriveApp.getFoldersByName(folderName);
  
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}

// Modified upload function with folder organization
function handleGoogleDriveUpload(e) {
  try {
    const fileBlob = e.parameters.file[0];
    const fileName = e.parameter.fileName || 'uploaded_file';
    const invoiceFolder = getInvoiceFolder();
    
    // Create file in the invoice folder
    const driveFile = invoiceFolder.createFile(fileBlob);
    driveFile.setName(fileName);
    
    // Make file publicly viewable
    driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'File uploaded successfully',
        driveId: driveFile.getId(),
        driveUrl: driveFile.getUrl(),
        shareableLink: 'https://drive.google.com/file/d/' + driveFile.getId() + '/view'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Upload failed: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Features

### Upload Progress
- Visual progress bar during file uploads
- Individual file status messages
- Error handling for failed uploads

### File Management
- Supports multiple file uploads
- Files are uploaded sequentially
- Real-time feedback on upload status

### Invoice History
- Backward compatible with old file name format
- New invoices display clickable Google Drive links
- Client and project filtering works as expected

## Testing

Without the Google Apps Script backend, the upload will fail gracefully and show error messages. Once the backend is properly configured, files will upload successfully to Google Drive.

## Supported File Types

- PDF (.pdf)
- Microsoft Word (.doc, .docx) 
- Images (.jpg, .jpeg, .png)
- Excel files (.xls, .xlsx)