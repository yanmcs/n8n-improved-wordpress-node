"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordpressApiCredentials = void 0;
/**
 * Represents the structure for WordPress API credentials using Application Passwords.
 */
class WordpressApiCredentials {
    constructor() {
        this.name = 'wordpressApi'; // Unique name for the credential type
        this.displayName = 'WordPress API Credentials';
        this.documentationUrl = 'https://developer.wordpress.org/rest-api/authentication/#application-passwords'; // Link to relevant documentation
        this.properties = [
            {
                displayName: 'WordPress Base URL',
                name: 'baseUrl',
                type: 'string',
                default: '',
                placeholder: 'https://yourdomain.com',
                required: true,
                description: 'The base URL of your WordPress installation (e.g., https://yourdomain.com)',
            },
            {
                displayName: 'WordPress Username',
                name: 'username',
                type: 'string',
                default: '',
                required: true,
                description: 'Your WordPress username',
            },
            {
                displayName: 'Application Password',
                name: 'applicationPassword',
                type: 'string',
                typeOptions: {
                    password: true, // Mask the input
                },
                default: '',
                required: true,
                description: 'Generated Application Password from your WordPress profile',
            },
            {
                displayName: 'Ignore SSL Issues',
                name: 'allowUnauthorizedCerts',
                type: 'boolean',
                default: false,
                description: 'Whether to ignore SSL certificate errors (useful for self-signed certificates)',
            },
            // TODO: Add fields for OAuth2 authentication later
        ];
        // TODO: Add test method to verify credentials
    }
}
exports.WordpressApiCredentials = WordpressApiCredentials;
//# sourceMappingURL=WordpressApiCredentials.credentials.js.map