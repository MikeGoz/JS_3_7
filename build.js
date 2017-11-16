'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Task 3.7

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(display) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

    _this.running = false;
    _this.display = display;
    _this.reset();
    _this.print(_this.times);
    return _this;
  }

  _createClass(Stopwatch, [{
    key: 'reset',
    value: function reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
    }
  }, {
    key: 'print',
    value: function print() {
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: 'format',
    value: function format(times) {
      return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
    }
  }, {
    key: 'step',
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.print();
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      this.times.miliseconds += 1;
      if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
      }
      if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.running = false;
      clearInterval(this.watch);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.stop();
      this.reset();
      this.print();
    }
  }, {
    key: 'catch',
    value: function _catch() {
      var lapList = document.getElementById('results');
      var newLap = document.createElement('li');
      var newLapArray = lapList.getElementsByTagName('li');

      newLap.innerHTML = newLapArray.length + 1 + ' lap : ' + this.format(this.times);
      lapList.appendChild(newLap);
      //console.log(newLapArray);
    }
  }, {
    key: 'catchClear',
    value: function catchClear() {
      var arrayToClear = document.getElementById('results');
      arrayToClear.innerHTML = '';
    }
  }]);

  return Stopwatch;
}(React.Component);

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
  return stopwatch.start();
});
var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
  return stopwatch.stop();
});
var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function () {
  return stopwatch.clear();
});
var catchButton = document.getElementById('catch');
catchButton.addEventListener('click', function () {
  return stopwatch.catch();
});
var catchClearButton = document.getElementById('catchClear');
catchClearButton.addEventListener('click', function () {
  return stopwatch.catchClear();
});
