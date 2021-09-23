# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
* kind-of bug ([#120](https://github.com/zhihu/griffith/issues/120)) ([e374afb](https://github.com/zhihu/griffith/commit/e374afb))
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
* kind-of bug ([#120](https://github.com/zhihu/griffith/issues/120)) ([e374afb](https://github.com/zhihu/griffith/commit/e374afb))
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





# [1.6.0](https://github.com/zhihu/griffith/compare/v1.5.2...v1.6.0) (2020-08-20)


### Bug Fixes

* kind-of bug ([#120](https://github.com/zhihu/griffith/issues/120)) ([e374afb](https://github.com/zhihu/griffith/commit/e374afb))
* mobile muted ([#128](https://github.com/zhihu/griffith/issues/128)) ([fa3a8fd](https://github.com/zhihu/griffith/commit/fa3a8fd))


### Features

* picture in picture ([#136](https://github.com/zhihu/griffith/issues/136)) ([f4cc4e5](https://github.com/zhihu/griffith/commit/f4cc4e5))





## [1.5.3](https://github.com/zhihu/griffith/compare/v1.5.2...v1.5.3) (2020-05-27)


### Bug Fixes

* kind-of bug ([#120](https://github.com/zhihu/griffith/issues/120)) ([e374afb](https://github.com/zhihu/griffith/commit/e374afb))
* mobile muted ([#128](https://github.com/zhihu/griffith/issues/128)) ([fa3a8fd](https://github.com/zhihu/griffith/commit/fa3a8fd))





## [1.5.2](https://github.com/zhihu/griffith/compare/v1.5.0...v1.5.2) (2020-03-31)


### Bug Fixes

* add tooltip limit ([#118](https://github.com/zhihu/griffith/issues/118)) ([af8dbf8](https://github.com/zhihu/griffith/commit/af8dbf8))
* export controller component ([#117](https://github.com/zhihu/griffith/issues/117)) ([a99512b](https://github.com/zhihu/griffith/commit/a99512b))





## [1.5.1](https://github.com/zhihu/griffith/compare/v1.5.0...v1.5.1) (2020-03-23)


### Bug Fixes

* export controller component ([4918a95](https://github.com/zhihu/griffith/commit/4918a95))





# [1.5.0](https://github.com/zhihu/griffith/compare/v1.4.5...v1.5.0) (2019-05-13)


### Bug Fixes

* remove setRequestHeader ([#91](https://github.com/zhihu/griffith/issues/91)) ([a1926bf](https://github.com/zhihu/griffith/commit/a1926bf))


### Features

* add muted autoplay ([#92](https://github.com/zhihu/griffith/issues/92)) ([7bbc7da](https://github.com/zhihu/griffith/commit/7bbc7da))





## [1.4.5](https://github.com/zhihu/griffith/compare/v1.4.4...v1.4.5) (2019-04-28)


### Bug Fixes

* cannot read property start of undefined ([#86](https://github.com/zhihu/griffith/issues/86)) ([9e2740a](https://github.com/zhihu/griffith/commit/9e2740a))





## [1.4.4](https://github.com/zhihu/griffith/compare/v1.4.3...v1.4.4) (2019-04-23)


### Bug Fixes

* make a fake GOP when video dont have B/P frame ([#85](https://github.com/zhihu/griffith/issues/85)) ([116c19a](https://github.com/zhihu/griffith/commit/116c19a))





## [1.4.3](https://github.com/zhihu/griffith/compare/v1.4.2...v1.4.3) (2019-04-19)


### Bug Fixes

* don't use MSE If the video don't have a video track ([#78](https://github.com/zhihu/griffith/issues/78)) ([0261ddb](https://github.com/zhihu/griffith/commit/0261ddb))
* dont show Controller component when first frame is not ready ([#74](https://github.com/zhihu/griffith/issues/74)) ([5f3c621](https://github.com/zhihu/griffith/commit/5f3c621))
* end of stream when last GOP is played ([#83](https://github.com/zhihu/griffith/issues/83)) ([1aaf240](https://github.com/zhihu/griffith/commit/1aaf240))
* exceeding the buffering quota ([#75](https://github.com/zhihu/griffith/issues/75)) ([01134f1](https://github.com/zhihu/griffith/commit/01134f1))





## [1.4.2](https://github.com/zhihu/griffith/compare/v1.4.1...v1.4.2) (2019-04-17)


### Bug Fixes

* cannot read property handlerType of undefined ([#70](https://github.com/zhihu/griffith/issues/70)) ([3702079](https://github.com/zhihu/griffith/commit/3702079))
* failed to execute endOfStream on MediaSource ([#69](https://github.com/zhihu/griffith/issues/69)) ([c8c91ff](https://github.com/zhihu/griffith/commit/c8c91ff))
* failed to execute start on TimeRanges ([#71](https://github.com/zhihu/griffith/issues/71)) ([b59c4d0](https://github.com/zhihu/griffith/commit/b59c4d0))





## [1.4.1](https://github.com/zhihu/griffith/compare/v1.4.0...v1.4.1) (2019-04-16)


### Bug Fixes

* add Access-Control-Allow-Methods limit ([4049347](https://github.com/zhihu/griffith/commit/4049347))
* cannot read property hdlr of undefined ([#66](https://github.com/zhihu/griffith/issues/66)) ([038ec8b](https://github.com/zhihu/griffith/commit/038ec8b))
* add Access-Control-Allow-Origin option ([#68](https://github.com/zhihu/griffith/issues/68)) ([8efb682](https://github.com/zhihu/griffith/pull/68/commits/8efb682)))
* failed to execute appendBuffer on SourceBuffer ([#68](https://github.com/zhihu/griffith/issues/68)) ([51e6602](https://github.com/zhihu/griffith/pull/68/commits/51e6602)))




# [1.4.0](https://github.com/zhihu/griffith/compare/v1.3.1...v1.4.0) (2019-04-11)


### Bug Fixes

* cache data ([#61](https://github.com/zhihu/griffith/issues/61)) ([0b5e874](https://github.com/zhihu/griffith/commit/0b5e874))
* Fix a hls bug when switching quality ([#59](https://github.com/zhihu/griffith/issues/59)) ([4a0e079](https://github.com/zhihu/griffith/commit/4a0e079))
* remove mseUpdating flag ([#63](https://github.com/zhihu/griffith/issues/63)) ([93867af](https://github.com/zhihu/griffith/commit/93867af))
* replay case ([#60](https://github.com/zhihu/griffith/issues/60)) ([e2693ad](https://github.com/zhihu/griffith/commit/e2693ad))


### Features

* adjust video quality ([#65](https://github.com/zhihu/griffith/issues/65)) ([f34077c](https://github.com/zhihu/griffith/commit/f34077c))





## [1.3.1](https://github.com/zhihu/griffith/compare/v1.3.0...v1.3.1) (2019-04-03)


### Bug Fixes

*  Failed to execute appendBuffer on SourceBuffer ([#57](https://github.com/zhihu/griffith/issues/57)) ([f4c435f](https://github.com/zhihu/griffith/commit/f4c435f))
* use xhr instead of the fetch api ([#56](https://github.com/zhihu/griffith/issues/56)) ([267b56a](https://github.com/zhihu/griffith/commit/267b56a))





# [1.3.0](https://github.com/zhihu/griffith/compare/v1.2.1...v1.3.0) (2019-04-02)


### Bug Fixes

*  Cannot read property appendBuffer of undefined ([#48](https://github.com/zhihu/griffith/issues/48)) ([9415b63](https://github.com/zhihu/griffith/commit/9415b63))
* empty audio track ([#52](https://github.com/zhihu/griffith/issues/52)) ([a62ef4d](https://github.com/zhihu/griffith/commit/a62ef4d))
* last GOP dont have audio track ([#51](https://github.com/zhihu/griffith/issues/51)) ([67d37bb](https://github.com/zhihu/griffith/commit/67d37bb))


### Features

* add buffered cache ([#43](https://github.com/zhihu/griffith/issues/43)) ([c7a7b2a](https://github.com/zhihu/griffith/commit/c7a7b2a))
* multiple sourcebuffer ([#49](https://github.com/zhihu/griffith/issues/49)) ([ac64d8a](https://github.com/zhihu/griffith/commit/ac64d8a))





## [1.2.1](https://github.com/zhihu/griffith/compare/v1.2.0...v1.2.1) (2019-03-27)


### Bug Fixes

* **griffith-utils:** rename `mergeFunctions` to `sequence` ([#41](https://github.com/zhihu/griffith/issues/41)) ([fbcd09e](https://github.com/zhihu/griffith/commit/fbcd09e))





# [1.2.0](https://github.com/zhihu/griffith/compare/v1.1.4...v1.2.0) (2019-03-26)


### Bug Fixes

* standalone build ([#32](https://github.com/zhihu/griffith/issues/32)) ([359af25](https://github.com/zhihu/griffith/commit/359af25))


### Features

* add zh-hant language ([#39](https://github.com/zhihu/griffith/issues/39)) ([32d37bb](https://github.com/zhihu/griffith/commit/32d37bb))





## [1.1.4](https://github.com/zhihu/griffith/compare/v1.1.3...v1.1.4) (2019-03-26)

**Note:** Version bump only for package griffith





## [1.1.3](https://github.com/zhihu/griffith/compare/v1.1.1...v1.1.3) (2019-03-25)


### Bug Fixes

* hls dependencies ([#30](https://github.com/zhihu/griffith/issues/30)) ([3e42ae8](https://github.com/zhihu/griffith/commit/3e42ae8))
* Module not found ([#29](https://github.com/zhihu/griffith/issues/29)) ([f80b01e](https://github.com/zhihu/griffith/commit/f80b01e))





## [1.1.2](https://github.com/zhihu/griffith/compare/v1.1.1...v1.1.2) (2019-03-25)


### Bug Fixes

* ci config ([#28](https://github.com/zhihu/griffith/issues/28)) ([6553b20](https://github.com/zhihu/griffith/commit/6553b20))
* fullscreen related issues ([#19](https://github.com/zhihu/griffith/issues/19)) ([7df92e7](https://github.com/zhihu/griffith/commit/7df92e7))
* modify webpack-dev-server port ([#5](https://github.com/zhihu/griffith/issues/5)) ([b2cd8bd](https://github.com/zhihu/griffith/commit/b2cd8bd))
* Module not found ([#29](https://github.com/zhihu/griffith/issues/29)) ([f80b01e](https://github.com/zhihu/griffith/commit/f80b01e))
* some MSE error ([#26](https://github.com/zhihu/griffith/issues/26)) ([8f38191](https://github.com/zhihu/griffith/commit/8f38191))
* **docs:** remove control character "\x08" in documents ([#3](https://github.com/zhihu/griffith/issues/3)) ([e6811cf](https://github.com/zhihu/griffith/commit/e6811cf))
* test error ([#1](https://github.com/zhihu/griffith/issues/1)) ([e891793](https://github.com/zhihu/griffith/commit/e891793))





# 1.1.0 (2019-03-22)


### Features

* init griffith ([5047aec](https://github.com/zhihu/griffith/commit/5047aec))
