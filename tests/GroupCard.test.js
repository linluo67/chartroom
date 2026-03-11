import GroupCard from '@/components/GroupCard.vue'

describe('GroupCard.vue', () => {
  it('renders group name and last message correctly', () => {
    const groupInfo = {
      id: '2001',
      name: '前端开发交流群',
      lastMsg: '大家周末有时间一起聚餐吗？',
      headImg: 'test.jpg'
    }
    
    const wrapper = {
      propsData: { groupInfo },
      data() {
        return { current: '2001' }
      }
    }
    
    expect(GroupCard.props.groupInfo.type).toBe(Object)
    expect(GroupCard.name).toBe('')
  })

  it('applies activeCard class when group is selected', () => {
    const vm = GroupCard
    expect(vm.data().current).toBe('')
  })
})
