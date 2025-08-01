import React from 'react'
import Box from '../commonStyled/Box'
import { Skeleton } from '@mui/material'
import styled from 'styled-components'

const Tr = styled.tr`
  display: table;
  table-layout: fixed;
  cursor: pointer;
  width: 100%;
`
const TableBody = styled.tbody`
  overflow: auto;
  display: block;
`
const Td = styled.td``

const arrs = Array.from({ length: 10 }, (_, i) => i + 1)

const TableLoading = () => {
  return (
    <TableBody>
      {arrs?.map((_) => (
        <Tr key={_}>
          <Td colSpan={999}>
            <Skeleton
              animation="wave"
              height={60}
              sx={{
                bgcolor: 'rgba(255,255,255,0.05)',
                margin: '0 10px',
              }}
            />
          </Td>
        </Tr>
      ))}
    </TableBody>
  )
}

export default TableLoading
