'use strict';

const SkiData = require('../model/ski-data.js');
const expect = require('chai').expect;
const request = require('superagent');
const url = 'http://localhost:3000';

require('../server.js');

const testObj = {
  location: 'Test Location',
  rating: '5'
};

describe('Object Constructor', function() {
  describe('Create new SkiData', function() {
    before( function() {
      this.testObj = new SkiData(testObj.location, testObj.rating);
    });
    it('should create a new object', function() {
      expect(this.testObj).to.be.an('object');
    });
    it('should have a location and a rating property', function() {
      expect(this.testObj).to.have.property('location');
      expect(this.testObj).to.have.property('rating');
    });
    it('should have valid data associated with each property', function() {
      expect(this.testObj).to.be.deep.property('location', 'Test Location');
      expect(this.testObj).to.be.deep.property('rating', '5');
    });
  });
});
