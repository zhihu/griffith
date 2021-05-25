import React, {Component} from 'react'
import {StyleSheet, css} from 'aphrodite/no-important'
import {Layer} from 'griffith'
import {EVENTS} from 'griffith-message'

const styles = StyleSheet.create({
  logo: {
    width: '20%',
    position: 'absolute',
    top: '3%',
    right: '4%',
  },
})

const LOGO_SRC = 'http://zhstatic.zhihu.com/assets/zhihu/web-logo@2x.png'

class LayerTest extends Component {
  state = {
    shouldShow: false,
  }

  componentDidMount() {
    const usp = new URLSearchParams(location.search)
    if (usp.has('logo')) {
      this.subscription = this.props.subscribeEvent(
        EVENTS.PLAYER.PLAY_COUNT,
        () => {
          this.setState({shouldShow: true})
        }
      )
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  render() {
    const {shouldShow} = this.state

    return (
      shouldShow && (
        <Layer>
          <img className={css(styles.logo)} src={LOGO_SRC} />
        </Layer>
      )
    )
  }
}

export default LayerTest
