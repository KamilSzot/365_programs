import 'mocha'
import { expect } from 'chai'

import Cl from './cl'

describe('Cl', () => {
  var cl;
  beforeEach(() => {
    cl = new Cl();
  });
  describe('#add', () => {
    it('should return sum of numbers given as paramers', () => {
      expect(cl.add(2, 2)).to.equal(4);
    });
  });
});