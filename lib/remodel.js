const THREE = require('three')
const format = require('./skin.format')
module.exports = function remodel() {
    if (!this.root) {
        this.root = new THREE.Object3D();
        const template = this.slim ? format.alex : format.steve;
        const partsNames = Object.keys(template);
        for (const pname of partsNames) {
            const model = template[pname];
            const skinMesh = new THREE.Mesh(new THREE.CubeGeometry(model.w,
                model.h, model.d),
                pname === 'cape' ? this.capeMaterial : this.material)
            skinMesh.name = pname
            const box = new THREE.BoxHelper(skinMesh, 0xffffff)
            box.name = `${pname}Box`;
            this[box.name] = box;
            box.visible = false;
            skinMesh.add(box);
            this[skinMesh.name] = skinMesh;
            this.root.add(skinMesh);
            if (model.y) skinMesh.position.y = model.y;
            if (model.x) skinMesh.position.x = model.x;
            if (model.z) skinMesh.position.z = model.z;

            if (pname === 'cape') {
                skinMesh.rotation.x = 25 * (Math.PI / 180);
            }
            const layer = model.layer;
            if (layer) {
                const layerMesh = new THREE.Mesh(new THREE.CubeGeometry(layer.w,
                    layer.h, layer.d),
                    this.materialTran)
                layerMesh.name = `${pname}Layer`
                this[layerMesh.name] = layerMesh;
                skinMesh.add(layerMesh);
                if (layer.y) layerMesh.position.y = layer.y;
                if (layer.x) layerMesh.position.x = layer.x;
                if (layer.z) layerMesh.position.z = layer.z;
            }
        }
    } else {
        const template = this.slim ? format.alex : format.steve;
        for (const key of ['rightArm', 'leftArm']) {
            let model = template[key];
            this[key].geometry = new THREE.CubeGeometry(model.w, model.h, model.d);
            model = model.layer;
            this[`${key}Layer`].geometry = new THREE.CubeGeometry(model.w, model.h, model.d);;
        }
    }
}