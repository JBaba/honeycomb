# Honeycomb [![npm version](https://badge.fury.io/js/honeycomb-grid.svg)](https://badge.fury.io/js/honeycomb-grid)

Another hex grid library made in JavaScript, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) code samples.

All existing JS hex grid libraries I could find are coupled with some form of view. Most often a `<canvas>` element or the browser DOM. I want more separation of concerns...and a new hobby project to spend countless hours on.

## Installation

```bash
npm i honeycomb-grid
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [ORIENTATIONS](#orientations)
    -   [FLAT](#flat)
    -   [POINTY](#pointy)
-   [Grid](#grid)
-   [Grid#colSize](#gridcolsize)
-   [Grid#hexagon](#gridhexagon)
-   [Grid#hexToPoint](#gridhextopoint)
-   [Grid#parallelogram](#gridparallelogram)
-   [Grid#pointToHex](#gridpointtohex)
-   [Grid#rectangle](#gridrectangle)
-   [Grid#rowSize](#gridrowsize)
-   [Grid#triangle](#gridtriangle)
-   [Hex](#hex)
-   [Hex.thirdCoordinate](#hexthirdcoordinate)
-   [Hex#add](#hexadd)
-   [Hex#coordinates](#hexcoordinates)
-   [Hex#corners](#hexcorners)
-   [Hex#distance](#hexdistance)
-   [Hex#height](#hexheight)
-   [Hex#hexesBetween](#hexhexesbetween)
-   [Hex#isFlat](#hexisflat)
-   [Hex#isPointy](#hexispointy)
-   [Hex#lerp](#hexlerp)
-   [Hex#neighbor](#hexneighbor)
-   [Hex#neighbors](#hexneighbors)
-   [Hex#nudge](#hexnudge)
-   [Hex#oppositeCornerDistance](#hexoppositecornerdistance)
-   [Hex#oppositeSideDistance](#hexoppositesidedistance)
-   [Hex#round](#hexround)
-   [Hex#subtract](#hexsubtract)
-   [Hex#toPoint](#hextopoint)
-   [Hex#width](#hexwidth)
-   [Point](#point)
-   [Point#add](#pointadd)
-   [Point#divide](#pointdivide)
-   [Point#multiply](#pointmultiply)
-   [Point#subtract](#pointsubtract)

### ORIENTATIONS

The different orientations hexes can have.

#### FLAT

#### POINTY

### Grid

Factory function for creating grids. It accepts optional hex settings that apply to all hexes in the grid. Several "shape" methods are exposed that return an array of hexes in a certain shape.

**Parameters**

-   `hexSettings` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Optional settings that apply to _all_ hexes in the grid.
    -   `hexSettings.size` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Size of all hexes. (optional, default `1`)
    -   `hexSettings.orientation` **(FLAT | POINTY)** All hexes are either POINTY ⬢ or FLAT ⬣. (optional, default `POINTY`)
    -   `hexSettings.origin` **[Point](#point)** Used to convert a hex to a point. Defaults to the hex's center at `Point(0, 0)`. (optional, default `Point(0,0)`)

**Examples**

```javascript
import { Grid, HEX_ORIENTATIONS } from 'Honeycomb'

const grid = Grid({
    size: 50,
    orientation: HEX_ORIENTATIONS.FLAT,
    customProperty: `I'm custom 😃`
})

const singleHex = grid.Hex(5, -1, -4)
singleHex.coordinates()      // { x: 5, y: -1, z: -4 }
singleHex.size               // 50
singleHex.customProperty     // I'm custom 😃

grid.triangle(3)             // [ { x: 0, y: 0, z: 0 },
                             //   { x: 0, y: 1, z: -1 },
                             //   { x: 0, y: 2, z: -2 },
                             //   { x: 1, y: 0, z: -1 },
                             //   { x: 1, y: 1, z: -2 },
                             //   { x: 2, y: 0, z: -2 } ]
```

Returns **[Grid](#grid)** A grid instance containing a [Hex](#hex) factory and several methods. Use the [Hex](#hex) factory for creating individual hexes or using any of the [Hex](#hex)'s methods.

### Grid#colSize

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#size-and-spacing)**

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The width of a (vertical) column of hexes in the grid.

### Grid#hexagon

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes)**

Creates a grid in the shape of a [hexagon](https://en.wikipedia.org/wiki/Hexagon).

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An options object.
    -   `options.radius` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The radius (in hexes).
    -   `options.center` **[Hex](#hex)** The center hex. (optional, default `Hex(0,0,0)`)

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** Array of hexes in a hexagon arrangement (very meta 😎).

### Grid#hexToPoint

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#hex-to-pixel)**

Translates a hex to a point.

**Parameters**

-   `hex` **[Hex](#hex)** The hex to translate from.

**Examples**

```javascript
import { Grid } from 'Honeycomb'

