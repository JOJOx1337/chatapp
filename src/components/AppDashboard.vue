<template>
  <div>
    <router-link to="/">Home</router-link>
    <div class="joinOuterContainer">
      <div class="joinInnerContainer">
        <h1 class="heading">Join</h1>
        <div><input placeholder="User Name" class="joinInput" type="text" v-model="name"></div>
        <div><input placeholder="Room Name" class="joinInput" type="text" v-model="room"></div>
        <button class="btn mt-20" type="submit" @click="joinChat">Join</button>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'AppDashboard',
  data() {
    return {
      name: '',
      room: '',
    }
  },
  methods: {
    joinChat() {
      if (this.name && this.room) {
        window.location.href = '/chat?name=' + this.name + '&room=' + this.room
      }
      if (this.name && !this.room) {
        window.location.href = '/chat?name=' + this.name + '&room=general'
      }
      if (!this.name) {
        alert('kindly enter User Name to join chat');
        return
      }
    },
  },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router-link-active {
  position: absolute;
  top: 5px;
}

.joinOuterContainer {
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-color: #1A1A1D;
}

.joinInnerContainer {
  width: 20%;
}

.joinInput {
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
}

.heading {
  color: white;
  font-size: 2.5em;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
}

.btn {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979FF;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
}

.mt-20 {
  margin-top: 20px;
}

@media screen and (width <=800px) {

  .joinInnerContainer {
    width: 70%;
  }


}


@media screen and (width <=480px) {

  .joinInnerContainer {
    width: 90%;
  }


}

button:focus {
  outline: 0;
}
</style>
  