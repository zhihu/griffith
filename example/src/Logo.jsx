import React from 'react'
import {StyleSheet, css} from 'aphrodite/no-important'

const styles = StyleSheet.create({
  logo: {
    width: '20%',
    position: 'absolute',
    top: '3%',
    right: '4%',
  },
})

const LOGO_SRC = 'http://zhstatic.zhihu.com/assets/zhihu/web-logo@2x.png'

function Logo() {
  return <img className={css(styles.logo)} src={LOGO_SRC} />
}

export default Logo
