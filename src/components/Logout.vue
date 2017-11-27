<template>
<h1>I'll miss you</h1>
</template>
<script>
export default {
  name: 'Logout',
  mounted: function () {
    this.$store.dispatch('postLogout')
    localStorage.removeItem('speakifyit')
    this.$router.push('/')
  }
}
</script>
<style></style>