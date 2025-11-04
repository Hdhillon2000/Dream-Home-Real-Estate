/**
 * @file api.js
 * @author Alex Kachur
 * @since 2025-11-02
 * @purpose Provides placeholder helpers while backend endpoints are under development.
 */

/**
 * Creates placeholder data when backend endpoints are not yet available.
 * @param {Array} fallback - Data to return during development.
 * @returns {Promise<Array>} Resolved fallback dataset.
 */
export function resolvePlaceholder(fallback = []) {
    // Returning a promise keeps the calling code consistent with future async requests.
    return Promise.resolve(fallback);
}
