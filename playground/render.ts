import { corners, DefaultHexPrototype, Hex, hexToPoint } from '../dist'

declare const SVG: any

export const render = (hexPrototype: DefaultHexPrototype, hexes: Iterable<Hex>) => {
  const draw = SVG().addTo('body').size('100%', '100%')

  for (const hex of hexes) {
    const { q, r, s } = hex
    const { x, y } = hexToPoint(hex)
    const polygon = draw
      .polygon(corners(hexPrototype, hex).map(({ x, y }) => `${x},${y}`))
      .fill('none')
      .stroke({ width: 1, color: '#999' })
    const text = draw
      .text(`${q},${r},${s}`)
      .font({
        size: hexPrototype.width * 0.25,
        anchor: 'middle',
        'dominant-baseline': 'central',
        leading: 0,
      })
      .translate(x, y)

    draw.group().add(polygon).add(text)
  }
}
