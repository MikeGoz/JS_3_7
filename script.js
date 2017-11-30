// Task 3.7

class Stopwatch extends React.Component {
	
	constructor() {
		super();
		this.state = {
			running: false,		
			lapList: [],
			
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
		};
	}
	// ------------- controls -----------------
	start() {
		if (!this.state.running){
			this.setState({running: true});
			this.watch = setInterval(() => this.step(), 10);
		}
	}
	stop() {
		this.setState({running: false});
		clearInterval(this.watch);
	}
	clear() {
		this.setState({
			running: false,
			miliseconds: this.state.times.miliseconds = 0,
			seconds: this.state.times.seconds = 0,
			minutes: this.state.times.minutes = 0
		});
		clearInterval(this.watch);
  }
	catch() {
		this.setState({
			lapList: this.state.lapList.concat([this.format(this.state.times)])
			});
			console.log(this.state.lapList)
		}
	catchClear() {
		this.setState({
			lapList: []
		});
	}
	// ----------------------------------------			
	step() {
		if (!this.state.running) return;
		this.calculate();
	}
	calculate() {	
		let timesCalc = {
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
	 	this.setState({times: timesCalc});
	}
	format(times) {
		return `${this.pad0(times.minutes)} : ${this.pad0(times.seconds)} : ${this.pad0(times.miliseconds)}`;
	}
	pad0(value) {
		let result = value.toString();
		if (result.length <2){
			result = '0' + result;
		}
		return result;
	}
	// --------------------------------------
	render() {
		const lapArray = this.state.lapList.map((lapTime) => <li key={lapTime}>{lapTime}</li>);
		return (
			<div className="stopwatch">
				<img src="img/stoper.jpg"  height="200" width="200"/>
				<div id="timeControls">
					<a onClick={() => this.start()} className="button" id="start">START</a>
					<a onClick={() => this.stop()} className="button" id="stop">STOP</a>
					<a onClick={() => this.clear()} className="button" id="clear">CLEAR</a>
				</div>
				<div id="screen">{this.format(this.state.times)}</div>
				<div id="catchControls">
					<a onClick={() => this.catch()} className="button" id="catch">CATCH LAP TIME</a>
					<a onClick={() => this.catchClear()} className="button" id="catchClear">CLEAR LAP TIME</a>
				</div>
				<ul id="results">
					{lapArray}
				</ul>
			</div>
		);
	}
}
ReactDOM.render(<Stopwatch/>, document.getElementById('stopwatch_1'));
ReactDOM.render(<Stopwatch/>, document.getElementById('stopwatch_2'));
ReactDOM.render(<Stopwatch/>, document.getElementById('stopwatch_3'));