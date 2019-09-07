import { mount } from '@vue/test-utils'
import TrendChart from '@/components/TrendChart'

describe('TrendChart', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(TrendChart)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
