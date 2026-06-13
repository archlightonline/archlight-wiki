import { describe, it, expect } from 'vitest';
import {
  widthToAttr,
  widthFromAttr,
  alignToAttr,
  alignFromClass,
  clampWidth,
  ALIGN_CLASSES,
  MIN_IMAGE_WIDTH,
  type ImageAlign,
} from '../client/src/components/imageAttrs';

/**
 * These helpers ARE the resizable-image node's parseHTML/renderHTML logic
 * (client/src/components/ResizableImage.tsx delegates to them). This test
 * exercises the save → parse round-trip — the "one real gotcha": that width and
 * alignment survive being serialized to an <img> attribute/class and read back.
 * Runs in the Node test env (no DOM, no new deps) because the helpers are pure.
 */
describe('resizable image attribute round-trip', () => {
  it('serializes width to a numeric attribute (not inline style) and back', () => {
    const rendered = widthToAttr(320);
    expect(rendered).toEqual({ width: '320' });
    expect(rendered).not.toHaveProperty('style'); // width must NOT be inline style
    expect(widthFromAttr(rendered.width)).toBe(320);
  });

  it('omits width when unset and ignores invalid widths', () => {
    expect(widthToAttr(null)).toEqual({});
    expect(widthToAttr(undefined)).toEqual({});
    expect(widthToAttr(0)).toEqual({});
    expect(widthFromAttr(null)).toBeNull();
    expect(widthFromAttr('')).toBeNull();
    expect(widthFromAttr('0')).toBeNull();
    expect(widthFromAttr('abc')).toBeNull();
    expect(widthFromAttr('240')).toBe(240);
  });

  it('serializes each alignment to its class and parses it back', () => {
    const aligns: ImageAlign[] = ['left', 'center', 'right'];
    for (const align of aligns) {
      const rendered = alignToAttr(align);
      expect(rendered).toEqual({ class: ALIGN_CLASSES[align] });
      expect(alignFromClass(rendered.class)).toBe(align);
    }
  });

  it('omits alignment when unset and ignores unrelated classes', () => {
    expect(alignToAttr(null)).toEqual({});
    expect(alignFromClass(null)).toBeNull();
    expect(alignFromClass('some-other-class')).toBeNull();
    // Alignment class found among other classes still parses.
    expect(alignFromClass('foo img-right bar')).toBe('right');
  });

  it('round-trips combined width + alignment through an <img> attribute set', () => {
    // Simulate the node's renderHTML output for { width: 480, align: 'center' }…
    const attrs = { ...widthToAttr(480), ...alignToAttr('center') };
    expect(attrs).toEqual({ width: '480', class: 'img-center' });
    // …then parseHTML reading it back off the element.
    expect(widthFromAttr(attrs.width)).toBe(480);
    expect(alignFromClass(attrs.class)).toBe('center');
  });

  it('clamps dragged width to [MIN_IMAGE_WIDTH, max]', () => {
    expect(clampWidth(10, 1000)).toBe(MIN_IMAGE_WIDTH); // below min floored
    expect(clampWidth(400, 1000)).toBe(400); // within bounds preserved
    expect(clampWidth(5000, 1000)).toBe(1000); // above max capped to container
    expect(clampWidth(123.7, 1000)).toBe(124); // rounded
  });
});