const grid = Grid({ size: 50 })
const hex = grid.Hex(-1, 4, -3)
grid.hexToPoint(hex) // { x: 86.60254037844386, y: 300 }

// a different origin...
const grid = Grid({ size: 50, origin: [50, 50] })
const hex = grid.Hex(-1, 4, -3)
// ...corresponds to a different point:
grid.hexToPoint(hex) // { x: 36.60254037844386, y: 250 }
```

Returns **[Point](#point)** The point to translate to.

### Grid#parallelogram

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes)**

Creates a grid in the shape of a [parallelogram](https://en.wikipedia.org/wiki/Parallelogram).

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An options object.
    -   `options.width` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The width (in hexes).
    -   `options.height` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The height (in hexes).
    -   `options.start` **[Hex](#hex)** The start hex. (optional, default `Hex(0,0,0)`)
    -   `options.direction` **(`1` \| `3` \| `5`)** The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes. (optional, default `1`)

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** Array of hexes in a parallelogram arrangement.

### Grid#pointToHex

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#pixel-to-hex)**

Converts the passed 2-dimensional [point](#point) to a hex.

**Parameters**

-   `point` **[Point](#point)** The [point-like](#point) to convert from.

**Examples**

```javascript
import { Grid, Point } from 'Honeycomb'

const grid = Grid({ size: 50 })

grid.pointToHex(Point(120, 300))     // { x: -1, y: 4, z: -3 }
// also accepts a point-like:
grid.pointToHex({ x: 120, y: 300 })  // { x: -1, y: 4, z: -3 }
grid.pointToHex([ 120, 300 ])        // { x: -1, y: 4, z: -3 }
```

Returns **[Hex](#hex)** The hex (with rounded coordinates) that contains the passed point.

### Grid#rectangle

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes)**

Creates a grid in the shape of a [rectangle](https://en.wikipedia.org/wiki/Rectangle).

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An options object.
    -   `options.width` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The width (in hexes).
    -   `options.height` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The height (in hexes).
    -   `options.start` **[Hex](#hex)** The start hex. (optional, default `Hex(0,0,0)`)
    -   `options.direction` **(`0` \| `1` \| `2` \| `3` \| `4` \| `5`)** The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes. (optional, default `0`)

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** Array of hexes in a rectengular arrangement.

### Grid#rowSize

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#size-and-spacing)**

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The height of a (horizontal) row of hexes in the grid.

### Grid#triangle

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes)**

Creates a grid in the shape of a [(equilateral) triangle](https://en.wikipedia.org/wiki/Equilateral_triangle).

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An options object.
    -   `options.size` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The side length (in hexes).
    -   `options.start` **[Hex](#hex)** The start hex. **Note**: it's not the first hex, but rather a hex relative to the triangle. (optional, default `Hex(0,0,0)`)
    -   `options.direction` **(`1` \| `5`)** The direction in which to create the shape. Each direction corresponds to a different arrangement of hexes. In this case a triangle pointing up (`direction: 1`) or down (`direction: 5`) (with pointy hexes) or right (`direction: 1`) or left (`direction: 5`) (with flat hexes). (optional, default `1`)

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** Array of hexes in a triangular arrangement.

### Hex

-   **See: [http://www.redblobgames.com/grids/hexagons/#coordinates](redblobgames.com)**

Factory function for creating hexes. It can only be accessed by creating a [Grid](#grid) (see the example).

Coordinates not passed to the factory are inferred using the other coordinates:

-   When two coordinates are passed, the third coordinate is set to the result of [Hex.thirdCoordinate(firstCoordinate, secondCoordinate)](#hexthirdcoordinate).
-   When one coordinate is passed, the second coordinate is set to the first and the third coordinate is set to the result of [Hex.thirdCoordinate(firstCoordinate, secondCoordinate)](#hexthirdcoordinate).
-   When nothing or a falsy value is passed, all coordinates are set to `0`.

**Parameters**

-   `coordinates` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))** The x coordinate or an object containing any of the x, y and z coordinates. (optional, default `0`)
    -   `coordinates.x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x coordinate. (optional, default `0`)
    -   `coordinates.y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate. (optional, default `0`)
    -   `coordinates.z` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The z coordinate. (optional, default `0`)
-   `y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate. (optional, default `0`)
-   `z` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The z coordinate. (optional, default `0`)

**Examples**

