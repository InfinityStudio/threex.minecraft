const THREE = require('three')
module.exports = function remodel(cape, isSlim = false) {
    if (this.slim === isSlim)
        return
    this.slim = isSlim;
    const pixRatio = 1 / 32;
    const charH = 1;
    const sizes = {
        headH: 8, helmetH: 9,
        headW: 8, helmetW: 9,
        headD: 8, helmetD: 9,

        bodyH: 12, bodyOverH: 13.5,
        bodyW: 8, bodyOverW: 9,
        bodyD: 4, bodyOverD: 4.5,

        capeH: 16,
        capeW: 10,
        capeD: 1,

        legH: 12, legOverH: 13.5,
        legW: 4, legOverW: 4.5,
        legD: 4, legOverD: 4.5,

        armH: 12, armOverH: 13.5,
        armW: (isSlim ? 3 : 4), armOverW: (isSlim ? 3.375 : 4.5),
        armD: 4, armOverD: 4.5,
    };
    Object.keys(sizes).forEach(k => sizes[k] = sizes[k] * pixRatio)
    if (!this.root) {
        this.root = new THREE.Object3D();

        this.headGroup = new THREE.Object3D()
        this.headGroup.position.y = charH - sizes.headH
        this.root.add(this.headGroup)

        // build model.head
        const mesh = new THREE.Mesh(new THREE.CubeGeometry(sizes.headW, sizes.headH, sizes.headD),
            this.material)
        mesh.position.y = sizes.headH / 2
        this.head = mesh
        this.headGroup.add(this.head)


        // build model.helmet
        this.helmet = new THREE.Mesh(new THREE.CubeGeometry(sizes.helmetH, sizes.helmetH, sizes.helmetH),
            this.materialTran)
        this.headGroup.add(this.helmet)
        this.helmet.position.y = sizes.headH / 2


        // build model.body
        this.body = new THREE.Mesh(new THREE.CubeGeometry(sizes.bodyW, sizes.bodyH, sizes.bodyD),
            this.material)
        this.root.add(this.body)
        this.body.position.y = sizes.legH + sizes.bodyH / 2

        // build model.cape
        if (cape) {
            this.cape = new THREE.Mesh(new THREE.BoxGeometry(sizes.capeW, sizes.capeH, sizes.capeD),
                this.capeMaterial)
            this.root.add(this.cape)
            this.cape.position.y = sizes.legH + sizes.bodyH / 2
            this.cape.position.z = -sizes.bodyW / 3 * 2
            this.cape.rotateX(0.3)
        }

        // build model.legR
        this.legR = new THREE.Mesh(new THREE.CubeGeometry(sizes.legW, sizes.legH, sizes.legD)
            .applyMatrix(new THREE.Matrix4().makeTranslation(0, -sizes.legH / 2, 0)),
            this.material)
        this.root.add(this.legR)
        this.legR.position.x = -sizes.legW / 2
        this.legR.position.y = sizes.legH


        // build model.legL
        this.legL = new THREE.Mesh(new THREE.CubeGeometry(sizes.legW, sizes.legH, sizes.legD)
            .applyMatrix(new THREE.Matrix4().makeTranslation(0, -sizes.legH / 2, 0)),
            this.material)
        this.root.add(this.legL)
        this.legL.position.x = sizes.legW / 2
        this.legL.position.y = sizes.legH
    }
    // build model.armR
    if (this.armR) this.root.remove(this.armR)
    this.armR = new THREE.Mesh(new THREE.CubeGeometry(sizes.armW, sizes.armH, sizes.armD)
        .applyMatrix(new THREE.Matrix4().makeTranslation(0, -sizes.armH / 2 + sizes.armW / 2, 0)),
        this.material)
    this.root.add(this.armR)
    this.armR.position.x = -sizes.bodyW / 2 - sizes.armW / 2
    this.armR.position.y = sizes.legH + sizes.bodyH - sizes.armW / 2

    // build model.armL
    if (this.armL) this.root.remove(this.armL)
    this.armL = new THREE.Mesh(new THREE.CubeGeometry(sizes.armW, sizes.armH, sizes.armD)
        .applyMatrix(new THREE.Matrix4().makeTranslation(0, -sizes.armH / 2 + sizes.armW / 2, 0)),
        this.material)
    this.root.add(this.armL)
    this.armL.position.x = sizes.bodyW / 2 + sizes.armW / 2
    this.armL.position.y = sizes.legH + sizes.bodyH - sizes.armW / 2
}