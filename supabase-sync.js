/**
 * Supabase Sync Module
 * Handles cloud sync of Digital Slate edits to/from Supabase
 * Credentials are embedded and auto-initialized
 */

class SupabaseSync {
  constructor() {
    // Embedded credentials - auto-configured
    this.url = 'https://oqywbtcsfqafzwejztbu.supabase.co';
    this.key = 'sb_publishable_9TZ8FIrgJC_TOZwpUdY_Lg_O9y1f7LS';
    this.isConnected = false;
    this.syncInProgress = false;
    this.lastSync = null;
    this.initialize();
  }

  async initialize() {
    try {
      await this.testConnection();
      this.isConnected = true;
    } catch (error) {
      console.error('Supabase connection failed on init:', error);
      this.isConnected = false;
    }
  }

  async testConnection() {
    if (!this.url || !this.key) {
      throw new Error('Supabase credentials not configured');
    }

    try {
      const response = await fetch(`${this.url}/rest/v1/digital_slate?limit=1`, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP ${response.status}: ${response.statusText}`, errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText} - Table may not exist. Run setup-supabase.sql in Supabase dashboard.`);
      }

      return true;
    } catch (error) {
      console.error('Connection test failed:', error.message);
      throw error;
    }
  }

  async createTablesIfNotExist() {
    if (!this.url || !this.key) return;

    try {
      // Check if table exists by trying to query it
      const response = await fetch(`${this.url}/rest/v1/digital_slate?limit=1`, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`
        }
      });

      // Table already exists
      if (response.ok) return;

      // If 404, we need to create it via REST API (which requires admin role)
      // For now, we'll just log a warning and ask user to create manually
      console.warn('Table does not exist. User may need to create it manually in Supabase dashboard.');
    } catch (error) {
      console.error('Table check failed:', error);
    }
  }

  async pushSlates(state) {
    if (!this.isConnected || this.syncInProgress) return;

    this.syncInProgress = true;
    try {
      const payload = {
        project: state.project,
        edits: state.edits,
        updated_at: new Date().toISOString()
      };

      const response = await fetch(`${this.url}/rest/v1/digital_slate`, {
        method: 'POST',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      this.lastSync = new Date();
      return true;
    } catch (error) {
      console.error('Push failed:', error);
      throw error;
    } finally {
      this.syncInProgress = false;
    }
  }

  async pullSlates() {
    if (!this.isConnected || this.syncInProgress) return null;

    this.syncInProgress = true;
    try {
      const response = await fetch(`${this.url}/rest/v1/digital_slate?order=updated_at.desc&limit=1`, {
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`
        }
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.length > 0) {
        this.lastSync = new Date();
        return data[0];
      }

      return null;
    } catch (error) {
      console.error('Pull failed:', error);
      throw error;
    } finally {
      this.syncInProgress = false;
    }
  }

  getSyncStatus() {
    if (!this.isConnected) return 'offline';
    if (this.syncInProgress) return 'syncing';
    if (this.lastSync) return 'synced';
    return 'ready';
  }

  getStatusDisplay() {
    const status = this.getSyncStatus();
    const icons = {
      'offline': '⚫',
      'ready': '🟢',
      'syncing': '🟡',
      'synced': '🟢'
    };
    const labels = {
      'offline': 'Offline',
      'ready': 'Ready to sync',
      'syncing': 'Syncing...',
      'synced': 'Synced'
    };
    return `${icons[status]} ${labels[status]}`;
  }
}

// Global instance
const supabaseSync = new SupabaseSync();
