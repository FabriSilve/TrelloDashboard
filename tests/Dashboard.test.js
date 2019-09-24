import { mount } from '@vue/test-utils'
import Dashboard from '@/components/Dashboard'

describe('Dashboard', () => {
  test.skip('is a Vue instance', () => {
    const wrapper = mount(Dashboard);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
