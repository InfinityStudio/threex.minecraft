const format = require('./skin.format')

module.exports = function remap(type) {
    const legacy = this.texture.image.height !== this.texture.image.width;
    const model = this.slim ? format.alex : format.steve;
    const mapUv = (mesh, faceIdx, x1, y1, x2, y2) => {
        const geometry = mesh.geometry;
        const texture = mesh.material.map;
        const tileUvW = 1 / texture.image.width;
        const tileUvH = 1 / texture.image.height;
        let UVs = geometry.faceVertexUvs[0][faceIdx * 2];
        x1 *= tileUvW;
        x2 *= tileUvW;
        y1 = 1 - (y1 * tileUvH);
        y2 = 1 - (y2 * tileUvH);
        UVs[0].x = x1; UVs[0].y = y1;
        UVs[1].x = x1; UVs[1].y = y2;
        UVs[2].x = x2; UVs[2].y = y1;
        UVs = geometry.faceVertexUvs[0][faceIdx * 2 + 1];
        UVs[0].x = x1; UVs[0].y = y2;
        UVs[1].x = x2; UVs[1].y = y2;
        UVs[2].x = x2; UVs[2].y = y1;
    }
    const order = ['left', 'right', 'top', 'bottom', 'front', 'back']
    // let obj = {}
    const map = (mesh, src) => {
        for (let i = 0; i < order.length; i++) {
            const posArr = src[order[i]];
            mapUv(mesh, i, posArr[0], posArr[1], posArr[2], posArr[3]);
            // obj[mesh.name] = mesh.geometry.faceVertexUvs[0]
        }
    }
    if (type === 'cape') {
        if (this[type])
            map(this[type], model[type])
    } else for (const key of Object.keys(model).filter(k => k !== 'cape')) {
        if (this[key])
            // if (legacy && (key === 'leftArm' || key === 'leftLeg'))
            // map(this[key], model[key.replace('left', 'right')])
            // else
            map(this[key], model[key]);
        if (!legacy && this[`${key}Layer`])
            map(this[`${key}Layer`], model[key].layer);
    }
    // console.log(JSON.stringify(obj))
}