const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

const getSecretGateHeader = (): Record<string, string> => {
  const gateToken = localStorage.getItem('portfolio_secret_gate_token');
  return gateToken ? { 'x-admin-secret-gate': gateToken } : {};
};

const getTenantHeader = (): Record<string, string> => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const tenantParam = params.get('tenant');
    if (tenantParam) {
      return { 'x-tenant-id': tenantParam.trim().toLowerCase() };
    }
    const storedTenant = localStorage.getItem('portfolio_tenant_id');
    if (storedTenant) {
      return { 'x-tenant-id': storedTenant.trim().toLowerCase() };
    }
  }
  return {};
};

const getPublicHeaders = (): Record<string, string> => {
  return {
    ...getTenantHeader(),
    ...getSecretGateHeader(),
  };
};

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('portfolio_admin_token');
  return {
    'Content-Type': 'application/json',
    ...getTenantHeader(),
    ...getSecretGateHeader(),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // --- Auth ---
  async login(usernameOrEmail: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getSecretGateHeader(),
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return res.json();
  },

  async updateAccount(accountData: { username?: string; email?: string }) {
    const res = await fetch(`${API_BASE}/auth/update-account`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(accountData),
    });
    return res.json();
  },

  // --- Profile ---
  async getProfile() {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: getPublicHeaders(),
    });
    return res.json();
  },

  async updateProfile(profileData: any) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return res.json();
  },

  async updateSocialLinks(socialLinksList: any[]) {
    const res = await fetch(`${API_BASE}/profile/social-links`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ socialLinksList }),
    });
    return res.json();
  },

  // --- Site Settings (Background theme, sections order, CV) ---
  async getSettings() {
    const res = await fetch(`${API_BASE}/settings`, {
      headers: getPublicHeaders(),
    });
    return res.json();
  },

  async updateSettings(settingsData: any) {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settingsData),
    });
    return res.json();
  },

  // --- Projects ---
  async getProjects(params?: { category?: string; flagship?: boolean }) {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.flagship !== undefined) query.append('flagship', String(params.flagship));

    const url = `${API_BASE}/projects${query.toString() ? '?' + query.toString() : ''}`;
    const res = await fetch(url, {
      headers: getPublicHeaders(),
    });
    return res.json();
  },

  async getProject(idOrSlug: string) {
    const res = await fetch(`${API_BASE}/projects/${idOrSlug}`, {
      headers: getPublicHeaders(),
    });
    return res.json();
  },

  async createProject(projectData: any) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    return res.json();
  },

  async updateProject(id: string, projectData: any) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    return res.json();
  },

  async deleteProject(id: string) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // --- Skills ---
  async getSkills(category?: string) {
    const url = `${API_BASE}/skills${category ? '?category=' + category : ''}`;
    const res = await fetch(url, {
      headers: getPublicHeaders(),
    });
    return res.json();
  },

  async createSkill(skillData: any) {
    const res = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(skillData),
    });
    return res.json();
  },

  async updateSkill(id: string, skillData: any) {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(skillData),
    });
    return res.json();
  },

  async deleteSkill(id: string) {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // --- Messages ---
  async sendMessage(messageData: { name: string; email: string; subject?: string; message: string }) {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getPublicHeaders(),
      },
      body: JSON.stringify(messageData),
    });
    return res.json();
  },

  async getMessages() {
    const res = await fetch(`${API_BASE}/messages`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async toggleReadMessage(id: string, isRead?: boolean) {
    const res = await fetch(`${API_BASE}/messages/${id}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(isRead !== undefined ? { isRead } : {}),
    });
    return res.json();
  },

  async deleteMessage(id: string) {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // --- Stats ---
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // --- File Upload ---
  async uploadFile(file: File) {
    const token = localStorage.getItem('portfolio_admin_token');
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        ...getSecretGateHeader(),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    return res.json();
  },
};
