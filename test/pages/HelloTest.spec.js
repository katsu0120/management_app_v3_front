import { mount } from '@vue/test-utils'
import HelloTest from '@/pages/HelloTest'

describe('HelloWorld', () => {
  test('display Hello World', () => {
    const wrapper = mount(HelloTest)
    expect(wrapper.text()).toBe("Hello World")
  })
})
