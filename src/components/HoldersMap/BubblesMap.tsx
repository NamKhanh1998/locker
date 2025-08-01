import useDebounce from '@/hooks/useDebounce'
import * as d3 from 'd3'
import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { formatAddress } from '../ConnectWallet/utils'
import LogoLoading from '../Loading/LoadingLogo'
import { ICurrency } from '../Swap/state'
import HolderList from './HolderList'
import WalletDetail from './WalletDetail'
import { useHoldersMap } from './hooks/useFetchHolders'
import { NodeType } from './type'
import { transformData } from './utils'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import Flex from '../commonStyled/Flex'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'

const ChartContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
`

const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
`

const Tooltip = styled.div`
  position: absolute;
  visibility: hidden;
  background: rgba(0, 0, 0, 0.502);
  color: white;
  padding: 8px;
  border-radius: 0.375rem;
  pointer-events: none;
  z-index: 10;

  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  font-size: 12px;
  font-weight: 400;
  transition: all 0.3s;
  &.visible {
    visibility: visible;
  }

  strong {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 600;
  }
`

const HoldersBtn = styled(Flex)`
  border-radius: 10px;
  padding: 8px 10px;
  background-color: #3534346e;
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #ffffff36;
  }
`

const ZoomBtn = styled(Flex)`
  border-radius: 10px;
  padding: 8px 10px;
  background-color: #3534346e;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  &:hover {
    background-color: #ffffff36;
  }
`

const ZoomWrap = styled(Flex)`
  position: absolute;
  flex-direction: column;
  left: 10px;
  bottom: 200px;
  height: max-content;
  width: max-content;
  width: 50px;
  height: 200px;
  gap: 10px;
`

const BubblesMap: FC<{
  selectToken: ICurrency
}> = ({ selectToken }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const zoomInRef = useRef<HTMLDivElement>(null)
  const zoomOutRef = useRef<HTMLDivElement | null>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null)

  const { data, isLoading } = useHoldersMap(selectToken.address)

  const debounceDimensions = useDebounce(dimensions, 500)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      }
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const { width, height } = debounceDimensions

    if (
      !data ||
      !width ||
      !height ||
      !svgRef.current ||
      !zoomInRef.current ||
      !zoomOutRef.current
    )
      return

    const parsedData = JSON.parse(data)

    const { nodes, links } = transformData(
      parsedData?.nodes,
      width,
      height,
      parsedData?.links as any
    )

    const groups = Array.from(new Set(nodes.map((d: any) => d.group)))
    const groupCount = groups.length
    const clusterRadius = 20

    const groupCenters = new Map(
      groups.map((group, i) => {
        const angle = (2 * Math.PI * i) / groupCount
        return [
          group,
          {
            x: clusterRadius * Math.cos(angle),
            y: clusterRadius * Math.sin(angle),
          },
        ]
      })
    )

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .style('maxWidth', '100%')
      .style('height', 'auto')

    svg.selectAll('*').remove() // clear on re-render

    const zoomLayer = svg.append('g').attr('class', 'zoom-layer')

    const zoom = d3
      .zoom<any, unknown>()
      .scaleExtent([0.1, 8])
      .on('zoom', (event) => {
        zoomLayer.attr('transform', event.transform)
      })

    // Enable zoom behavior
    svg.call(zoom.transform, d3.zoomIdentity)
    svg.call(zoom)

    // Zoom handlers
    const handleZoom = (scaleFactor: number) => {
      svg.transition().duration(300).call(zoom.scaleBy, scaleFactor)
    }

    // Bind zoomIn/zoomOut buttons
    zoomInRef.current!.onclick = () => handleZoom(1.4)
    zoomOutRef.current!.onclick = () => handleZoom(0.6)

    const link = zoomLayer
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value))

    const tooltip = d3.select(tooltipRef.current)

    const node = zoomLayer
      .append('g')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', (d: any) => d?.color)
      .attr('fill-opacity', 0.5)
      .attr('stroke', (d: any) => d?.color)
      .style('cursor', 'pointer')
      .on('mouseover', function (event, d: any) {
        d3.select(this).attr('stroke', '#fff').attr('fill-opacity', 1)

        tooltip
          .style('left', event.pageX + 15 + 'px')
          .style('top', event.pageY - 10 + 'px')
          .classed('visible', true).html(`
          <div style="display: flex; align-items: center; justify-content: center;">
              <span style="margin-right: 4px; font-weight: 700; color:${
                d?.color
              }">#${d?.rank!}</span>
              <span style="margin-right: 4px; font-weight: 500">
                ${formatAddress(d.id, { first: 8, last: -8 })}:
              </span>
                <span style="font-weight: 600">
                ${d.percentage?.toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                })}%
              </span>
            </div>
          `)
      })
      .on('mouseout', function (event, d: any) {
        d3.select(this).attr('stroke', d?.color).attr('fill-opacity', 0.5)
        tooltip.classed('visible', false)
      })
      .on('click', function (event, d: any) {
        setSelectedNode(d)
      })
      .call(
        d3
          .drag<any, any>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .strength(0.5)
          .distance((d: any) => {
            const sourceRadius = d.source.radius || 0
            const targetRadius = d.target.radius || 0
            const padding = 0 // optional extra spacing
            return sourceRadius + targetRadius + padding
          })
      )
      .force('charge', d3.forceManyBody())
      .force(
        'collision',
        d3
          .forceCollide()
          .radius((d: any) => d.radius + 30)
          .strength(0.05)
      )
      .force(
        'x',
        d3.forceX((d: any) => groupCenters.get(d.group)?.x || 0).strength(0.03)
      )
      .force(
        'y',
        d3.forceY((d: any) => groupCenters.get(d.group)?.y || 0).strength(0.03)
      )
      .on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y)

        node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
      })
    simulation.stop()

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.1).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.1)
      d.fx = null
      d.fy = null
    }
    simulation.alphaTarget(0.1).restart()

    return () => {
      simulation.stop()
      setSelectedNode(null)
      svg.selectAll('*').remove()
    }
  }, [debounceDimensions, setSelectedNode, data])

  const [open, setOpen] = useState(false)
  const { isMobile } = useMatchBreakPoints()

  useLayoutEffect(() => {
    if (!isMobile) setOpen(true)
  }, [isMobile])

  return (
    <>
      <ChartContainer ref={containerRef}>
        {isLoading && <LogoLoading />}
        <HolderList
          open={open}
          setOpen={setOpen}
          data={data}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />
        <WalletDetail
          selectedNode={selectedNode}
          selectToken={selectToken}
        />
        <StyledSVG ref={svgRef} />
        <Tooltip ref={tooltipRef} />
        <ZoomWrap>
          <ZoomBtn ref={zoomInRef}>
            <ControlPointIcon
              sx={{
                color: '#fff',
                height: '20px',
                width: '20px',
              }}
            />
          </ZoomBtn>

          <ZoomBtn ref={zoomOutRef}>
            <RemoveCircleOutlineIcon
              sx={{
                color: '#fff',
                height: '20px',
                width: '20px',
              }}
            />
          </ZoomBtn>
        </ZoomWrap>

        {!open && (
          <HoldersBtn onClick={() => setOpen(true)}>
            <FormatListBulletedIcon
              sx={{
                color: '#fff',
                height: '30px',
                width: '30px',
              }}
            />
          </HoldersBtn>
        )}
      </ChartContainer>
    </>
  )
}

export default BubblesMap
