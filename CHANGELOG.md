# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
