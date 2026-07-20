async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: options.body instanceof FormData ? undefined : { 'Content-Type': 'application/json' },
    ...options,
  });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    const error = new Error(data?.error || `Error ${res.status}`);
    error.code = data?.code;
    throw error;
  }
  return data;
}

export const api = {
  status: () => request('/status'),

  products: {
    list: () => request('/products'),
    get: (id) => request(`/products/${id}`),
    create: (payload) => request('/products', { method: 'POST', body: JSON.stringify(payload) }),
    update: (id, payload) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    remove: (id) => request(`/products/${id}`, { method: 'DELETE' }),
    uploadPhoto: (id, file) => {
      const form = new FormData();
      form.append('photo', file);
      return request(`/products/${id}/photos`, { method: 'POST', body: form });
    },
    removePhoto: (id, photoId) => request(`/products/${id}/photos/${photoId}`, { method: 'DELETE' }),
  },

  ideas: {
    generate: () => request('/ideas/generate', { method: 'POST' }),
    save: (idea) => request('/ideas/save', { method: 'POST', body: JSON.stringify(idea) }),
  },

  compose: {
    generate: (payload) => request('/compose/generate', { method: 'POST', body: JSON.stringify(payload) }),
    save: (payload) => request('/compose/save', { method: 'POST', body: JSON.stringify(payload) }),
  },

  adAngles: {
    generate: (payload) => request('/ad-angles/generate', { method: 'POST', body: JSON.stringify(payload) }),
  },

  calendar: {
    list: () => request('/calendar'),
    update: (id, payload) => request(`/calendar/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    remove: (id) => request(`/calendar/${id}`, { method: 'DELETE' }),
  },

  settings: {
    get: () => request('/settings'),
    update: (payload) => request('/settings', { method: 'PUT', body: JSON.stringify(payload) }),
  },

  competitors: {
    insights: () => request('/competitors/insights'),
    notes: () => request('/competitors/notes'),
    analyze: (note_text) => request('/competitors/analyze', { method: 'POST', body: JSON.stringify({ note_text }) }),
  },
};
