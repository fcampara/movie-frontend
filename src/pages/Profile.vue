<template>
  <q-page>
    <div class="row worspace--profile justify-around items-center window-height">
      <ProfileList/>
      <ProfileNew/>
    </div>
  </q-page>
</template>

<script>
import ProfileList from '../components/Profile/List'
import ProfileNew from '../components/Profile/New'
export default {
  name: 'PageProfile',
  components: { ProfileList, ProfileNew }
}
</script>
