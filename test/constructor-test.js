'use strict';

const SkiData = require('../model/ski-data.js');
const expect = require('chai').expect;
const debug = require('debug')('ski:constructor-test');

require('../server.js');

const testObj = {
  location: 'Test Location',
  rating: '5'
};

describe('Object Constructor', function() {
  describe('Create new SkiData', function() {
    debug('Create new SkiData');

    before( function() {
      this.testObj = new SkiData(testObj.location, testObj.rating);
    });
    it('should create a new object', function() {
      debug('should create a new object');
      
      expect(this.testObj).to.be.an('object');
    });
    it('should have a location and a rating property', function() {
      debug('should have a location and a rating property');

      expect(this.testObj).to.have.property('location');
      expect(this.testObj).to.have.property('rating');
    });
    it('should have valid data associated with each property', function() {
      debug('should have valid data associated with each property');

      expect(this.testObj).to.be.deep.property('location', 'Test Location');
      expect(this.testObj).to.be.deep.property('rating', '5');
    });
  });
});
