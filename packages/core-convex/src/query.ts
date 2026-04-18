import { ConvexHttpClient } from 'convex/browser';
import type { ResolveConvexAdminAuthOptions, ConvexAdminAuth } from './admin.js';
import { resolveConvexAdminAuth } from './admin.js';
import { getConvexUrl } from './config.js';

export interface ConvexClientWithAdminAuth extends ConvexHttpClient {
  setAdminAuth: (token: string, actingAsIdentity?: string) => void;
}

let publicClient: ConvexHttpClient | null = null;

export function getPublicConvexClient(): ConvexHttpClient {
  if (!publicClient) {
    publicClient = new ConvexHttpClient(getConvexUrl());
  }
  return publicClient;
}

export interface CreateInternalClientOptions extends ResolveConvexAdminAuthOptions {
  convexUrl?: string;
}

let internalClient: ConvexHttpClient | null = null;
let internalClientAuth: ConvexAdminAuth | null = null;

export async function getInternalConvexClient(
  options: CreateInternalClientOptions = {},
): Promise<ConvexHttpClient> {
  const url = options.convexUrl ?? getConvexUrl();
  const adminAuth = await resolveConvexAdminAuth(options);

  if (
    internalClient &&
    internalClientAuth &&
    internalClientAuth.token === adminAuth.token &&
    internalClientAuth.source === adminAuth.source
  ) {
    return internalClient;
  }

  internalClient = new ConvexHttpClient(url);
  (internalClient as ConvexClientWithAdminAuth).setAdminAuth(adminAuth.token);
  internalClientAuth = adminAuth;
  return internalClient;
}

export function resetInternalClient(): void {
  internalClient = null;
  internalClientAuth = null;
}

export async function fetchPublicQuery(
  ref: unknown,
  args: Record<string, unknown>,
): Promise<unknown> {
  const client = getPublicConvexClient();
  return client.query(ref as Parameters<ConvexHttpClient['query']>[0], args);
}

export async function fetchPublicMutation(
  ref: unknown,
  args: Record<string, unknown>,
): Promise<unknown> {
  const client = getPublicConvexClient();
  return client.mutation(ref as Parameters<ConvexHttpClient['mutation']>[0], args);
}

export async function fetchInternalQuery(
  ref: unknown,
  args: Record<string, unknown>,
  options: CreateInternalClientOptions = {},
): Promise<unknown> {
  const client = await getInternalConvexClient(options);
  return client.query(ref as Parameters<ConvexHttpClient['query']>[0], args);
}

export async function fetchInternalMutation(
  ref: unknown,
  args: Record<string, unknown>,
  options: CreateInternalClientOptions = {},
): Promise<unknown> {
  const client = await getInternalConvexClient(options);
  return client.mutation(ref as Parameters<ConvexHttpClient['mutation']>[0], args);
}