# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.25.1](https://github.com/zhihu/griffith/compare/v1.25.0...v1.25.1) (2022-04-20)


### Bug Fixes

* 修复loading状态下不能暂停的问题 ([14099bf](https://github.com/zhihu/griffith/commit/14099bf))





# [1.25.0](https://github.com/zhihu/griffith/compare/v1.24.3...v1.25.0) (2022-04-07)


### Features

* add loadeddata event ([#266](https://github.com/zhihu/griffith/issues/266)) ([797fc6f](https://github.com/zhihu/griffith/commit/797fc6f))





## [1.24.3](https://github.com/zhihu/griffith/compare/v1.24.2...v1.24.3) (2022-04-01)


### Bug Fixes

* 修改document.body=null的情况 ([76b4461](https://github.com/zhihu/griffith/commit/76b4461))





## [1.24.2](https://github.com/zhihu/griffith/compare/v1.24.1...v1.24.2) (2022-03-28)


### Bug Fixes

* use fixed size for time numbers ([#263](https://github.com/zhihu/griffith/issues/263)) ([301c660](https://github.com/zhihu/griffith/commit/301c660))





## [1.24.1](https://github.com/zhihu/griffith/compare/v1.24.0...v1.24.1) (2022-03-09)


### Bug Fixes

* source change & handler error ([#261](https://github.com/zhihu/griffith/issues/261)) ([9adcf32](https://github.com/zhihu/griffith/commit/9adcf32))





# [1.24.0](https://github.com/zhihu/griffith/compare/v1.23.0...v1.24.0) (2022-02-17)


### Features

* add layerContent prop ([f85f3a6](https://github.com/zhihu/griffith/commit/f85f3a6))





# [1.23.0](https://github.com/zhihu/griffith/compare/v1.22.1...v1.23.0) (2022-02-09)


### Bug Fixes

* add isIE in ua ([d7a6924](https://github.com/zhihu/griffith/commit/d7a6924)), closes [#18](https://github.com/zhihu/griffith/issues/18) [#158](https://github.com/zhihu/griffith/issues/158)
* do not process shortcut in input fields ([87faf57](https://github.com/zhihu/griffith/commit/87faf57))
* do not process shortcut when event is default prevented ([d08ba7a](https://github.com/zhihu/griffith/commit/d08ba7a))
* fix box-sizing style of time in Controller ([2b92454](https://github.com/zhihu/griffith/commit/2b92454))
* ignore modifier state in shortcut keys ([07534b9](https://github.com/zhihu/griffith/commit/07534b9))
* remove `Enter` shortcut ([be5f556](https://github.com/zhihu/griffith/commit/be5f556))
* use smooth progress transition ([f68c1ac](https://github.com/zhihu/griffith/commit/f68c1ac))


### Features

* add ActionToast for shortcut keys ([d76c811](https://github.com/zhihu/griffith/commit/d76c811))
* add aria label to controller buttons ([d6b889c](https://github.com/zhihu/griffith/commit/d6b889c))
* add shortcut keys for playback rate ([8c319dc](https://github.com/zhihu/griffith/commit/8c319dc))
* allow change sources on the fly, refactor VideoSourceProvider ([044f220](https://github.com/zhihu/griffith/commit/044f220))
* allow use shortcut keys without controller ([deeb310](https://github.com/zhihu/griffith/commit/deeb310))
* listen shortcut keys on root element ([63f554a](https://github.com/zhihu/griffith/commit/63f554a))





## [1.22.1](https://github.com/zhihu/griffith/compare/v1.22.0...v1.22.1) (2022-01-21)


### Bug Fixes

* fix loading state in Player ([c884140](https://github.com/zhihu/griffith/commit/c884140))





# [1.22.0](https://github.com/zhihu/griffith/compare/v1.21.3...v1.22.0) (2021-12-29)


### Features

* 添加变量控制是否使用 title 覆盖 document.title ([ddff83c](https://github.com/zhihu/griffith/commit/ddff83c))





## [1.21.3](https://github.com/zhihu/griffith/compare/v1.21.2...v1.21.3) (2021-11-04)


### Bug Fixes

* 修复controller取不到值的问题 ([4beba5a](https://github.com/zhihu/griffith/commit/4beba5a))





## [1.21.2](https://github.com/zhihu/griffith/compare/v1.21.1...v1.21.2) (2021-10-27)


### Bug Fixes

* 通过 hideMobileControls 控制 loading 状态时允许暂停视频 ([828426d](https://github.com/zhihu/griffith/commit/828426d))





## [1.21.1](https://github.com/zhihu/griffith/compare/v1.21.0...v1.21.1) (2021-10-15)


### Bug Fixes

* 隐藏移动端原生控件后，需添加自定义 loading ([2b70b23](https://github.com/zhihu/griffith/commit/2b70b23))





# [1.21.0](https://github.com/zhihu/griffith/compare/v1.20.0...v1.21.0) (2021-10-13)


### Features

* add canplay event ([aede72f](https://github.com/zhihu/griffith/commit/aede72f))





# [1.20.0](https://github.com/zhihu/griffith/compare/v1.19.0...v1.20.0) (2021-10-12)


### Features

* add hideCover/hideMobileControls prop ([810cb81](https://github.com/zhihu/griffith/commit/810cb81))





# [1.19.0](https://github.com/zhihu/griffith/compare/v1.18.4...v1.19.0) (2021-09-23)


### Features

* 修复 UI 样式以及增加 shouldShowPageFullScreenButton prop  ([#219](https://github.com/zhihu/griffith/issues/219)) ([825197b](https://github.com/zhihu/griffith/commit/825197b))





## [1.18.4](https://github.com/zhihu/griffith/compare/v1.18.3...v1.18.4) (2021-09-22)


### Bug Fixes

* add replay to locales ([3b7ab40](https://github.com/zhihu/griffith/commit/3b7ab40))
* fix playback-rate in en ([a8e2061](https://github.com/zhihu/griffith/commit/a8e2061))





## [1.18.3](https://github.com/zhihu/griffith/compare/v1.18.2...v1.18.3) (2021-09-18)


### Bug Fixes

* fix time alignment in controller ([4f6c0cd](https://github.com/zhihu/griffith/commit/4f6c0cd))
* remove useless reduce function ([c45b16c](https://github.com/zhihu/griffith/commit/c45b16c))
* use shared ControllerButton, prevent submitting form ([c490426](https://github.com/zhihu/griffith/commit/c490426))





## [1.18.2](https://github.com/zhihu/griffith/compare/v1.18.1...v1.18.2) (2021-09-17)

**Note:** Version bump only for package griffith





## [1.18.1](https://github.com/zhihu/griffith/compare/v1.18.0...v1.18.1) (2021-09-17)


### Bug Fixes

* 撤销网页全屏按钮 ([76963bc](https://github.com/zhihu/griffith/commit/76963bc))





# [1.18.0](https://github.com/zhihu/griffith/compare/v1.17.0...v1.18.0) (2021-09-16)


### Bug Fixes

* dispose subscription in MessageContext ([ca9139e](https://github.com/zhihu/griffith/commit/ca9139e))
* fix default value in LocaleContext ([e4a0816](https://github.com/zhihu/griffith/commit/e4a0816))
* remove duplicate handleError in Video ([a6aaa4c](https://github.com/zhihu/griffith/commit/a6aaa4c))


### Features

* add event params type ([20dea5a](https://github.com/zhihu/griffith/commit/20dea5a))
* add useEvent API ([fa4b671](https://github.com/zhihu/griffith/commit/fa4b671))
* migrate griffith-standalone to ts ([ca6cd25](https://github.com/zhihu/griffith/commit/ca6cd25))
* overload subscribeMessage, add action params type ([e814282](https://github.com/zhihu/griffith/commit/e814282))





# [1.17.0](https://github.com/zhihu/griffith/compare/v1.16.0...v1.17.0) (2021-09-02)


### Bug Fixes

* emit SUBSCRIPTION_READY ([7da911f](https://github.com/zhihu/griffith/commit/7da911f))


### Features

* add page fullscreen,rate switch,custom definition and some ui refactor ([3e07b12](https://github.com/zhihu/griffith/commit/3e07b12))





# [1.16.0](https://github.com/zhihu/griffith/compare/v1.15.1...v1.16.0) (2021-09-01)


### Features

* add SUBSCRIPTION_READY event ([53d28d4](https://github.com/zhihu/griffith/commit/53d28d4))





## [1.15.1](https://github.com/zhihu/griffith/compare/v1.15.0...v1.15.1) (2021-08-12)


### Bug Fixes

* fix some typing ([b67e3ca](https://github.com/zhihu/griffith/commit/b67e3ca))





# [1.15.0](https://github.com/zhihu/griffith/compare/v1.14.2...v1.15.0) (2021-08-11)


### Bug Fixes

* pass EVENTS.DOM to onEvent ([#185](https://github.com/zhihu/griffith/issues/185)) ([8f10e6b](https://github.com/zhihu/griffith/commit/8f10e6b))


### Features

* add dispatchRef, respond `ACTIONS.PLAYER.PLAY` ([f59531d](https://github.com/zhihu/griffith/commit/f59531d))
* add loop prop ([20bf9e8](https://github.com/zhihu/griffith/commit/20bf9e8))
* alwayShowVolumeButton ([320d273](https://github.com/zhihu/griffith/commit/320d273))
* support action set_volume & update readme ([7b2f25f](https://github.com/zhihu/griffith/commit/7b2f25f))





## [1.14.2](https://github.com/zhihu/griffith/compare/v1.14.1...v1.14.2) (2021-07-16)

**Note:** Version bump only for package griffith





## [1.14.1](https://github.com/zhihu/griffith/compare/v1.14.0...v1.14.1) (2021-06-24)


### Bug Fixes

* type error & css ([#178](https://github.com/zhihu/griffith/issues/178)) ([f4a6bfe](https://github.com/zhihu/griffith/commit/f4a6bfe))





# [1.14.0](https://github.com/zhihu/griffith/compare/v1.13.0...v1.14.0) (2021-06-24)


### Features

* add Controller & ProgressDot event ([#177](https://github.com/zhihu/griffith/issues/177)) ([842c7b2](https://github.com/zhihu/griffith/commit/842c7b2))





# [1.13.0](https://github.com/zhihu/griffith/compare/v1.12.0...v1.13.0) (2021-05-26)


### Features

* expose onFullScreenChange event ([#174](https://github.com/zhihu/griffith/issues/174)) ([2d8d444](https://github.com/zhihu/griffith/commit/2d8d444))
* replace `onFullScreenChange` with `onEvent` ([#175](https://github.com/zhihu/griffith/issues/175)) ([9567337](https://github.com/zhihu/griffith/commit/9567337))
* use pure ESM format ([#167](https://github.com/zhihu/griffith/issues/167)) ([e54d061](https://github.com/zhihu/griffith/commit/e54d061))





# [1.12.0](https://github.com/zhihu/griffith/compare/v1.11.1...v1.12.0) (2021-05-06)


### Features

* allow autoplay with sound ([#159](https://github.com/zhihu/griffith/issues/159)) ([7c6bab2](https://github.com/zhihu/griffith/commit/7c6bab2))





## [1.11.1](https://github.com/zhihu/griffith/compare/v1.11.0...v1.11.1) (2021-04-20)


### Bug Fixes

* fix the position of the node & add progressDots in minimalTimeline ([#157](https://github.com/zhihu/griffith/issues/157)) ([afa2ae8](https://github.com/zhihu/griffith/commit/afa2ae8))





# [1.11.0](https://github.com/zhihu/griffith/compare/v1.5.0...v1.11.0) (2021-04-19)


### Bug Fixes

* add tooltip limit ([#118](https://github.com/zhihu/griffith/issues/118)) ([af8dbf8](https://github.com/zhihu/griffith/commit/af8dbf8))
* export controller component ([#117](https://github.com/zhihu/griffith/issues/117)) ([a99512b](https://github.com/zhihu/griffith/commit/a99512b))
* mobile muted ([#128](https://github.com/zhihu/griffith/issues/128)) ([fa3a8fd](https://github.com/zhihu/griffith/commit/fa3a8fd))
* time wrap ([#143](https://github.com/zhihu/griffith/issues/143)) ([7fc4e76](https://github.com/zhihu/griffith/commit/7fc4e76))


### Features

* add defaultQuality prop ([#141](https://github.com/zhihu/griffith/issues/141)) ([084f2fa](https://github.com/zhihu/griffith/commit/084f2fa))
* add fhd text support ([#140](https://github.com/zhihu/griffith/issues/140)) ([4fb817b](https://github.com/zhihu/griffith/commit/4fb817b))
* add node information on the progress bar ([#154](https://github.com/zhihu/griffith/issues/154)) ([48a2f95](https://github.com/zhihu/griffith/commit/48a2f95))
* hidden ui ([#148](https://github.com/zhihu/griffith/issues/148)) ([f620271](https://github.com/zhihu/griffith/commit/f620271))
* picture in picture ([#136](https://github.com/zhihu/griffith/issues/136)) ([f4cc4e5](https://github.com/zhihu/griffith/commit/f4cc4e5))
* update action message ([#144](https://github.com/zhihu/griffith/issues/144)) ([833c0f4](https://github.com/zhihu/griffith/commit/833c0f4))
* use auto quality ([#147](https://github.com/zhihu/griffith/issues/147)) ([6798882](https://github.com/zhihu/griffith/commit/6798882))





# [1.10.0](https://github.com/zhihu/griffith/compare/v1.5.0...v1.10.0) (2020-12-23)


### Bug Fixes

* add tooltip limit ([#118](https://github.com/zhihu/griffith/issues/118)) ([af8dbf8](https://github.com/zhihu/griffith/commit/af8dbf8))
* export controller component ([#117](https://github.com/zhihu/griffith/issues/117)) ([a99512b](https://github.com/zhihu/griffith/commit/a99512b))
* mobile muted ([#128](https://github.com/zhihu/griffith/issues/128)) ([fa3a8fd](https://github.com/zhihu/griffith/commit/fa3a8fd))
* time wrap ([#143](https://github.com/zhihu/griffith/issues/143)) ([7fc4e76](https://github.com/zhihu/griffith/commit/7fc4e76))


### Features

* add defaultQuality prop ([#141](https://github.com/zhihu/griffith/issues/141)) ([084f2fa](https://github.com/zhihu/griffith/commit/084f2fa))
* add fhd text support ([#140](https://github.com/zhihu/griffith/issues/140)) ([4fb817b](https://github.com/zhihu/griffith/commit/4fb817b))
* hidden ui ([#148](https://github.com/zhihu/griffith/issues/148)) ([f620271](https://github.com/zhihu/griffith/commit/f620271))
* picture in picture ([#136](https://github.com/zhihu/griffith/issues/136)) ([f4cc4e5](https://github.com/zhihu/griffith/commit/f4cc4e5))
* update action message ([#144](https://github.com/zhihu/griffith/issues/144)) ([833c0f4](https://github.com/zhihu/griffith/commit/833c0f4))
* use auto quality ([#147](https://github.com/zhihu/griffith/issues/147)) ([6798882](https://github.com/zhihu/griffith/commit/6798882))





# [1.9.0](https://github.com/zhihu/griffith/compare/v1.8.1...v1.9.0) (2020-10-22)


### Features

* update action message ([#144](https://github.com/zhihu/griffith/issues/144)) ([833c0f4](https://github.com/zhihu/griffith/commit/833c0f4))





## [1.8.1](https://github.com/zhihu/griffith/compare/v1.8.0...v1.8.1) (2020-10-16)


### Bug Fixes

* time wrap ([#143](https://github.com/zhihu/griffith/issues/143)) ([7fc4e76](https://github.com/zhihu/griffith/commit/7fc4e76))





# [1.8.0](https://github.com/zhihu/griffith/compare/v1.7.0...v1.8.0) (2020-09-23)


### Features

* add defaultQuality prop ([#141](https://github.com/zhihu/griffith/issues/141)) ([084f2fa](https://github.com/zhihu/griffith/commit/084f2fa))





# [1.7.0](https://github.com/zhihu/griffith/compare/v1.6.0...v1.7.0) (2020-09-11)


### Features

* add fhd text support ([#140](https://github.com/zhihu/griffith/issues/140)) ([4fb817b](https://github.com/zhihu/griffith/commit/4fb817b))





# [1.6.0](https://github.com/xiaoyuhen/griffith/compare/v1.5.2...v1.6.0) (2020-08-20)


### Bug Fixes

* mobile muted ([#128](https://github.com/xiaoyuhen/griffith/issues/128)) ([fa3a8fd](https://github.com/xiaoyuhen/griffith/commit/fa3a8fd))


### Features

* picture in picture ([#136](https://github.com/xiaoyuhen/griffith/issues/136)) ([f4cc4e5](https://github.com/xiaoyuhen/griffith/commit/f4cc4e5))





## [1.5.3](https://github.com/xiaoyuhen/griffith/compare/v1.5.2...v1.5.3) (2020-05-27)


### Bug Fixes

* mobile muted ([#128](https://github.com/xiaoyuhen/griffith/issues/128)) ([fa3a8fd](https://github.com/xiaoyuhen/griffith/commit/fa3a8fd))





## [1.5.2](https://github.com/xiaoyuhen/griffith/compare/v1.5.0...v1.5.2) (2020-03-31)


### Bug Fixes

* add tooltip limit ([#118](https://github.com/xiaoyuhen/griffith/issues/118)) ([af8dbf8](https://github.com/xiaoyuhen/griffith/commit/af8dbf8))
* export controller component ([#117](https://github.com/xiaoyuhen/griffith/issues/117)) ([a99512b](https://github.com/xiaoyuhen/griffith/commit/a99512b))





## [1.5.1](https://github.com/xiaoyuhen/griffith/compare/v1.5.0...v1.5.1) (2020-03-23)


### Bug Fixes

* export controller component ([4918a95](https://github.com/xiaoyuhen/griffith/commit/4918a95))





# [1.5.0](https://github.com/zhihu/griffith/compare/v1.4.5...v1.5.0) (2019-05-13)


### Features

* add muted autoplay ([#92](https://github.com/zhihu/griffith/issues/92)) ([7bbc7da](https://github.com/zhihu/griffith/commit/7bbc7da))





## [1.4.5](https://github.com/zhihu/griffith/compare/v1.4.4...v1.4.5) (2019-04-28)

**Note:** Version bump only for package griffith





## [1.4.4](https://github.com/xiaoyuhen/griffith/compare/v1.4.3...v1.4.4) (2019-04-23)

**Note:** Version bump only for package griffith





## [1.4.3](https://github.com/zhihu/griffith/compare/v1.4.2...v1.4.3) (2019-04-19)


### Bug Fixes

* dont show Controller component when first frame is not ready ([#74](https://github.com/zhihu/griffith/issues/74)) ([5f3c621](https://github.com/zhihu/griffith/commit/5f3c621))





## [1.4.2](https://github.com/zhihu/griffith/compare/v1.4.1...v1.4.2) (2019-04-17)

**Note:** Version bump only for package griffith





## [1.4.1](https://github.com/zhihu/griffith/compare/v1.4.0...v1.4.1) (2019-04-16)

**Note:** Version bump only for package griffith





# [1.4.0](https://github.com/zhihu/griffith/compare/v1.3.1...v1.4.0) (2019-04-11)


### Bug Fixes

* Fix a hls bug when switching quality ([#59](https://github.com/zhihu/griffith/issues/59)) ([4a0e079](https://github.com/zhihu/griffith/commit/4a0e079))





## [1.3.1](https://github.com/zhihu/griffith/compare/v1.3.0...v1.3.1) (2019-04-03)

**Note:** Version bump only for package griffith





# [1.3.0](https://github.com/xiaoyuhen/griffith/compare/v1.2.1...v1.3.0) (2019-04-02)

**Note:** Version bump only for package griffith





## [1.2.1](https://github.com/xiaoyuhen/griffith/compare/v1.2.0...v1.2.1) (2019-03-27)


### Bug Fixes

* **griffith-utils:** rename `mergeFunctions` to `sequence` ([#41](https://github.com/xiaoyuhen/griffith/issues/41)) ([fbcd09e](https://github.com/xiaoyuhen/griffith/commit/fbcd09e))





# [1.2.0](https://github.com/zhihu/griffith/compare/v1.1.4...v1.2.0) (2019-03-26)


### Features

* add zh-hant language ([#39](https://github.com/zhihu/griffith/issues/39)) ([32d37bb](https://github.com/zhihu/griffith/commit/32d37bb))





## [1.1.4](https://github.com/xiaoyuhen/griffith/compare/v1.1.3...v1.1.4) (2019-03-26)

**Note:** Version bump only for package griffith





## [1.1.3](https://github.com/xiaoyuhen/griffith/compare/v1.1.1...v1.1.3) (2019-03-25)


### Bug Fixes

* hls dependencies ([#30](https://github.com/xiaoyuhen/griffith/issues/30)) ([3e42ae8](https://github.com/xiaoyuhen/griffith/commit/3e42ae8))
* Module not found ([#29](https://github.com/xiaoyuhen/griffith/issues/29)) ([f80b01e](https://github.com/xiaoyuhen/griffith/commit/f80b01e))





## [1.1.2](https://github.com/xiaoyuhen/griffith/compare/v1.1.1...v1.1.2) (2019-03-25)


### Bug Fixes

* fullscreen related issues ([#19](https://github.com/xiaoyuhen/griffith/issues/19)) ([7df92e7](https://github.com/xiaoyuhen/griffith/commit/7df92e7))
* modify webpack-dev-server port ([#5](https://github.com/xiaoyuhen/griffith/issues/5)) ([b2cd8bd](https://github.com/xiaoyuhen/griffith/commit/b2cd8bd))
* Module not found ([#29](https://github.com/xiaoyuhen/griffith/issues/29)) ([f80b01e](https://github.com/xiaoyuhen/griffith/commit/f80b01e))
* **docs:** remove control character "\x08" in documents ([#3](https://github.com/xiaoyuhen/griffith/issues/3)) ([e6811cf](https://github.com/xiaoyuhen/griffith/commit/e6811cf))
* test error ([#1](https://github.com/xiaoyuhen/griffith/issues/1)) ([e891793](https://github.com/xiaoyuhen/griffith/commit/e891793))





# 1.1.0 (2019-03-22)


### Features

* init griffith ([5047aec](https://github.com/xiaoyuhen/griffith/commit/5047aec))
