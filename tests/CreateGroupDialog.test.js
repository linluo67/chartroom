import CreateGroupDialog from '@/components/CreateGroupDialog.vue'

describe('CreateGroupDialog.vue', () => {
  it('has correct props', () => {
    expect(CreateGroupDialog.props.visible.type).toBe(Boolean)
    expect(CreateGroupDialog.props.visible.default).toBe(false)
  })

  it('initializes with empty form', () => {
    const data = CreateGroupDialog.data()
    expect(data.groupForm.name).toBe('')
    expect(data.groupForm.members).toEqual([])
  })

  it('resets form when dialog opens', () => {
    const vm = {
      groupForm: {
        name: 'test',
        members: ['1002']
      },
      resetForm: CreateGroupDialog.methods.resetForm
    }
    vm.resetForm()
    expect(vm.groupForm.name).toBe('')
    expect(vm.groupForm.members).toEqual([])
  })

  it('emits createGroup event with valid data', () => {
    let emitted = null
    const vm = {
      groupForm: {
        name: '测试群',
        members: ['1002', '1003']
      },
      $message: { warning: jest.fn() },
      $emit: (event, data) => { emitted = { event, data } },
      dialogVisible: true
    }
    
    CreateGroupDialog.methods.handleCreate.call(vm)
    expect(emitted).not.toBeNull()
    expect(emitted.event).toBe('createGroup')
    expect(emitted.data.name).toBe('测试群')
  })

  it('shows warning when name is empty', () => {
    let warningShown = false
    const vm = {
      groupForm: {
        name: '',
        members: ['1002']
      },
      $message: { 
        warning: () => { warningShown = true } 
      }
    }
    
    CreateGroupDialog.methods.handleCreate.call(vm)
    expect(warningShown).toBe(true)
  })
})
