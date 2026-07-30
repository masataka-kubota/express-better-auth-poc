import { describe, expect, it } from 'vitest';

import { parseFrontendOrigins } from '@/lib/parseFrontendOrigins';

describe('parseFrontendOrigins', () => {
  it('returns a single origin as a one-item array', () => {
    expect(parseFrontendOrigins('http://localhost:5173')).toEqual(['http://localhost:5173']);
  });

  it('splits multiple origins into an array', () => {
    expect(parseFrontendOrigins('http://localhost:5173,http://localhost:4173')).toEqual([
      'http://localhost:5173',
      'http://localhost:4173'
    ]);
  });

  it('trims whitespace around each origin', () => {
    expect(parseFrontendOrigins(' http://localhost:5173 , http://localhost:4173 ')).toEqual([
      'http://localhost:5173',
      'http://localhost:4173'
    ]);
  });

  it('ignores empty entries', () => {
    expect(parseFrontendOrigins('http://localhost:5173,')).toEqual(['http://localhost:5173']);
  });
});