```javascript
import { Grid } from 'Honeycomb'
// `Hex()` is not exposed on `Honeycomb`, but on a grid instance instead:
const Hex = Grid().Hex

Hex()            // returns hex( x: 0, y: 0, z: 0 )
Hex(1)           // returns hex( x: 1, y: 1, z: -2 )
Hex(1, 2)        // returns hex( x: 1, y: 2, z: -3 )
Hex(1, 2, -3)    // returns hex( x: 1, y: 2, z: -3 )
Hex(1, 2, 5)     // coordinates don't sum up to 0; throws an error

Hex({ x: 3 })    // returns hex( x: 3, y: 3, z: -3 )
Hex({ y: 3 })    // returns hex( x: 3, y: 3, z: -6 )
Hex({ z: 3 })    // returns hex( x: 3, y: -6, z: 3 )
```

Returns **[Hex](#hex)** A hex object. It has all three coordinates (`x`, `y` and `z`) as its own properties and various methods in its prototype.

### Hex.thirdCoordinate

Calculates the third coordinate from the other two. The sum of all three coordinates must be 0.

**Parameters**

-   `firstCoordinate` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first other coordinate.
-   `secondCoordinate` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The second other coordinate.

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The third coordinate.

### Hex#add

**Parameters**

-   `otherHex` **[Hex](#hex)** The hex that will be added to the current.

Returns **[Hex](#hex)** The sum of the current hexes coordinates and the passed hexes coordinates.

### Hex#coordinates

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The hex's x, y and z coordinates.

### Hex#corners

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Point](#point)>** Array of corner points. Starting at the top right corner for pointy hexes and the right corner for flat hexes.

### Hex#distance

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#distances)**

**Parameters**

-   `otherHex` **[Hex](#hex)** The end hex.

**Examples**

```javascript
import { Grid } from 'Honeycomb'
const Hex = Grid().Hex

Hex(0, 0, 0).distance(Hex(1, 0, -1))    // 1
Hex(-3, -3, 6).distance(Hex(-1, 4, -3)) // 9
```

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The amount of hexes between the current and the given hex.

### Hex#height

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The (vertical) height of any hex.

### Hex#hexesBetween

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#line-drawing)**

**Parameters**

-   `otherHex` **[Hex](#hex)** The other hex.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** Array of hexes from the current hex and up to the passed `otherHex`.

### Hex#isFlat

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether hexes have a flat ⬣ orientation.

### Hex#isPointy

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether hexes have a pointy ⬢ orientation.

### Hex#lerp

Returns an interpolation between the current hex and the passed hex for a `t` between 0 and 1.
More info on [wikipedia](https://en.wikipedia.org/wiki/Linear_interpolation).

**Parameters**

-   `otherHex` **[Hex](#hex)** The other hex.
-   `t` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** A "parameter" between 0 and 1.

Returns **[Hex](#hex)** A new hex (with possibly fractional coordinates).

### Hex#neighbor

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#neighbors)**

Returns the neighboring hex in the given direction.

**Parameters**

-   `direction` **(`0` \| `1` \| `2` \| `3` \| `4` \| `5`)** Any of the 6 directions. `0` is the Eastern direction (East-southeast when the hex is flat), `1` corresponds to 60° clockwise, `2` to 120° clockwise and so forth. (optional, default `0`)
-   `diagonal` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether to look for a neighbor opposite the hex's corner instead of its side. A direction of `0` means the top corner of the hex's right side when the hex is pointy and the right corner when the hex is flat. (optional, default `false`)

**Examples**

```javascript
import { Grid } from 'Honeycomb'
const Hex = Grid().Hex

const hex = Hex()
hex.neighbor()           // { x: 1, y: -1, z: 0 }, the hex across the 0th (right) side
hex.neighbor(2)          // { x: 0, y: 1, z: -1 }, the hex across the 3rd (South West) side
hex.neighbor(3, true)    // { x: -2, y: 1, z: 1 }, the hex opposite the 4th corner
```

Returns **[Hex](#hex)** The neighboring hex.

### Hex#neighbors

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#neighbors)**

Returns **all** neighboring hexes of the current hex.

**Parameters**

-   `diagonal` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether to return the diagonally neighboring hexes. (optional, default `false`)

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** An array of the 6 neighboring hexes.

### Hex#nudge

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#line-drawing)**

Returns a new hex with a tiny offset from the current hex. Useful for interpolating in a consistent direction.

Returns **[Hex](#hex)** A new hex with a minute offset.

### Hex#oppositeCornerDistance

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The distance between opposite corners of a hex.

### Hex#oppositeSideDistance

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The distance between opposite sides of a hex.

### Hex#round

-   **See: [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#rounding)**

Rounds the current floating point hex coordinates to their nearest integer hex coordinates.

Returns **[Hex](#hex)** A new hex with rounded coordinates.

### Hex#subtract

**Parameters**

-   `otherHex` **[Hex](#hex)** The hex that will be subtracted from the current.

Returns **[Hex](#hex)** The difference between the current hexes coordinates and the passed hexes coordinates.

### Hex#toPoint

Converts the current hex to its origin [point](#point) relative to the start hex.

Returns **[Point](#point)** The 2D point the hex corresponds to.

### Hex#width

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The (horizontal) width of any hex.

### Point

Factory function for creating 2-dimensional points. Accepts a **point-like** and returns a point instance. A point-like can be an object with an `x` and `y` property (e.g. `{ x: 0, y: 0 }`) or an array with 2 items (e.g. `[0, 0]`) that correspond to `x` and `y` respectively.

**Parameters**

-   `coordinatesOrX` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)> | [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))** The x coordinate or a point-like. (optional, default `0`)
    -   `coordinatesOrX.x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x coordinate. (optional, default `0`)
    -   `coordinatesOrX.y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate. (optional, default `0`)
-   `y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y coordinate. (optional, default `0`)

**Examples**

```javascript
import { Point } from 'Honeycomb'

Point()                  // { x: 0, y: 0 }
Point(1)                 // { x: 1, y: 1 }
Point(1, 2)              // { x: 1, y: 2 }

Point([1, 2])            // { x: 1, y: 2 }
Point([1])               // { x: 1, y: 1 }

Point({ x: 1, y: 2 })    // { x: 1, y: 2 }
Point({ x: 1 })          // { x: 1, y: 1 }
Point({ y: 2 })          // { x: 2, y: 2 }
```

Returns **[Point](#point)** A point object.

### Point#add

**Parameters**

-   `point` **[Point](#point)** The point to add to the current point.

Returns **[Point](#point)** The sum of the passed point's coordinates to the current point's.

### Point#divide

**Parameters**

-   `point` **[Point](#point)** The point where the current point is divided by.

Returns **[Point](#point)** The division of the current point's coordinates and the passed point's.

### Point#multiply

**Parameters**

-   `point` **[Point](#point)** The point to multiply with the current point.

Returns **[Point](#point)** The multiplication of the passed point's coordinates and the current point's.

### Point#subtract

**Parameters**

-   `point` **[Point](#point)** The point to subtract from the current point.

Returns **[Point](#point)** The difference between the passed point's coordinates and the current point's.

## Backlog

### Bugs

1.  Honeycomb is [very slow](https://github.com/flauwekeul/honeycomb/issues/3) when used with canvas rendering (like pixi.js).
2.  Docs: find a way to link modules together. Currently, methods of the factory functions doesn't seem to belong to their factory functions (in the context of jsdoc). This bug is nasty, tried lots of things already...

### Features

7.  Regarding grid shapes, directions are unclear. Also, it's expected their start hex differs per direction so that creating grids with different directions places them in more or less the same place.
9.  Maybe `Honeycomb.Grid.createFactory` should accept a prototype (like `Honeycomb.Hex.createFactory` does) that requires a hex factory and enables creating a custom grid factory.
4.  Investigate how instance properties are set vs prototype properties. When creating a custom hex it should be possible to set properties that are copied when creating new hexes and properties that only exist in the prototype. Similar to how [stampit](https://github.com/stampit-org/stampit) solves this.
8.  Add logger that "renders" a grid using `console.log`.
10. Overwrite `Grid#sort` so it can sort by 1 or more dimensions, ascending/descending (and also accepts a custom comparator)?
11. Add `Grid.union`, `Grid.subtract`, `Grid.intersect` and `Grid.difference` (or maybe as prototype methods?). [More info](https://www.sketchapp.com/docs/shapes/boolean-operations/).
12. Maybe make entities immutable?
13. Make some Hex instance methods also Hex static methods. The instance methods can be partially applied, e.g.:

    ```javascript
    // static method Hex.isPointy():
    function isPointy(hex) {
        return hex.isPointy()
    }

    // instance method Hex#isPointy():
    function isPointy() {
        return this.orientation.toUpperCase() === ORIENTATIONS.POINTY
    }
    ```
5.  Use JSFiddle for better examples.
7.  Shiny github.io pages 😎
3.  Maybe add possibility to [stretch hexes](http://www.redblobgames.com/grids/hexagons/implementation.html#layout-test-size-tall); they needn't be regularly shaped. This is an [actual request](https://github.com/flauwekeul/honeycomb/issues/1) as well. Might be a problem that needs solvin' in the view (and not in Honeycomb).

### Refactorings

1.  Don't transpile to ES5. Who needs IE anyway?
3.  Update code (and tests) of `Point` to be more consice with other modules.
