import * as d3 from 'd3'

export const colorRange = d3
  .scaleOrdinal<string>()
  // .domain(['group0', 'group1', 'group2', 'group3', 'group4']) // optional but useful
  .range([
    '#4df179', // light pink
    '#B28DFF', // lavender
    '#85E3FF', // baby blue
    '#37ac7d', // mint
    '#3c83e0', // aqua
    '#ff3f3f', // light yellow
    '#ff74a9', // rose
    '#95ff80', // light green
    '#9BF6FF', // sky blue
    '#A0C4FF', // periwinkle
    '#FF6F91', // standout pink
    '#00C2A8', // standout teal
  ])
