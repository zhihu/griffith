import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as Aphrodite from 'aphrodite'
import * as AphroditeNoImportant from 'aphrodite/no-important'

Aphrodite.StyleSheetTestUtils.suppressStyleInjection()
AphroditeNoImportant.StyleSheetTestUtils.suppressStyleInjection()

Enzyme.configure({adapter: new Adapter()})
