<template>
  <v-text-field
    v-model="setName"
    :rules="rules"
    :counter="max"
    placeholder="あなたの表示名"
    outlined
    label="ユーザー名を入力"
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    const max = 30
    return {
      max,
      rules: [
        // 入力必須
        v => !!v || '',
        // 30文字まで
        v => (!!v && max >= v.length) || `${max}文字以内で入力して下さい`
      ]
    }
  },
  computed: {
    setName: {
      get () { return this.name },
      set (newVal) { return this.$emit('update:name', newVal) }
    }
  }
}
</script>
