
const THREE = require('three')
const buildNameTag = require('./lib/nametag')
const buildChatBox = require('./lib/bubble')
const convert = require('./lib/skin.convert')

const remodel = require('./lib/remodel')
const remap = require('./lib/remap')

const FACE = {
	left: 0,
	right: 1,
	top: 2,
	bottom: 3,
	front: 4,
	back: 5
}

const defaultSkin = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFDUlEQVR42u2a20sUURzH97G0LKMotPuWbVpslj1olJXdjCgyisowsSjzgrB0gSKyC5UF1ZNQWEEQSBQ9dHsIe+zJ/+nXfM/sb/rN4ZwZ96LOrnPgyxzP/M7Z+X7OZc96JpEISfWrFhK0YcU8knlozeJKunE4HahEqSc2nF6zSEkCgGCyb+82enyqybtCZQWAzdfVVFgBJJNJn1BWFgC49/VpwGVlD0CaxQiA5HSYEwBM5sMAdKTqygcAG9+8coHKY/XXAZhUNgDYuBSPjJL/GkzVVhAEU5tqK5XZ7cnFtHWtq/TahdSw2l0HUisr1UKIWJQBAMehDuqiDdzndsP2EZECAG1ZXaWMwOCODdXqysLf++uXUGv9MhUHIByDOijjdiSAoH3ErANQD73C7TXXuGOsFj1d4YH4OTJAEy8y9Hd0mCaeZ5z8dfp88zw1bVyiYhCLOg1ZeAqC0ybaDttHRGME1DhDeVWV26u17lRAPr2+mj7dvULfHw2q65fhQRrLXKDfIxkau3ZMCTGIRR3URR5toU38HbaPiMwUcKfBAkoun09PzrbQ2KWD1JJaqswjdeweoR93rirzyCMBCmIQizqoizZkm2H7iOgAcHrMHbbV9KijkUYv7qOn55sdc4fo250e+vUg4329/Xk6QB/6DtOws+dHDGJRB3XRBve+XARt+4hIrAF4UAzbnrY0ve07QW8uHfB+0LzqanMM7qVb+3f69LJrD90/1axiEIs6qIs21BTIToewfcSsA+Bfb2x67OoR1aPPzu2i60fSNHRwCw221Suz0O3jO+jh6V1KyCMGse9721XdN5ePutdsewxS30cwuMjtC860T5JUKpXyKbSByUn7psi5l+juDlZYGh9324GcPKbkycaN3jUSAGxb46IAYPNZzW0AzgiQ5tVnzLUpUDCAbakMQXXrOtX1UMtHn+Q9/X5L4wgl7t37r85OSrx+TYl379SCia9KXjxRpiTjIZTBFOvrV1f8ty2eY/T7XJ81FQAwmA8ASH1ob68r5PnBsxA88/xAMh6SpqW4HRnLBrkOA9Xv5wPAZjAUgOkB+SHxgBgR0qSMh0zmZRsmwDJm1gFg2PMDIC8/nAHIMls8x8GgzOsG5WiaqREgYzDvpTwjLDy8NM15LpexDEA3LepjU8Z64my+8PtDCmUyRr+fFwA2J0eAFYA0AxgSgMmYBMZTwFQnO9RNAEaHOj2DXF5UADmvAToA2ftyxZYA5BqgmZZApDkdAK4mAKo8GzPlr8G8AehzMAyA/i1girUA0HtYB2CaIkUBEHQ/cBHSvwF0AKZFS5M0ZwMQtEaEAmhtbSUoDADH9ff3++QZ4o0I957e+zYAMt6wHkhzpjkuAcgpwNcpA7AZDLsvpwiuOkBvxygA6Bsvb0HlaeKIF2EbADZpGiGzBsA0gnwQHGOhW2snRpbpPexbAB2Z1oicAMQpTnGKU5ziFKc4xSlOcYpTnOIUpzgVmgo+XC324WfJAdDO/+ceADkCpuMFiFKbApEHkOv7BfzfXt+5gpT8V7rpfYJcDz+jAsB233r6yyBsJ0mlBCDofuBJkel4vOwBFPv8fyYAFPJ+wbSf/88UANNRVy4Awo6+Ig2gkCmgA5DHWjoA+X7AlM//owLANkX0w0359od++pvX8fdMAcj3/QJ9iJsAFPQCxHSnQt8vMJ3v2wCYpkhkAOR7vG7q4aCXoMoSgG8hFAuc/grMdAD4B/kHl9da7Ne9AAAAAElFTkSuQmCC'

function isAllAplha(context, x1, y1, x2, y2) {
	const h = Math.abs(y1 - y2);
	const w = Math.abs(x1 - x2);
	const imgData = context.getImageData(x1, y1, w, h)
	for (let y = 0; y < h; y++)
		for (let x = 0; x < w; x++) {
			const alpha = imgData.data[(x + y * w) * 4 + 3];
			if (alpha !== 0) return false;
		}
	return true;
}

