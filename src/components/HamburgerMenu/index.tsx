import React, { FC } from 'react'
import styles from './index.module.css' // Adjust the path if necessary

const HamburgerMenu: FC<{
  open: boolean
}> = ({ open }) => {
  return (
    <div className={`${styles.navIcon} ${open ? styles.open : ''}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default HamburgerMenu
