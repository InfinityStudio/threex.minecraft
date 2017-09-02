exports.steve = {
    head:
    {
        top: [8, 0, 16, 8],
        bottom: [16, 0, 24, 8],
        right: [0, 8, 8, 16],
        front: [8, 8, 16, 16],
        left: [16, 8, 24, 16],
        back: [24, 8, 32, 16]
    },
    helm:
    {
        top: [40, 0, 48, 8],
        bottom: [48, 0, 56, 8],
        right: [32, 8, 40, 16],
        front: [40, 8, 48, 16],
        left: [48, 8, 56, 16],
        back: [56, 8, 64, 16]
    },
    rightLeg:
    {
        top: [4, 16, 8, 20],
        bottom: [8, 16, 12, 20],
        right: [0, 20, 4, 32],
        front: [4, 20, 8, 32],
        left: [8, 20, 12, 32],
        back: [12, 20, 16, 32]
    },
    torso:
    {
        top: [20, 16, 28, 20],
        bottom: [28, 16, 36, 20],
        right: [16, 20, 20, 32],
        front: [20, 20, 28, 32],
        left: [28, 20, 32, 32],
        back: [32, 20, 40, 32]
    },
    rightArm:
    {
        top: [44, 16, 48, 20],
        bottom: [48, 16, 52, 20],
        right: [40, 20, 44, 32],
        front: [44, 20, 48, 32],
        left: [48, 20, 52, 32],
        back: [52, 20, 56, 32]
    },
    leftLeg:
    {
        top: [20, 48, 24, 52],
        bottom: [24, 48, 28, 52],
        right: [16, 52, 20, 64],
        front: [20, 52, 24, 64],
        left: [24, 52, 28, 64],
        back: [28, 52, 32, 64]
    },
    leftArm:
    {
        top: [36, 48, 40, 52],
        bottom: [40, 48, 44, 52],
        right: [32, 52, 36, 64],
        front: [36, 52, 40, 64],
        left: [40, 52, 44, 64],
        back: [44, 52, 48, 64]
    },
    rightLegLayer2:
    {
        top: [4, 48, 8, 36],
        bottom: [8, 48, 12, 36],
        right: [0, 36, 4, 48],
        front: [4, 36, 8, 48],
        left: [8, 36, 12, 48],
        back: [12, 36, 16, 48]
    },
    torsoLayer2:
    {
        top: [20, 48, 28, 36],
        bottom: [28, 48, 36, 36],
        right: [16, 36, 20, 48],
        front: [20, 36, 28, 48],
        left: [28, 36, 32, 48],
        back: [32, 36, 40, 48]
    },
    rightArmLayer2:
    {
        top: [44, 48, 48, 36],
        bottom: [48, 48, 52, 36],
        right: [40, 36, 44, 48],
        front: [44, 36, 48, 48],
        left: [48, 36, 52, 48],
        back: [52, 36, 64, 48]
    },
    leftLegLayer2:
    {
        top: [4, 48, 8, 52],
        bottom: [8, 48, 12, 52],
        right: [0, 52, 4, 64],
        front: [4, 52, 8, 64],
        left: [8, 52, 12, 64],
        back: [12, 52, 16, 64]
    },
    leftArmLayer2:
    {
        top: [52, 48, 56, 52],
        bottom: [56, 48, 60, 52],
        right: [48, 52, 52, 64],
        front: [52, 52, 56, 64],
        left: [56, 52, 60, 64],
        back: [60, 52, 64, 64]
    }
}

exports.alex = Object.assign(exports.steve, {
    rightArm: {
        top: [44, 16, 47, 20],
        bottom: [47, 16, 50, 20],
        right: [40, 20, 44, 32],
        front: [44, 20, 47, 32],
        left: [47, 20, 51, 32],
        back: [51, 20, 54, 32]
    }
})