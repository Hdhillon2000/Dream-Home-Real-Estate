/**
 * @file api.js
 * @author Alex Kachur
 * @since 2025-11-02
 * @purpose Houses lightweight helpers for future API integration.
 */
const JSON_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

/**
 * Fetches JSON from the given endpoint and unwraps the response payload.
 * @param {string} url - Target endpoint relative to the API root.
 * @returns {Promise<any>} Parsed JSON payload.
 */
export async function getJson(url) {
    const response = await fetch(url, { headers: JSON_HEADERS });
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    return response.json();
}

/**
 * Sends JSON payload data to the server.
 * @param {string} url - Target endpoint relative to the API root.
 * @param {object} payload - Body content to serialise.
 * @param {RequestInit} [options] - Additional fetch options.
 * @returns {Promise<any>} Parsed JSON payload.
 */
export async function postJson(url, payload, options = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify(payload),
        ...options,
    });

    if (!response.ok) {
        throw new Error(`Failed to post to ${url}: ${response.status}`);
    }

    return response.json();
}

/**
 * Creates placeholder data when backend endpoints are not yet available.
 * @param {Array} fallback - Data to return during development.
 * @returns {Promise<Array>} Resolved fallback dataset.
 */
export function resolvePlaceholder(fallback = []) {
    // Returning a promise keeps the calling code consistent with future async requests.
    return Promise.resolve(fallback);
}
