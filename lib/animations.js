const THREEx = require('./threex.minecraft')

class Animations {
	constructor() {
		this._animations = {};
		this._currentAnim = null;
		this._animationName = null;
	}
	destroy() {
		this._currentAnim && this._currentAnim.destroy();
	}
	/**
	 * Add an animation
	 *
	 * @param {String} name the name of the animation to add
	 * @param {THREEx.Animation} animation the THREEx.Animation to add
	*/
	add(name, animation) {
		console.assert(animation instanceof THREEx.Animation);
		this._animations[name] = animation;
		return this;	//
	}
	list() {
		return this._animations;
	}

	/**
	 * return the name of all animations
	 * 
	 * @returns {String[]} list of the animations names
	*/
	names() {
		return Object.keys(this._animations);
	}

	/**
	 * Start a animation. If an animation is already running, it is stopped
	 * 
	 * @param {string} animationName the name of the animation
	*/
	start(animationName) {
		// if this animation is already the current one, do nothing
		if (this._animationName === animationName) return this;
		// stop current animation
		if (this.isRunning()) this.stop();
		console.assert(this._animations[animationName] !== undefined, "unknown animation name: " + animationName)
		this._animationName = animationName;
		this._currentAnim = this._animations[animationName];
		this._currentAnim.start();
		return this;	// for chained API
	}

	/**
	 * test if an animation is running
	 * 
	 * @returns {boolean} true if an animation is running, false otherwise
	*/
	isRunning() {
		return this._currentAnim ? true : false;

	}

	/**
	 * rendering update function
	 */
	update(delta, now) {
		if (this.isRunning() === false) return
		this._currentAnim.update(delta, now)
	}
	animationName() {
		return this._animationName;
	}

	/**
	 * Stop the running animation if any
	*/
	stop() {
		this._currentAnim && this._currentAnim.destroy();
		this._currentAnim = null;
		this._animationName = null;
		return this;	// for chained API
	}
}
