import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const WORKFLOW_PATH = resolve(process.cwd(), '../../.github/workflows/cloudflare-deploy.yml');

describe('Cloudflare Deploy Workflow', () => {
  let workflowContent: string;

  it('should exist at the expected path', () => {
    workflowContent = readFileSync(WORKFLOW_PATH, 'utf-8');
    expect(workflowContent).toBeTruthy();
  });

  describe('triggers', () => {
    beforeEach(() => {
      workflowContent = readFileSync(WORKFLOW_PATH, 'utf-8');
    });

    it('should trigger on push to main', () => {
      expect(workflowContent).toMatch(/on:\s*push:/);
      expect(workflowContent).toMatch(/branches:\s*- main/);
    });

    it('should support manual workflow_dispatch', () => {
      expect(workflowContent).toContain('workflow_dispatch');
    });

    it('should ignore markdown, conductor, and gitignore paths', () => {
      expect(workflowContent).toMatch(/paths-ignore:/);
      expect(workflowContent).toMatch(/-\s*'\*\*\.md'/);
      expect(workflowContent).toMatch(/-\s*'conductor\/\*\*'/);
      expect(workflowContent).toMatch(/-\s*'\.gitignore'/);
    });
  });

  describe('concurrency', () => {
    beforeEach(() => {
      workflowContent = readFileSync(WORKFLOW_PATH, 'utf-8');
    });

    it('should define a concurrency group', () => {
      expect(workflowContent).toMatch(/concurrency:/);
      expect(workflowContent).toMatch(/group:\s*cloudflare-deploy/);
    });

    it('should not cancel in-progress deployments', () => {
      expect(workflowContent).toMatch(/cancel-in-progress:\s*false/);
    });
  });

  describe('pipeline steps', () => {
    beforeEach(() => {
      workflowContent = readFileSync(WORKFLOW_PATH, 'utf-8');
    });

    it('should checkout code', () => {
      expect(workflowContent).toMatch(/uses:\s*actions\/checkout@v4/);
    });

    it('should setup Node.js 20', () => {
      expect(workflowContent).toMatch(/uses:\s*actions\/setup-node@v4/);
      expect(workflowContent).toMatch(/node-version:\s*'20'/);
      expect(workflowContent).toMatch(/cache:\s*'npm'/);
    });

    it('should install dependencies with npm ci', () => {
      expect(workflowContent).toMatch(/run:\s*\|\s*npm ci/);
    });

    it('should run lint with CI=true', () => {
      expect(workflowContent).toMatch(/run:\s*npm run lint/);
      expect(workflowContent).toMatch(/CI:\s*true/);
    });

    it('should run tests with CI=true', () => {
      expect(workflowContent).toMatch(/run:\s*npm test/);
    });

    it('should run build with CI=true', () => {
      expect(workflowContent).toMatch(/run:\s*npm run build/);
    });
  });

  describe('deployment', () => {
    beforeEach(() => {
      workflowContent = readFileSync(WORKFLOW_PATH, 'utf-8');
    });

    it('should use cloudflare/wrangler-action@v3', () => {
      expect(workflowContent).toMatch(/uses:\s*cloudflare\/wrangler-action@v3/);
    });

    it('should reference required GitHub secrets', () => {
      expect(workflowContent).toContain('secrets.CLOUDFLARE_API_TOKEN');
      expect(workflowContent).toContain('secrets.CLOUDFLARE_ACCOUNT_ID');
    });

    it('should deploy using wrangler.jsonc config', () => {
      expect(workflowContent).toContain('deploy --config wrangler.jsonc');
    });

    it('should target production environment', () => {
      expect(workflowContent).toMatch(/env:\s*production/);
    });
  });

  describe('failure handling', () => {
    beforeEach(() => {
      workflowContent = readFileSync(WORKFLOW_PATH, 'utf-8');
    });

    it('should have a failure notification step', () => {
      expect(workflowContent).toMatch(/if:\s*failure\(\)/);
      expect(workflowContent).toContain('::error::Cloudflare deployment failed');
    });
  });
});