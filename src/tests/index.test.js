import { 
    capitalize
} from '../index';

test('capitalize world', () => {
  expect(capitalize('world')).toBe('World');
});