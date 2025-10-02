// Auth API layer for the auth feature.
// Using the native fetch API. Replace with axios if you prefer, keeping the same exported function signature.

// Base URL (configure in .env as VITE_API_BASE_URL=https://example.com)
const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "";

/**
 * Register a user (particular or empresa).
 * @param {Object} payload - Normalized payload containing a `type` discriminator and relevant fields.
 * @param {Object} [options]
 * @param {AbortSignal} [options.signal]
 * @returns {Promise<any>} Resolves with parsed JSON response.
 */
export async function registerUser(payload, { signal } = {}) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
    // include if using cookie/session auth; remove if using pure token-based stateless auth
    credentials: "include",
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // Non-JSON response; keep data null
  }

  if (!res.ok) {
    const message = data?.message || `Error ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.details = data;
    throw error;
  }
  return data;
}

/** Create a fresh AbortController to cancel an in-flight register request. */
export function createRegisterAbortController() {
  return new AbortController();
}

// DOCUMENTATION ONLY - Example payloads the backend should expect:
// Particular payload:
// {
//   type: 'particular',
//   nombre: 'Juan',
//   apellidos: 'Pérez',
//   email: 'juan@example.com',
//   genero: 'Masculino',
//   password: 'Secret#123',
//   codigoPlanAmigo: '12345',
//   recibirPromociones: true,
//   aceptaTerminos: true
// }
// Empresa payload:
// {
//   type: 'empresa',
//   empresa: 'Mi Empresa SL',
//   cifNif: 'A12345678',
//   recargoEquivalencia: 'No',
//   nombre: 'Ana',
//   apellidos: 'García',
//   email: 'ana@empresa.com',
//   password: 'Secret#123',
//   recibirPromociones: false,
//   confirmarRazonSocial: true,
//   aceptaTerminos: true
// }
