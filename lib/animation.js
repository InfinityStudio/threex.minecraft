const THREEx = require('./threex.minecraft')

class Animation {
	constructor() {
		// update function
		this._updateFcts = [];
		this.update = (delta, now) => {
			this._updateFcts.forEach(function (updateFct) {
				updateFct(delta, now)
			})
		}
		// init stuff
		this._keyframes = new Array;
		this._totalTime = null;
		this._onUpdate = null;
		this._onCapture = (position) => { };
		this._initialPos = {};
		this._propertyTweens = {};
	}
	destroy() {
		this.stop();
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		setup								//
	//////////////////////////////////////////////////////////////////////////////////

	/**
	 * @param {Number} duration the duration of this keyframe validity in seconds
	 * @param {Object} position list of properties involved in the animations
	*/
	pushKeyframe(duration, position) {
		this._keyframes.push({
			duration: duration,
			position: position
		});
		return this;	// for chained API
	};

	/**
	 * Set the Update callback
	 * 
	 * @param {function} fn the update callback
	*/
	onUpdate(fn) {
		this._onUpdate = fn
		return this;	// for chained API
	}

	/**
	 * Set the Capture callback
	 * 
	 * @param {function} fn the update callback
	*/
	onCapture(fn) {
		this._onCapture = fn
		return this;	// for chained API
	}

	/**
	 * Set propertyTweens 
	 * 
	 * @param {function} fn the update callback
	*/
	propertyTweens(propertyTweens) {
		this._propertyTweens = propertyTweens;
		return this;	// for chained API
	}

	/**
	 * get the total animation duration
	 * 
	 * @returns {Number} the duration of the whole animation
	*/
	duration() {
		if (this._keyframes.length === 0) return 0;
		let lastKeyframe = this._keyframes[this._keyframes.length - 1];
		return lastKeyframe._endTime;
	};


	//////////////////////////////////////////////////////////////////////////////////
	//		interpolation							//
	//////////////////////////////////////////////////////////////////////////////////

	/**
	 * build a interpolated position
	 * 
	 * @param {Number} age amount of seconds since the animation started
	*/
	_buildPosition(age) {
		// compute the deltatime
		let delta = age % this.duration();
		// find baseFrame based on delta
		for (let frameIdx = 0; frameIdx < this._keyframes.length; frameIdx++) {
			let baseFrame = this._keyframes[frameIdx];
			if (delta < baseFrame._startTime) continue;
			if (delta >= baseFrame._endTime) continue;
			break;
		}
		// sanity check - the baseFrame has to be known
		console.assert(frameIdx !== this._keyframes.length);
		// compute some variables
		let timeOffset = delta - baseFrame._startTime;
		let timePercent = timeOffset / baseFrame.duration;
		let nextFrame = this._keyframes[(frameIdx + 1) % this._keyframes.length];

		//console.log("delta", delta)
		//console.log("frameIdx", frameIdx)
		//console.log("timeOffset", timeOffset)
		//console.log("timePercent", timePercent)

		let basePosition = baseFrame.position;
		let nextPosition = nextFrame.position;

		// zero this._initialPos if age > baseFrame.duration - it wont be usefull anymore
		if (age > baseFrame.duration && this._initialPos) this._initialPos = null;
		// if frameIdx === 0 and there is a this._initialPos, use it as basePosition
		if (frameIdx === 0 && this._initialPos) basePosition = this._initialPos;

		// compute the result based on the linear interpolation between the two frames based on time offset within the frame
		let result = {};
		for (let property in baseFrame.position) {
			// check the property exists
			console.assert(nextPosition[property] !== undefined);
			console.assert(basePosition[property] !== undefined);
			// linear interpolation between the values
			let baseValue = basePosition[property];
			let nextValue = nextPosition[property];
			// define propertyTween for this property - default to linear interpolation
			let propertyTween = this._propertyTweens[property] || function (baseValue, nextValue, timePercent) {
				return (1 - timePercent) * baseValue + timePercent * nextValue;
			}
			// compute the actual result
			result[property] = propertyTween(baseValue, nextValue, timePercent);
		}
		// return the result
		return result;
	};

	//////////////////////////////////////////////////////////////////////////////////
	//										//
	//////////////////////////////////////////////////////////////////////////////////

	/**
	 * Start the animation
	*/
	start() {
		// update _startTime and _endTime
		this._totalTime = 0;
		this._keyframes.forEach((keyframe) => {
			keyframe._startTime = this._totalTime;
			this._totalTime += keyframe.duration;
			keyframe._endTime = this._totalTime;
		});

		// get this._initialPos from this._onCapture()
		// - the initial position is the position when the animation started.
		// - it will be used as basePosition during the first keyframe of the animation
		// - it is optional. the user may not define it
		this._initialPos = Object.create(this._keyframes[0].position)
		this._onCapture(this._initialPos);

		// init the loop callback
		let startDate = Date.now() / 1000;
		let duration = this.duration();
		this._$loopCb = () => {
			let age = Date.now() / 1000 - startDate;
			let position = this._buildPosition(age)
			this._onUpdate(position)
		}
		this._updateFcts.push(this._$loopCb)
	}

	/**
	 * test if the animation is running or not
	 * 
	 * @returns {boolean} return true if the animation is running, false otherwise
	*/
	isRunning() {
		return this._$loopCb ? true : false;
	};

	/**
	 * Stop the animation
	*/
	stop() {
		this._$loopCb && this._updateFcts.splice(this._updateFcts.indexOf(this._$loopCb), 1)
		this._$loopCb = null;
	}
}



