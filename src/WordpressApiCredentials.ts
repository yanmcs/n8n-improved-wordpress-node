import { ICredentialType, INodeProperties } from 'n8n-workflow';

/**
 * Represents the structure for WordPress API credentials using Application Passwords.
 */
export class WordpressApiCredentials implements ICredentialType {
	name = 'wordpressApi'; // Unique name for the credential type
	displayName = 'WordPress API Credentials';
	documentationUrl = 'https://developer.wordpress.org/rest-api/authentication/#application-passwords'; // Link to relevant documentation
	properties: INodeProperties[] = [
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
