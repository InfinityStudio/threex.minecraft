
const THREE = require('three')
const buildNameTag = require('./lib/nametag')
const buildChatBox = require('./lib/bubble')
const FACE = {
	left: 0,
	right: 1,
	top: 2,
	bottom: 3,
	front: 4,
	back: 5
}

// const defaultSkin = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAMAAACVQ462AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAHxALIxcJJBgIJBgKJhgLJhoKJxsLJhoMKBsKKBsLKBoNKBwLKRwMKh0NKx4NKx4OLR0OLB4OLx8PLB4RLyANLSAQLyIRMiMQMyQRNCUSOigUPyoVKCgoPz8/JiFbMChyAFtbAGBgAGhoAH9/Qh0KQSEMRSIOQioSUigmUTElYkMvbUMqb0UsakAwdUcvdEgvek4za2trOjGJUj2JRjqlVknMAJmZAJ6eAKioAK+vAMzMikw9gFM0hFIxhlM0gVM5g1U7h1U7h1g6ilk7iFo5j14+kF5Dll9All9BmmNEnGNFnGNGmmRKnGdIn2hJnGlMnWpPlm9bnHJcompHrHZaqn1ms3titXtnrYBttIRttolsvohst4Jyu4lyvYtyvY5yvY50xpaA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPSUN6AAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAKjSURBVEhLpZSLVtNAEIYLpSlLSUITLCBaGhNBQRM01M2mSCoXNUURIkZFxQvv/wz6724Wij2HCM7J6UyS/b+dmZ208rsww6jiqo4FhannZb5yDqjaNgDVwE/8JAmCMqF6fwGwbU0CKjD/+oAq9jcM27gxAFpNQxU3Bwi9Ajy8fgmGZuvaGAcIuwFA12CGce1jJESr6/Ot1i3Tnq5qptFqzet1jRA1F2XHWQFAs3RzwTTNhQd3rOkFU7c0DijmohRg1TR9ZmpCN7/8+PX954fb+sTUjK7VLKOYi1IAaTQtUrfm8pP88/vTw8M5q06sZoOouSgHEDI5vrO/eHK28el04yxf3N8ZnyQooZiLfwA0arNb6d6bj998/+vx8710a7bW4E2Uc1EKsEhz7WiQBK9eL29urrzsB8ngaK1JLDUXpYAkGSQH6e7640fL91dWXjxZ33138PZggA+Sz0WQlAL4gmewuzC1uCenqXevMPWc9XrMX/VXh6Hicx4ByHEeAfRg/wtgSMAvz+CKEkYAnc5SpwuD4z70PM+hUf+4348ixF7EGItjxmQcCx/Dzv/SOkuXAF3PdT3GIujjGLELNYwxhF7M4oi//wsgdlYZdMXCmEUUSsSu0OOBACMoBTiu62BdRPEjYxozXFyIpK7IAE0IYa7jOBRqGlOK0BFq3Kdpup3DthFwP9QDlBCGKEECoHEBEDLAXHAQMQnI8jwFYRQw3AMOQAJoOADoAVcDAh0HZAKQZUMZdC43kdeqAPwUBEsC+M4cIEq5KEEBCl90mR8CVR3nxwCdBBS9OAe020UGnXb7KcxzPY9SXoEEIBZtgE7UDgBKyLMhgBS2YdzjMJb4XHRDAPiQhSGjNOxKQIZTgC8BiMECgarxprjjO0OXiV4MAf4A/x0nbcyiS5EAAAAASUVORK5CYII='
const defaultSkin = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFDUlEQVR42u2a20sUURzH97G0LKMotPuWbVpslj1olJXdjCgyisowsSjzgrB0gSKyC5UF1ZNQWEEQSBQ9dHsIe+zJ/+nXfM/sb/rN4ZwZ96LOrnPgyxzP/M7Z+X7OZc96JpEISfWrFhK0YcU8knlozeJKunE4HahEqSc2nF6zSEkCgGCyb+82enyqybtCZQWAzdfVVFgBJJNJn1BWFgC49/VpwGVlD0CaxQiA5HSYEwBM5sMAdKTqygcAG9+8coHKY/XXAZhUNgDYuBSPjJL/GkzVVhAEU5tqK5XZ7cnFtHWtq/TahdSw2l0HUisr1UKIWJQBAMehDuqiDdzndsP2EZECAG1ZXaWMwOCODdXqysLf++uXUGv9MhUHIByDOijjdiSAoH3ErANQD73C7TXXuGOsFj1d4YH4OTJAEy8y9Hd0mCaeZ5z8dfp88zw1bVyiYhCLOg1ZeAqC0ybaDttHRGME1DhDeVWV26u17lRAPr2+mj7dvULfHw2q65fhQRrLXKDfIxkau3ZMCTGIRR3URR5toU38HbaPiMwUcKfBAkoun09PzrbQ2KWD1JJaqswjdeweoR93rirzyCMBCmIQizqoizZkm2H7iOgAcHrMHbbV9KijkUYv7qOn55sdc4fo250e+vUg4329/Xk6QB/6DtOws+dHDGJRB3XRBve+XARt+4hIrAF4UAzbnrY0ve07QW8uHfB+0LzqanMM7qVb+3f69LJrD90/1axiEIs6qIs21BTIToewfcSsA+Bfb2x67OoR1aPPzu2i60fSNHRwCw221Suz0O3jO+jh6V1KyCMGse9721XdN5ePutdsewxS30cwuMjtC860T5JUKpXyKbSByUn7psi5l+juDlZYGh9324GcPKbkycaN3jUSAGxb46IAYPNZzW0AzgiQ5tVnzLUpUDCAbakMQXXrOtX1UMtHn+Q9/X5L4wgl7t37r85OSrx+TYl379SCia9KXjxRpiTjIZTBFOvrV1f8ty2eY/T7XJ81FQAwmA8ASH1ob68r5PnBsxA88/xAMh6SpqW4HRnLBrkOA9Xv5wPAZjAUgOkB+SHxgBgR0qSMh0zmZRsmwDJm1gFg2PMDIC8/nAHIMls8x8GgzOsG5WiaqREgYzDvpTwjLDy8NM15LpexDEA3LepjU8Z64my+8PtDCmUyRr+fFwA2J0eAFYA0AxgSgMmYBMZTwFQnO9RNAEaHOj2DXF5UADmvAToA2ftyxZYA5BqgmZZApDkdAK4mAKo8GzPlr8G8AehzMAyA/i1girUA0HtYB2CaIkUBEHQ/cBHSvwF0AKZFS5M0ZwMQtEaEAmhtbSUoDADH9ff3++QZ4o0I957e+zYAMt6wHkhzpjkuAcgpwNcpA7AZDLsvpwiuOkBvxygA6Bsvb0HlaeKIF2EbADZpGiGzBsA0gnwQHGOhW2snRpbpPexbAB2Z1oicAMQpTnGKU5ziFKc4xSlOcYpTnOIUpzgVmgo+XC324WfJAdDO/+ceADkCpuMFiFKbApEHkOv7BfzfXt+5gpT8V7rpfYJcDz+jAsB233r6yyBsJ0mlBCDofuBJkel4vOwBFPv8fyYAFPJ+wbSf/88UANNRVy4Awo6+Ig2gkCmgA5DHWjoA+X7AlM//owLANkX0w0359od++pvX8fdMAcj3/QJ9iJsAFPQCxHSnQt8vMJ3v2wCYpkhkAOR7vG7q4aCXoMoSgG8hFAuc/grMdAD4B/kHl9da7Ne9AAAAAElFTkSuQmCC'

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
function head() {
	toSkinVertices(8, 0, 16, 8),
		toSkinVertices(16, 0, 24, 8),
		toSkinVertices(0, 8, 8, 16),
		toSkinVertices(8, 8, 16, 16),
		toSkinVertices(16, 8, 24, 16),
		toSkinVertices(24, 8, 32, 16)
}

