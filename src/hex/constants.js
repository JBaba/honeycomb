Object.assign(exports, {
    DIRECTION_COORDINATES: [
        { x: 1, y: 0, z: -1 },
        { x: 1, y: -1, z: 0 },
        { x: 0, y: -1, z: 1 },
        { x: -1, y: 0, z: 1 },
        { x: -1, y: 1, z: 0 },
        { x: 0, y: 1, z: -1 }
    ],

    DIAGONAL_DIRECTION_COORDINATES: [
        { x: 2, y: -1, z: -1 },
        { x: 1, y: -2, z: 1 },
        { x: -1, y: -1, z: 2 },
        { x: -2, y: 1, z: 1 },
        { x: -1, y: 2, z: -1 },
        { x: 1, y: 1, z: -2 }
    ],

    ORIENTATIONS: {
        POINTY: Symbol('POINTY'),
        FLAT: Symbol('FLAT')
    }
})
