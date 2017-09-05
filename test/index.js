
const THREE = require('three')
const PlayerModel = require('../index')
var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true, alpha: true });
// renderer.setClearColor('#FFF', 0)
// gl.clear(gl.COLOR_BUFFER_BIT);
var onRenderFcts = [];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, 600 / 800, 0.5, 5);
camera.position.z = 3;
renderer.setClearColor(0xdddddd);
const miku = 'data:image/png;base64, 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'
const cape = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB98KBgsrL5GTbPYAAAO0SURBVGje7ZhRb9tUFMd/x4ldJ3W2rmNDpXSh1GopmjYRaS/wtkfEA4I3vkE/AS/srS98EcQLEkj7ApMmXhAIpkmlI10o1ZZtsHZrEje1E18eEjt2GmjT2iETOVFkX9/r63v+53/+99iilFJfzy3xV7NBw3N5jCJqbyBM6wavmdP89uJPTmK3DvYRETnJ2G/ml2MPfNb2eKRrYXt9Z+tE8wAopRRDWvZLa5aPL72JUZjldvUhNkKtC0IBIW9McfPiPK53yHZmj99b7rGTrpnWsOvg00cPhP/AsgCbtT1WChf4aO5tblcfho477mHo/GZtL7ypisLTBKGzZtUFLGgv+Gpox/uZ0M+IYZgwNABFfYqfn1d5rhSfFN+NDfhue4OLIrwzfZ6NZgOAlqYRrkZAlKC6v7PaakaPtYvuITfaPh+ef129//KppAKAaeax2y2uuE3u/vErADnDRM9k+cCaodVuDcq4MOY+Kox+r2/4FAhYoOtGeD2PhXNQxzBMvk8BhGxwYk2fo+772IBVmAGg2XTCPgBqu5Fbu/RXoInQkx+VyMLs8k8AbBSvpqoB2j91NJsOppnnerV8vPrGWpKI82W7RNkusbp9n3zOGg0AVmEGqzBDvfYixoDjXJdI+yw68KztHbkWZUCQBomnQBDtlcq9WOcvczabi9dYqdxjc/Ha0btFwvCLgK8CVTjbGst2KUyBsl3C89zUGJAFaLVbR5wHYvSPs6EngFHGJ+F8FISo5XMdMUwFgH6LRnsQMNDZ9hzdIOe6aLGi7/QgBBWg57noujESFmj/5rzj1AZSXwQcQ0ekV/z0F6FfLCwNjcL6zpbccZ0jQhgAkYYODNwFHKfWoV2+EGrB4Nq7A0ZDzyIpFrJBOqSxG2gAB8qPOR84HgWjHhkTZULnqIWMaOiZMy0oSIMg8tHop5YCeqT8fO9pBYDZC5dDFvTXAg29Ix2+Ut1zRfgiliAVghTorw4TF0FPKSrLN1h88ENM+C5FtsN45LuZ39kMQucdQ0f5fiILC4Qw7aowC5CbypEx8zy+fpO2UtSdfaz8ud7LTr5AruVCvVMgLTfT25fXd7aEhSX1mZgxMQRY3b7Pj5ffShaAz+u7xw5a6B5LQ0x864qdODhpMEBjDG3e88M0SFsMxxKAtScV+Uo1Y5HfKF4dXSU4Niww4OX+bqrP0cYVgLUnFbnjOnxrZnHdZuyfpMlpvqSeaGKRkX/kPI0vY8uAUdkEgP87AKlpwIQBEwAmAEwAmADwCtjfoQqR5ngm/9sAAAAASUVORK5CYII='
const steve = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAMAAACVQ462AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAHxALIxcJJBgIJBgKJhgLJhoKJxsLJhoMKBsKKBsLKBoNKBwLKRwMKh0NKx4NKx4OLR0OLB4OLx8PLB4RLyANLSAQLyIRMiMQMyQRNCUSOigUPyoVKCgoPz8/JiFbMChyAFtbAGBgAGhoAH9/Qh0KQSEMRSIOQioSUigmUTElYkMvbUMqb0UsakAwdUcvdEgvek4za2trOjGJUj2JRjqlVknMAJmZAJ6eAKioAK+vAMzMikw9gFM0hFIxhlM0gVM5g1U7h1U7h1g6ilk7iFo5j14+kF5Dll9All9BmmNEnGNFnGNGmmRKnGdIn2hJnGlMnWpPlm9bnHJcompHrHZaqn1ms3titXtnrYBttIRttolsvohst4Jyu4lyvYtyvY5yvY50xpaA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPSUN6AAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAKjSURBVEhLpZSLVtNAEIYLpSlLSUITLCBaGhNBQRM01M2mSCoXNUURIkZFxQvv/wz6724Wij2HCM7J6UyS/b+dmZ208rsww6jiqo4FhannZb5yDqjaNgDVwE/8JAmCMqF6fwGwbU0CKjD/+oAq9jcM27gxAFpNQxU3Bwi9Ajy8fgmGZuvaGAcIuwFA12CGce1jJESr6/Ot1i3Tnq5qptFqzet1jRA1F2XHWQFAs3RzwTTNhQd3rOkFU7c0DijmohRg1TR9ZmpCN7/8+PX954fb+sTUjK7VLKOYi1IAaTQtUrfm8pP88/vTw8M5q06sZoOouSgHEDI5vrO/eHK28el04yxf3N8ZnyQooZiLfwA0arNb6d6bj998/+vx8710a7bW4E2Uc1EKsEhz7WiQBK9eL29urrzsB8ngaK1JLDUXpYAkGSQH6e7640fL91dWXjxZ33138PZggA+Sz0WQlAL4gmewuzC1uCenqXevMPWc9XrMX/VXh6Hicx4ByHEeAfRg/wtgSMAvz+CKEkYAnc5SpwuD4z70PM+hUf+4348ixF7EGItjxmQcCx/Dzv/SOkuXAF3PdT3GIujjGLELNYwxhF7M4oi//wsgdlYZdMXCmEUUSsSu0OOBACMoBTiu62BdRPEjYxozXFyIpK7IAE0IYa7jOBRqGlOK0BFq3Kdpup3DthFwP9QDlBCGKEECoHEBEDLAXHAQMQnI8jwFYRQw3AMOQAJoOADoAVcDAh0HZAKQZUMZdC43kdeqAPwUBEsC+M4cIEq5KEEBCl90mR8CVR3nxwCdBBS9OAe020UGnXb7KcxzPY9SXoEEIBZtgE7UDgBKyLMhgBS2YdzjMJb4XHRDAPiQhSGjNOxKQIZTgC8BiMECgarxprjjO0OXiV4MAf4A/x0nbcyiS5EAAAAASUVORK5CYII='
const nsteve = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFDUlEQVR42u2a20sUURzH97G0LKMotPuWbVpslj1olJXdjCgyisowsSjzgrB0gSKyC5UF1ZNQWEEQSBQ9dHsIe+zJ/+nXfM/sb/rN4ZwZ96LOrnPgyxzP/M7Z+X7OZc96JpEISfWrFhK0YcU8knlozeJKunE4HahEqSc2nF6zSEkCgGCyb+82enyqybtCZQWAzdfVVFgBJJNJn1BWFgC49/VpwGVlD0CaxQiA5HSYEwBM5sMAdKTqygcAG9+8coHKY/XXAZhUNgDYuBSPjJL/GkzVVhAEU5tqK5XZ7cnFtHWtq/TahdSw2l0HUisr1UKIWJQBAMehDuqiDdzndsP2EZECAG1ZXaWMwOCODdXqysLf++uXUGv9MhUHIByDOijjdiSAoH3ErANQD73C7TXXuGOsFj1d4YH4OTJAEy8y9Hd0mCaeZ5z8dfp88zw1bVyiYhCLOg1ZeAqC0ybaDttHRGME1DhDeVWV26u17lRAPr2+mj7dvULfHw2q65fhQRrLXKDfIxkau3ZMCTGIRR3URR5toU38HbaPiMwUcKfBAkoun09PzrbQ2KWD1JJaqswjdeweoR93rirzyCMBCmIQizqoizZkm2H7iOgAcHrMHbbV9KijkUYv7qOn55sdc4fo250e+vUg4329/Xk6QB/6DtOws+dHDGJRB3XRBve+XARt+4hIrAF4UAzbnrY0ve07QW8uHfB+0LzqanMM7qVb+3f69LJrD90/1axiEIs6qIs21BTIToewfcSsA+Bfb2x67OoR1aPPzu2i60fSNHRwCw221Suz0O3jO+jh6V1KyCMGse9721XdN5ePutdsewxS30cwuMjtC860T5JUKpXyKbSByUn7psi5l+juDlZYGh9324GcPKbkycaN3jUSAGxb46IAYPNZzW0AzgiQ5tVnzLUpUDCAbakMQXXrOtX1UMtHn+Q9/X5L4wgl7t37r85OSrx+TYl379SCia9KXjxRpiTjIZTBFOvrV1f8ty2eY/T7XJ81FQAwmA8ASH1ob68r5PnBsxA88/xAMh6SpqW4HRnLBrkOA9Xv5wPAZjAUgOkB+SHxgBgR0qSMh0zmZRsmwDJm1gFg2PMDIC8/nAHIMls8x8GgzOsG5WiaqREgYzDvpTwjLDy8NM15LpexDEA3LepjU8Z64my+8PtDCmUyRr+fFwA2J0eAFYA0AxgSgMmYBMZTwFQnO9RNAEaHOj2DXF5UADmvAToA2ftyxZYA5BqgmZZApDkdAK4mAKo8GzPlr8G8AehzMAyA/i1girUA0HtYB2CaIkUBEHQ/cBHSvwF0AKZFS5M0ZwMQtEaEAmhtbSUoDADH9ff3++QZ4o0I957e+zYAMt6wHkhzpjkuAcgpwNcpA7AZDLsvpwiuOkBvxygA6Bsvb0HlaeKIF2EbADZpGiGzBsA0gnwQHGOhW2snRpbpPexbAB2Z1oicAMQpTnGKU5ziFKc4xSlOcYpTnOIUpzgVmgo+XC324WfJAdDO/+ceADkCpuMFiFKbApEHkOv7BfzfXt+5gpT8V7rpfYJcDz+jAsB233r6yyBsJ0mlBCDofuBJkel4vOwBFPv8fyYAFPJ+wbSf/88UANNRVy4Awo6+Ig2gkCmgA5DHWjoA+X7AlM//owLANkX0w0359od++pvX8fdMAcj3/QJ9iJsAFPQCxHSnQt8vMJ3v2wCYpkhkAOR7vG7q4aCXoMoSgG8hFAuc/grMdAD4B/kHl9da7Ne9AAAAAElFTkSuQmCC'


