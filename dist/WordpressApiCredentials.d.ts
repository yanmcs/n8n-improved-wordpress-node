import { ICredentialType, INodeProperties } from 'n8n-workflow';
/**
 * Represents the structure for WordPress API credentials using Application Passwords.
 */
export declare class WordpressApiCredentials implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    properties: INodeProperties[];
}