const remodel = require('./lib/remodel')
const remap = require('./lib/remap')
class CharacterModel {
	mapUv(geometry, faceIdx, x1, y1, x2, y2) {
		const tileUvW = 1 / this.texture.image.width
		const tileUvH = 1 / this.texture.image.height
		let UVs = geometry.faceVertexUvs[0][faceIdx * 2];
		UVs[0].x = x1 * tileUvW; UVs[0].y = y1 * tileUvH;
		UVs[1].x = x1 * tileUvW; UVs[1].y = y2 * tileUvH;
		UVs[2].x = x2 * tileUvW; UVs[2].y = y1 * tileUvH;
		UVs = geometry.faceVertexUvs[0][faceIdx * 2 + 1];
		UVs[0].x = x1 * tileUvW; UVs[0].y = y2 * tileUvH;
		UVs[1].x = x2 * tileUvW; UVs[1].y = y2 * tileUvH;
		UVs[2].x = x2 * tileUvW; UVs[2].y = y1 * tileUvH;
	}
	constructor(option = {}) {
		const { skin, cape, isSlim } = option;
		this.remap = remap;
		this.remodel = remodel;
		//////////////////////////////////////////////////////////////////////////////////
		//		skin texture								//
		//////////////////////////////////////////////////////////////////////////////////	
		const texture = new THREE.Texture();
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;
		this.texture = texture;
		this.material = new THREE.MeshBasicMaterial({ map: texture });
		this.materialTran = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			depthWrite: false,
			side: THREE.DoubleSide
		})

		if (!skin) this.updateSkin(defaultSkin)
		else this.updateSkin(skin)

		if (cape) this.updateCape(cape);
		this.remodel(cape, isSlim || false)
	}

	updateSkin(skin) {
		const texture = this.texture
		const img = new Image();
		const reload = () => {
			texture.image = img;
			texture.needsUpdate = true;
			if (texture.image.heigth !== img.height)
				this.remap()
		}
		img.onload = reload
		if (skin instanceof Buffer) {
			img.src = 'data:image/png;base64, ' + skin.toString('base64');
		} else if (typeof skin === 'string') {
			if (!skin.startsWith('data:image/png;base64,'))
				skin = 'data:image/png;base64, ' + skin
			img.src = skin;
		}
		return this
	}
	updateCape(cape) {
		if (!this.capeTexture) {
			const capeTexture = new THREE.Texture();
			capeTexture.magFilter = THREE.NearestFilter;
			capeTexture.minFilter = THREE.NearestFilter;
			this.capeTexture = capeTexture
		}
		if (!this.capeMaterial) {
			const capeMaterial = new THREE.MeshBasicMaterial({
				map: this.capeTexture
			})
			this.capeMaterial = capeMaterial;
		}
		const texture = this.capeTexture;
		if (cape instanceof Buffer) {
			const img = new Image();
			img.onload = () => {
				texture.image = img;
				texture.needsUpdate = true;
			}
			img.src = 'data:image/png;base64, ' + skin.toString('base64');
		} else if (skin instanceof Image) {
			texture.image = cape
			texture.needsUpdate = true;
		}
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
			useScreenCoordinates: false
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
	say(text, expire = 10) {
		expire = expire * 1000;
		if (this.speakExpire) {
			clearTimeout(this.speakExpire)
			this.root.remove(this.speakBox)
			this.speakBox = null
			this.speakExpire = null
		}
		this.speakExpire = setTimeout(expire, () => {
			this.root.remove(this.speakBox)
			this.speakBox = null
			this.speakExpire = null
		})

		// build the texture
		var canvas = buildChatBox(text);
		var texture = new THREE.Texture(canvas)
		texture.needsUpdate = true
		// build the sprite itself
		var material = new THREE.SpriteMaterial({
			map: texture,
			useScreenCoordinates: false
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

exports.PlayerModel = CharacterModel 