class PlayerModel {
	constructor(option = {}) {
		let { skin, cape, isSlim } = option;

		this.remap = remap;
		this.remodel = remodel;

		const texture = new THREE.Texture(document.createElement('canvas'));
		console.log(texture.image)
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;
		this.texture = texture;
		texture.name = 'skinTexture'
		this.material = new THREE.MeshBasicMaterial({ map: texture });
		this.materialTran = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			depthWrite: false,
			side: THREE.DoubleSide
		})
		const capeTexture = new THREE.Texture(document.createElement('canvas'));
		capeTexture.magFilter = THREE.NearestFilter;
		capeTexture.minFilter = THREE.NearestFilter;
		this.capeTexture = capeTexture
		capeTexture.name = 'capeTexture'
		const capeMaterial = new THREE.MeshBasicMaterial({
			map: this.capeTexture
		})
		capeMaterial.name = 'capeMaterial'
		this.capeMaterial = capeMaterial;

		if (!skin) skin = defaultSkin;
		this.updateSkin(skin, isSlim)
		if (cape) this.updateCape(cape);
	}

	updateSkin(skin, isSlim) {
		isSlim = isSlim || false
		const texture = this.texture
		const needUpdate = this.slim == undefined || this.slim == null || this.slim !== isSlim;
		this.slim = isSlim;
		if (needUpdate) this.remodel()
		const reload = (img) => {
			let legacy = img.width !== img.height;
			const canvas = texture.image;
			const context = canvas.getContext('2d');
			canvas.width = img.width;
			canvas.height = img.width;
			context.clearRect(0, 0, img.width, img.width);
			if (legacy) {
				context.drawImage(img, 0, 0, img.width, img.width / 2.0);
				convert(context, img.width);
			} else {
				context.drawImage(img, 0, 0, img.width, img.width);
			}
			if (needUpdate) this.remap()
			texture.needsUpdate = true;
		}
		if (skin instanceof Image) {
			reload(skin);
			return;
		}
		const img = new Image();
		img.onload = () => { reload(img) }
		if (skin instanceof Buffer) {
			img.src = 'data:image/png;base64, ' + skin.toString('base64');
		} else if (typeof skin === 'string') {
			img.src = skin;
		}
		return this
	}
	updateCape(cape) {
		const texture = this.capeTexture;
		const reload = (img) => {
			texture.image = img
			texture.needsUpdate = true;
			this.remap('cape');
		}
		if (cape instanceof Image) {
			reload(cape);
			return;
		}
		const img = new Image();
		img.onload = () => { reload(img) };
		if (cape instanceof Buffer)
			img.src = 'data:image/png;base64, ' + skin.toString('base64');
		else if (typeof cape === 'string')
			img.src = cape;
		return this;
	}
	name(name) {
		if (name === undefined || name === '' || name === null) {
			if (this.nameTagObject === null) return
			this.root.remove(this.nameTagObject)
			this.nameTagObject = null
		}
		if (this.nameTagObject) this.clear()
		// build the texture
		var canvas = buildNameTag(name);
		var texture = new THREE.Texture(canvas)
		texture.needsUpdate = true
		// build the sprite itself
		var material = new THREE.SpriteMaterial({
			map: texture,
			// useScreenCoordinates: false
		});
		var sprite = new THREE.Sprite(material);
		this.nameTagObject = sprite
		sprite.position.y = 1.15
		// add sprite to the character
		this.root.add(this.nameTagObject)
		return this;
	}
	load(option) {
		if (!option) return;
		if (option.skin) { loadSkin(option.skin) }
		if (option.cape) { loadCape(option.skin) }
	}
	say(text, expire = 4) {
		expire = expire * 1000;
		if (this.speakExpire) {
			clearTimeout(this.speakExpire)
			this.root.remove(this.speakBox)
			this.speakBox = null
			this.speakExpire = null
		}
		this.speakExpire = setTimeout(() => {
			this.root.remove(this.speakBox)
			this.speakBox = null
			this.speakExpire = null
		}, expire)

		// build the texture
		var canvas = buildChatBox(text);
		var texture = new THREE.Texture(canvas)
		texture.needsUpdate = true
		// build the sprite itself
		var material = new THREE.SpriteMaterial({
			map: texture,
			// useScreenCoordinates: false
		});
		var sprite = new THREE.Sprite(material);
		this.speakBox = sprite
		sprite.scale.multiplyScalar(4)
		sprite.position.y = 1.5
		// add sprite to the character
		this.root.add(this.speakBox)
		return this;
	}
}

module.exports = PlayerModel 
