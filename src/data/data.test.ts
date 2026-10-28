import { describe, it, expect } from 'vitest';
import { committee } from './committee';
import { taman } from './taman';
import { activities } from './activities';
import { appFeatures } from './appFeatures';
import { orgInfo } from './orgInfo';

describe('content data layer', () => {
  it('has exactly 14 committee members', () => {
    expect(committee).toHaveLength(14);
  });

  it('has exactly one level-1 chairman', () => {
    expect(committee.filter((m) => m.level === 1)).toHaveLength(1);
    expect(committee[0]).toMatchObject({ name: 'ASMEL SUFIAN BIN HASSAN', position: 'Pengerusi PKKC', level: 1 });
  });

  it('has exactly 9 level-4 AJK members', () => {
    expect(committee.filter((m) => m.level === 4)).toHaveLength(9);
  });

  it('has exactly 8 taman', () => {
    expect(taman).toEqual([
      'Kita Ria', 'Kita Bayu', 'Kita Impian', 'Kita Sejati',
      'Kita Mesra', 'Kita Harmoni', 'Kita Mekar', 'Kita Bestari',
    ]);
  });

  it('has between 4 and 6 placeholder activities', () => {
    expect(activities.length).toBeGreaterThanOrEqual(4);
    expect(activities.length).toBeLessThanOrEqual(6);
  });

  it('has the real orgInfo registration details', () => {
    expect(orgInfo.registrationNumber).toBe('PPM-004-10-21092024');
    expect(orgInfo.domain).toBe('https://pkkc.org.my');
  });

  it('has app features list non-empty', () => {
    expect(appFeatures.length).toBeGreaterThan(0);
  });
});
