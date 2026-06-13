import { describe, it, expect } from 'vitest';
import {
  calloutClassAttr,
  typeFromClass,
  CALLOUT_TYPES,
  CALLOUT_CLASSES,
  DEFAULT_CALLOUT_TYPE,
} from '../client/src/components/calloutTypes';

/**
 * These helpers ARE the callout node's renderHTML/parseHTML logic
 * (client/src/components/Callout.ts delegates to them). This verifies the
 * `type` attribute survives the save → parse round-trip as a stable class on a
 * <div class="callout callout-X"> — which passes server sanitize + DOMPurify
 * (div + class) untouched. Pure functions → Node-testable, no DOM.
 */
describe('callout type attribute round-trip', () => {
  it('renders each type to "callout callout-X" and parses it back', () => {
    for (const t of CALLOUT_TYPES) {
      const attr = calloutClassAttr(t);
      expect(attr).toEqual({ class: `callout ${CALLOUT_CLASSES[t]}` });
      expect(typeFromClass(attr.class)).toBe(t);
    }
  });

  it('emits the base "callout" class plus the variant', () => {
    expect(calloutClassAttr('important').class).toBe('callout callout-important');
    expect(calloutClassAttr('note').class).toBe('callout callout-note');
  });

  it('parses the type from a class list among other classes', () => {
    expect(typeFromClass('callout callout-warning')).toBe('warning');
    expect(typeFromClass('foo callout-tip bar')).toBe('tip');
  });

  it('falls back to the default type for missing/unknown classes', () => {
    expect(typeFromClass(null)).toBe(DEFAULT_CALLOUT_TYPE);
    expect(typeFromClass('')).toBe(DEFAULT_CALLOUT_TYPE);
    expect(typeFromClass('callout')).toBe(DEFAULT_CALLOUT_TYPE);
    expect(typeFromClass('not-a-callout-class')).toBe(DEFAULT_CALLOUT_TYPE);
  });
});
