<template>
  <button 
    :class="['btn', `btn-${variant}`, { 'btn-disabled': disabled, 'btn-small': small }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: 'Click me'
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  outline: none;
  min-width: 100px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-small {
  padding: 8px 16px;
  font-size: 14px;
  min-width: 60px;
  border-radius: 8px;
}

.btn:hover:not(.btn-disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.btn:active:not(.btn-disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(.btn-disabled) {
  background: linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%);
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
  color: white;
}

.btn-secondary:hover:not(.btn-disabled) {
  background: linear-gradient(135deg, #5a6268 0%, #495057 100%);
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
}

.btn-success:hover:not(.btn-disabled) {
  background: linear-gradient(135deg, #218838 0%, #1abc9c 100%);
}

.btn-warning {
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
  color: #212529;
}

.btn-warning:hover:not(.btn-disabled) {
  background: linear-gradient(135deg, #e0a800 0%, #dc6502 100%);
}

.btn-danger {
  background: linear-gradient(135deg, #dc3545 0%, #e74c3c 100%);
  color: white;
}

.btn-danger:hover:not(.btn-disabled) {
  background: linear-gradient(135deg, #c82333 0%, #c0392b 100%);
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  background: #6c757d !important;
}
</style>