const skins = [miku, steve, nsteve]
document.getElementById('img').src = miku;
var character = new PlayerModel({ skin: miku, cape, isSlim: true })
character.root.translateY(-0.5)
scene.add(character.root)
camera.lookAt(new THREE.Vector3(0, 0, 0))

let idx = 0;
document.body.onclick = function (e) {
    idx = (idx + 1) % skins.length;
    let sk = skins[idx]
    document.getElementById('img').src = sk;
    character.updateSkin(sk, idx == 0)
}
character.root.rotation.x = 0.8
document.body.onkeydown = function (e) {
    if (e.keyCode === 'x'.charCodeAt(0)) {
        character.root.rotation.x = -character.root.rotation.x;
    }
}


// let mouse = new THREE.Vector2();
// window.addEventListener('mousemove', function (event) {
//     mouse.x = (event.clientX / 600) * 2 - 1;
//     mouse.y = - (event.clientY / 800) * 2 + 1;
// }, false);

// let intersected;

requestAnimationFrame(function animate(nowMsec) {
    // keep looping
    requestAnimationFrame(animate);
    // measure time
    // controls.update()
    // raytrace.setFromCamera(mouse, camera)
    // let intersects = raytrace.intersectObjects(character.root.children, true);
    // if (intersects.length > 0) {
    //     let current;
    //     for (let i = 0; i < intersects.length; i++) {
    //         current = intersects[i];
    //         if (!current instanceof THREE.BoxHelper &&
    //             !current.object.name.endsWith('Layer') &&
    //             !current.object.name.endsWith('Box')) break;
    //     }
    //     if (current && !(current.object instanceof THREE.Sprite)) {
    //         if (intersected === undefined ||
    //             (current.uuid !== intersected.uuid)) {
    //             if (intersected) {
    //                 const name = intersected.name
    //                 if (character[`${name}Box`]) {
    //                     character[`${name}Box`].visible = false;
    //                 }
    //             }
    //             intersected = current
    //             console.log(intersected.object.name)
    //             const name = intersected.name
    //             if (character[`${name}Box`]) {
    //                 console.log('box')
    //                 character[`${name}Box`].visible = true;
    //             }
    //         }
    //     }
    // } else {
    //     if (intersected) {
    //         const name = intersected.name
    //         if (character[`${name}Box`]) {
    //             character[`${name}Box`].visible = true;
    //         }
    //     }
    //     intersected = undefined;
    // }
    renderer.render(scene, camera);

    character.root.rotation.y += 0.01;
})

