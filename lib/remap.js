module.exports = function remap() {
    const texture = this.texture;
    const offset = texture.image.height - 32;

    let geometry
    geometry = this.head.geometry;
    this.mapUv(geometry, 0, 16, 24 + offset, 24, 16 + offset)	// left
    this.mapUv(geometry, 1, 0, 24 + offset, 8, 16 + offset)	// right
    this.mapUv(geometry, 2, 8, 32 + offset, 16, 24 + offset)	// top
    this.mapUv(geometry, 3, 16, 32 + offset, 24, 24 + offset)	// bottom
    this.mapUv(geometry, 4, 8, 24 + offset, 16, 16 + offset)	// front
    this.mapUv(geometry, 5, 24, 24 + offset, 32, 16 + offset)	// back

    geometry = this.helmet.geometry
    this.mapUv(geometry, 0, 48, 24 + offset, 56, 16 + offset)	// left
    this.mapUv(geometry, 1, 32, 24 + offset, 40, 16 + offset)	// right
    this.mapUv(geometry, 2, 40, 32 + offset, 48, 24 + offset)	// top
    this.mapUv(geometry, 3, 48, 32 + offset, 56, 24 + offset)	// bottom
    this.mapUv(geometry, 4, 40, 24 + offset, 48, 16 + offset)	// front
    this.mapUv(geometry, 5, 56, 24 + offset, 64, 16 + offset)	// back

    geometry = this.body.geometry
    this.mapUv(geometry, 0, 28, 12 + offset, 32, 0 + offset)	// left
    this.mapUv(geometry, 1, 16, 12 + offset, 20, 0 + offset)	// right
    this.mapUv(geometry, 2, 20, 16 + offset, 28, 12 + offset)	// top
    this.mapUv(geometry, 3, 28, 16 + offset, 32, 12 + offset)	// bottom
    this.mapUv(geometry, 4, 20, 12 + offset, 28, 0 + offset)	// front
    this.mapUv(geometry, 5, 32, 12 + offset, 40, 0 + offset)	// back

    if (this.cape) {
        geometry = this.cape.geometry
        console.log(geometry)
        this.mapUv(geometry, 0, 0, 16 + offset, 1, 0 + offset, 22, 17)	// left
        this.mapUv(geometry, 1, 10, 16 + offset, 11, 0 + offset, 22, 17)	// right
        this.mapUv(geometry, 2, 11, 17 + offset, 21, 16 + offset, 22, 17)	// top
        this.mapUv(geometry, 3, 1, 17 + offset, 11, 16 + offset, 22, 17)	// bottom
        this.mapUv(geometry, 4, 12, 16 + offset, 22, 0 + offset, 22, 17)	// front
        this.mapUv(geometry, 5, 1, 16 + offset, 11, 0 + offset, 22, 17)	// back
    }

    geometry = this.armR.geometry;
    this.mapUv(geometry, 0, 48, 12 + offset, 52, 0 + offset)	// right
    this.mapUv(geometry, 1, 40, 12 + offset, 44, 0 + offset)	// left
    this.mapUv(geometry, 2, 44, 16 + offset, 48, 12 + offset)	// top
    this.mapUv(geometry, 3, 48, 16 + offset, 52, 12 + offset)	// bottom
    this.mapUv(geometry, 4, 44, 12 + offset, 48, 0 + offset)	// front
    this.mapUv(geometry, 5, 52, 12 + offset, 56, 0 + offset)	// back

    geometry = this.armL.geometry;
    this.mapUv(geometry, 0, 44 + offset, 12, 40, 0 + offset)	// right
    this.mapUv(geometry, 1, 52 + offset, 12, 48, 0 + offset)	// left
    this.mapUv(geometry, 2, 44 + offset, 16, 48, 12 + offset)	// top
    this.mapUv(geometry, 3, 48 + offset, 16, 52, 12 + offset)	// bottom
    this.mapUv(geometry, 4, 48 + offset, 12, 44, 0 + offset)	// front
    this.mapUv(geometry, 5, 56 + offset, 12, 52, 0 + offset)	// back

    geometry = this.legR.geometry;
    this.mapUv(geometry, 0, 8 + offset, 12, 12, 0 + offset)	// right
    this.mapUv(geometry, 1, 0 + offset, 12, 4, 0 + offset)	// left
    this.mapUv(geometry, 2, 4 + offset, 16, 8, 12 + offset)	// top
    this.mapUv(geometry, 3, 8 + offset, 16, 12, 12 + offset)	// bottom
    this.mapUv(geometry, 4, 4 + offset, 12, 8, 0 + offset)	// front
    this.mapUv(geometry, 5, 12 + offset, 12, 16, 0 + offset)	// back

    geometry = this.legL.geometry;
    this.mapUv(geometry, 0, 4, 12 + offset, 0, 0 + offset)	// left
    this.mapUv(geometry, 1, 12, 12 + offset, 8, 0 + offset)	// right
    this.mapUv(geometry, 2, 8, 16 + offset, 4, 12 + offset)	// top
    this.mapUv(geometry, 3, 12, 16 + offset, 8, 12 + offset)	// bottom
    this.mapUv(geometry, 4, 8, 12 + offset, 4, 0 + offset)	// front
    this.mapUv(geometry, 5, 16, 12 + offset, 12, 0 + offset)	// back
}