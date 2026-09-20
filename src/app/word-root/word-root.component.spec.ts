import { describe, expect, it } from 'vitest';
import { DataService } from '../data.service';
import { WordRootComponent } from './word-root.component';

describe('WordRootComponent', () => {
  it('nice() blanks out placeholder values but leaves real text untouched', () => {
    const component = new WordRootComponent({} as DataService);
    expect(component.nice('-')).toBe('');
    expect(component.nice('0')).toBe('');
    expect(component.nice('dakù')).toBe('dakù');
  });
});
