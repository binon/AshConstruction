# AshConstruction - Invoice & Client Management System

A comprehensive web-based invoice and client management system for construction companies, built with HTML, CSS, and JavaScript, integrated with Google Sheets for cloud storage and data persistence.

## 🏗️ Features

### Invoice Management
- **Professional Invoice Creation**: Create detailed invoices with line items, tax calculations, and client information
- **Real-time Calculations**: Automatic subtotal, tax, and total calculations as you type
- **File Attachments**: Support for uploading receipts, contracts, photos, and other documents
- **Auto-save**: Intelligent draft saving to prevent data loss
- **Client & Project Integration**: Link invoices to specific clients and projects

### Client Management
- **Client Database**: Store and manage client information including contact details and billing addresses
- **Project Tracking**: Associate multiple projects with each client
- **CRUD Operations**: Create, read, update, and delete clients and projects
- **Data Validation**: Form validation to ensure data integrity

### Google Sheets Integration
- **Cloud Storage**: All data is stored in Google Sheets for accessibility and backup
- **Real-time Sync**: Data is synchronized with Google Sheets in real-time
- **Offline Fallback**: Local storage backup when Google Sheets is unavailable
- **Automatic Backup**: Local storage maintains a backup copy for reliability

## 📁 Project Structure

```
AshConstruction/
│
├── index.html                          # Main invoice entry system
├── client.html                         # Client and project management
├── Invoices.html                       # Alternative invoice interface
├── google-apps-script-endpoints.js     # API configuration and documentation
└── README.md                           # This file
```

## 🚀 Getting Started

### Prerequisites

1. **Google Account**: Required for Google Sheets integration
2. **Google Apps Script**: Need to set up the backend API
3. **Web Server**: Any web server to host the HTML files (optional for local development)

### Google Apps Script Setup

1. **Create a New Google Apps Script Project**:
   - Go to [script.google.com](https://script.google.com)
   - Create a new project
   - Replace the default code with the backend implementation

2. **Required Google Apps Script Functions**:
   The script should handle these actions:
   - `getClients`: Retrieve all clients from Google Sheets
   - `saveClient`: Save/update client data
   - `deleteClient`: Delete a client and associated projects
   - `getProjects`: Retrieve all projects from Google Sheets
   - `saveProject`: Save/update project data
   - `deleteProject`: Delete a project
   - `saveInvoice`: Save invoice data (already implemented)
   - `saveDraft`: Save invoice draft
   - `getDraft`: Retrieve saved draft
   - `clearDraft`: Clear saved draft

3. **Deploy as Web App**:
   - In Apps Script, go to Deploy > New Deployment
   - Choose "Web app" as the type
   - Set execute as "Me" and access to "Anyone"
   - Copy the deployment URL and update it in the HTML files

4. **Update the Script URL**:
   Replace the `GOOGLE_APPS_SCRIPT_URL` in the HTML files with your deployment URL.

### Local Development

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/binon/AshConstruction.git
   cd AshConstruction
   ```

2. **Serve the Files**:
   You can use any web server. For example:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Or simply open index.html in your browser
   ```

3. **Access the Application**:
   - Open `http://localhost:8000` (or your server's URL)
   - Navigate to different pages using the provided links

## 💾 Data Storage

### Google Sheets Structure

The application expects the following Google Sheets structure:

#### Clients Sheet
| Column A | Column B | Column C | Column D | Column E | Column F | Column G |
|----------|----------|----------|----------|----------|----------|----------|
| ID       | Name     | Contact  | Email    | Phone    | Address  | Created  |

#### Projects Sheet
| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| ID       | ClientID | Name     | Address  | Description | Created |

#### Invoices Sheet
| Columns vary based on invoice data structure |

#### Drafts Sheet
| Used for auto-saving invoice drafts |

### Local Storage Backup

The application maintains local storage backups for:
- `ashClients`: Client data
- `ashProjects`: Project data
- `invoiceDraft`: Current invoice draft

## 🔧 Configuration

### API Endpoints

Update the Google Apps Script URL in each HTML file:

```javascript
const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```

### Customization

- **Currency**: Change the currency symbol in the JavaScript calculation functions
- **Tax Rate**: Modify the default tax rate in the invoice forms
- **Invoice Number Format**: Customize the invoice number generation pattern
- **File Upload Types**: Modify accepted file types in the file input elements

## 📱 Usage

### Creating an Invoice

1. **Open Invoice System**: Navigate to `index.html` or `Invoices.html`
2. **Enter Invoice Details**: Fill in invoice number, date, and due date
3. **Select Client**: Choose from existing clients or add new ones via the client management page
4. **Select Project**: Optionally link to a specific project
5. **Add Line Items**: Add descriptions, quantities, rates for work performed
6. **Attach Documents**: Upload supporting files if needed
7. **Review & Save**: Check calculations and save to Google Sheets

### Managing Clients & Projects

1. **Open Client Management**: Navigate to `client.html`
2. **Add Client**: Fill in client information and save
3. **Add Project**: Select a client and add project details
4. **Edit/Delete**: Use the action buttons to modify existing records

### Auto-save Feature

- **Invoices**: Automatically saves drafts as you type (5-second delay)
- **Client Data**: Immediately saved to Google Sheets on form submission
- **Offline Mode**: Uses local storage when Google Sheets is unavailable

## 🔒 Security Considerations

- **No Sensitive Data in Code**: API keys and sensitive data should be handled in Google Apps Script
- **Input Validation**: All forms include client-side validation
- **Error Handling**: Graceful fallback to local storage when online services fail
- **Data Backup**: Automatic local storage backup prevents data loss

## 🐛 Troubleshooting

### Common Issues

1. **"Error loading data"**: Check Google Apps Script deployment and URL
2. **"Offline mode"**: Network connectivity or Google Apps Script issues
3. **Form not saving**: Verify required fields are completed
4. **Calculations not working**: Check for JavaScript errors in browser console

### Error Messages

- **Loading errors**: Data loads from local storage as fallback
- **Save errors**: Data is saved locally and retried on next connection
- **Validation errors**: Form highlights required fields in red

## 🔄 Updates and Maintenance

### Backing Up Data

1. **Export from Google Sheets**: Download sheets as CSV/Excel files
2. **Local Storage**: Access browser's local storage for emergency backup
3. **Regular Exports**: Set up periodic data exports for safety

### Updating the Application

1. **HTML Files**: Can be updated independently
2. **Google Apps Script**: Update backend logic as needed
3. **Testing**: Always test changes in a development environment first

## 📞 Support

For technical support or feature requests:

1. **Issues**: Report bugs via GitHub issues
2. **Documentation**: Refer to inline code comments
3. **Google Apps Script**: Check Google's official documentation for API changes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📈 Future Enhancements

- **Mobile App**: React Native or Flutter implementation
- **PDF Generation**: Automatic invoice PDF creation
- **Email Integration**: Send invoices directly via email
- **Payment Integration**: Online payment processing
- **Reporting**: Analytics and financial reports
- **Multi-user Support**: Team collaboration features

---

**AshConstruction** - Streamlining construction business management with modern web technology.