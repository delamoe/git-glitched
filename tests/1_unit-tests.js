/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  suite('Function convertHandler.getNum(input)', function () {

    test('Whole number input', function (done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal Input', function (done) {
      var input = '-3.2*L';
      assert.equal(convertHandler.getNum(input), -3.2);
      done();
    });

    test('Fractional Input', function (done) {
      var input = '3/2L';
      assert.equal(convertHandler.getNum(input), 3 / 2);
      done();
    });

    test('Fractional Input w/ Decimal', function (done) {
      var input = '3/2.2L';
      assert.equal(convertHandler.getNum(input), 3 / 2.2);
      done();
    });

    test('Invalid Input (double fraction)', function (done) {
      var input = '3/2/2.2L';
      assert.equal(convertHandler.getNum(input), 3 / 2 / 2.2);
      done();
    });

    test('No Numerical Input', function (done) {
      var input = 'ten L';
      assert.isNotNumber(convertHandler.getNum(input));
      done();
    });

  });

  suite('Function convertHandler.getUnit(input)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      var input = '3.2FGUL.,JMOKMNB';
      var expected = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'/* , 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG' */];
      assert.include(expected, convertHandler.getUnit(input));
      done();
    });

    test('Unknown Unit Input', function (done) {
      var input = '3.2FGU.,JMOMNB';
      var expected = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'/* , 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG' */];
      assert.notInclude(expected, convertHandler.getUnit(input));
      done();
    });

  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      var expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.spellOutUnit(unit)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      var expect = ['gallon', 'liter', 'mile', 'kilometer', 'pound', 'kilogram'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.convert(num, unit)', function () {

    test('Gal to L', function (done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('L to Gal', function (done) {
      const galToL = 3.78541;
      var input = [5, 'l'];
      var expected = input[0] / galToL;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('Mi to Km', function (done) {
      const miToKm = 1.60934;
      var input = [5, 'mi'];
      var expected = input[0] * miToKm;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('Km to Mi', function (done) {
      const miToKm = 1.60934;
      var input = [5, 'km'];
      var expected = input[0] / miToKm;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('Lbs to Kg', function (done) {
      const lbsToKg = 0.453592;
      var input = [5, 'lbs'];
      var expected = input[0] * lbsToKg;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('Kg to Lbs', function (done) {
      const lbsToKg = 0.453592;
      var input = [5, 'kg'];
      var expected = input[0] / lbsToKg;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

  });
});