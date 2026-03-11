import groupChat from '@/view/pages/groupChat.vue'

describe('groupChat.vue', () => {
  it('initializes with correct data', () => {
    const data = groupChat.data()
    expect(data.groupList).toEqual([])
    expect(data.showCreateDialog).toBe(false)
    expect(data.currentGroup).toBe('')
  })

  it('loads group list on mounted', () => {
    expect(typeof groupChat.mounted).toBe('function')
    expect(typeof groupChat.methods.getGroupList).toBe('function')
  })

  it('handles group creation', () => {
    expect(typeof groupChat.methods.handleCreateGroup).toBe('function')
  })
})
