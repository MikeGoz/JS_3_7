"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Task 3.7

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch() {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

		_this.state = {
			running: false,
			lapList: [],

			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};
		return _this;
	}
	// ------------- controls -----------------


	_createClass(Stopwatch, [{
		key: "start",
		value: function start() {
			var _this2 = this;

			if (!this.state.running) {
				this.setState({ running: true });
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: "stop",
		value: function stop() {
			this.setState({ running: false });
			clearInterval(this.watch);
		}
	}, {
		key: "clear",
		value: function clear() {
			this.setState({
				running: false,
				miliseconds: this.state.times.miliseconds = 0,
				seconds: this.state.times.seconds = 0,
				minutes: this.state.times.minutes = 0
			});
			clearInterval(this.watch);
		}
	}, {
		key: "catch",
		value: function _catch() {
			this.setState({
				lapList: this.state.lapList.concat([this.format(this.state.times)])
			});
			console.log(this.state.lapList);
		}
	}, {
		key: "catchClear",
		value: function catchClear() {
			this.setState({
				lapList: []
			});
		}
		// ----------------------------------------			

	}, {
		key: "step",
		value: function step() {
			if (!this.state.running) return;
			this.calculate();
		}
	}, {
		key: "calculate",
		value: function calculate() {
			var timesCalc = {
				miliseconds: this.state.times.miliseconds,
				seconds: this.state.times.seconds,
				minutes: this.state.times.minutes
			};
			timesCalc.miliseconds += 1;

			if (timesCalc.miliseconds >= 100) {
				timesCalc.seconds += 1;
				timesCalc.miliseconds = 0;
			}
			if (timesCalc.seconds >= 60) {
				timesCalc.minutes += 1;
				timesCalc.seconds = 0;
			}
			this.setState({ times: timesCalc });
		}
	}, {
		key: "format",
		value: function format(times) {
			return this.pad0(times.minutes) + " : " + this.pad0(times.seconds) + " : " + this.pad0(times.miliseconds);
		}
	}, {
		key: "pad0",
		value: function pad0(value) {
			var result = value.toString();
			if (result.length < 2) {
				result = '0' + result;
			}
			return result;
		}
		// --------------------------------------

	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var lapArray = this.state.lapList.map(function (lapTime) {
				return React.createElement(
					"li",
					{ key: lapTime },
					lapTime
				);
			});
			return React.createElement(
				"div",
				{ className: "stopwatch" },
				React.createElement("img", { src: "img/stoper.jpg", height: "200", width: "200" }),
				React.createElement(
					"div",
					{ id: "timeControls" },
					React.createElement(
						"a",
						{ onClick: function onClick() {
								return _this3.start();
							}, className: "button", id: "start" },
						"START"
					),
					React.createElement(
						"a",
						{ onClick: function onClick() {
								return _this3.stop();
							}, className: "button", id: "stop" },
						"STOP"
					),
					React.createElement(
						"a",
						{ onClick: function onClick() {
								return _this3.clear();
							}, className: "button", id: "clear" },
						"CLEAR"
					)
				),
				React.createElement(
					"div",
					{ id: "screen" },
					this.format(this.state.times)
				),
				React.createElement(
					"div",
					{ id: "catchControls" },
					React.createElement(
						"a",
						{ onClick: function onClick() {
								return _this3.catch();
							}, className: "button", id: "catch" },
						"CATCH LAP TIME"
					),
					React.createElement(
						"a",
						{ onClick: function onClick() {
								return _this3.catchClear();
							}, className: "button", id: "catchClear" },
						"CLEAR LAP TIME"
					)
				),
				React.createElement(
					"ul",
					{ id: "results" },
					lapArray
				)
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('stopwatch_1'));
ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('stopwatch_2'));
ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('stopwatch_3'));
