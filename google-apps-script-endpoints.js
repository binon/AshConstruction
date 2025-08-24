/**
 * Google Apps Script Endpoints Configuration
 * This file defines the endpoints that need to be implemented in Google Apps Script
 * to support the AshConstruction application's integration with Google Sheets.
 */

// Base URL for the Google Apps Script web app
const GOOGLE_APPS_SCRIPT_BASE_URL = "https://script.google.com/macros/s/AKfycbzJY-vfHNj_4LQ3vwy443cyOX9pqsxZxEdzo1RV2cwNP2sqvXBVIXUhzl8Y2ogmODWW/exec";

/**
 * API Endpoints configuration
 * Each endpoint specifies the action parameter to be sent to the Google Apps Script
 */
const API_ENDPOINTS = {
  // Client operations
  clients: {
    getAll: { action: 'getClients' },
    save: { action: 'saveClient' },
    delete: { action: 'deleteClient' }
  },
  
  // Project operations  
  projects: {
    getAll: { action: 'getProjects' },
    save: { action: 'saveProject' },
    delete: { action: 'deleteProject' }
  },
  
  // Invoice operations (updated for row-based storage)
  invoices: {
    save: { action: 'saveInvoice' }, // Legacy action for backward compatibility
    saveRow: { action: 'saveInvoiceRow' }, // New action for individual invoice rows
    getAll: { action: 'getInvoices' } // Get all invoice data
  }
};

/**
 * Google Sheets API Helper Functions
 * These functions handle communication with Google Apps Script endpoints
 */
class GoogleSheetsAPI {
  
  /**
   * Makes a request to Google Apps Script endpoint
   * @param {string} action - The action to perform
   * @param {Object} data - The data to send
   * @returns {Promise} Response from the API
   */
  static async makeRequest(action, data = {}) {
    const requestData = new URLSearchParams();
    requestData.append('action', action);
    
    // Add all data fields to the request
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        requestData.append(key, data[key]);
      }
    });

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: requestData.toString()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Client operations
  static async getClients() {
    return this.makeRequest('getClients');
  }

  static async saveClient(clientData) {
    return this.makeRequest('saveClient', clientData);
  }

  static async deleteClient(clientId) {
    return this.makeRequest('deleteClient', { clientId });
  }

  // Project operations
  static async getProjects() {
    return this.makeRequest('getProjects');
  }

  static async saveProject(projectData) {
    return this.makeRequest('saveProject', projectData);
  }

  // Invoice operations
  static async getInvoices() {
    return this.makeRequest('getInvoices');
  }

  static async saveInvoice(invoiceData) {
    return this.makeRequest('saveInvoice', invoiceData);
  }

  static async saveInvoiceRow(invoiceRowData) {
    return this.makeRequest('saveInvoiceRow', invoiceRowData);
  }
}

/**
 * Expected Google Apps Script Implementation Structure
 * 
 * The Google Apps Script should handle these actions:
 * 
 * 1. getClients: Return array of client objects
 * 2. saveClient: Save/update client data, return success/error
 * 3. deleteClient: Delete client by ID, return success/error
 * 4. getProjects: Return array of project objects
 * 5. saveProject: Save/update project data, return success/error
 * 6. deleteProject: Delete project by ID, return success/error
 * 7. getInvoices: Return array of invoice row objects
 * 8. saveInvoice: Save invoice data (legacy method)
 * 9. saveInvoiceRow: Save individual invoice row with complete invoice details
 * 
 * Data Structure Examples:
 * 
 * Client Object:
 * {
 *   id: "unique-id",
 *   name: "Client Name",
 *   contact: "Contact Person",
 *   email: "email@example.com",
 *   phone: "+1234567890",
 *   address: "Full Address",
 *   createdAt: "2024-01-01T00:00:00.000Z"
 * }
 * 
 * Project Object:
 * {
 *   id: "unique-id",
 *   clientId: "client-id",
 *   name: "Project Name",
 *   address: "Project Address",
 *   description: "Project Description",
 *   createdAt: "2024-01-01T00:00:00.000Z"
 * }
 * 
 * Invoice Row Object (NEW FORMAT):
 * {
 *   timestamp: "2024-01-01T12:00:00.000Z",
 *   invoiceNumber: "ASH-20240101-1200",
 *   invoiceDate: "2024-01-01",
 *   dueDate: "2024-01-31",
 *   clientName: "Client Name",
 *   description: "Work description",
 *   quantity: "8",
 *   unit: "hrs",
 *   hrs: "8",
 *   rate: "50.00",
 *   amount: "400.00",
 *   subtotal: "£400.00",
 *   taxAmount: "£80.00",
 *   total: "£480.00",
 *   notes: "Invoice notes",
 *   attachmentLinks: "file1.pdf, file2.jpg",
 *   projectName: "Project Name"
 * }
 * 
 * Response Format:
 * {
 *   status: "success" | "error",
 *   message: "Success/error message",
 *   data: [...] // For get operations
 * }
 */