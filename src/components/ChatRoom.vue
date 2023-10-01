<template>
  <div>
    <div class="outerContainer">
      <div class="container">
        <info-bar :room="room"></info-bar>
        <div class="messagesContainer" v-for="(message, idx) in messages" :key="idx">
          <div v-if="message.user == name" class="messageContainer justifyEnd">
            <p class="sentText pr-10">{{ message.user }}</p>
            <div class="messageBox backgroundBlue">
              <p class="messageText colorWhite">{{ message.text }}</p>
            </div>
          </div>

          <div v-if="message.user != name" class="messageContainer justifyStart">
            <div class="messageBox backgroundLight">
              <p class="messageText colorDark">{{ message.text }}</p>
            </div>
            <p class="sentText pl-10">{{ message.user }}</p>
          </div>
        </div>
        <div class="form">
          <input class="form-input" placeholder="Type a message..." v-model="message" type="text" @keydown.enter='sendMessage' />
          <button class="sendBtn" @click="sendMessage">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import io from 'socket.io-client'
import InfoBar from './InfoBar.vue';

export default {
  name: 'ChatRoom',
  components: {
    InfoBar,
  },
  data() {
    return {
      name: '',
      room: '',
      socket: '',
      ENDPOINT: 'http://localhost:5000',
      messages: [],
      newmessage: '',
      message: '',
    }
  },
  mounted() {
    this.name = this.$route.query.name;
    this.room = this.$route.query.room;

    this.socket = io(this.ENDPOINT);
    this.socket.emit('join', { name: this.name, room: this.room }, (error) => {
      if (error) {
        alert(error);
        window.location.href = '/';
      }
    });

    this.socket.on('message', (message) => {
      this.newmessage = message;
      // console.log(this.newmessage)
      this.messages.push(message);
    })

  },
  unmounted() {
    this.socket.disconnect();
    this.socket.off();
  },
  methods: {
    sendMessage() {

      if (this.message.length > 0) {
        this.socket.emit('sendMessage', this.message, () => {
          this.message = '';
      })   
      }
    }
  },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outerContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1A1A1D;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 8px;
  height: 60%;
  width: 35%;
}

@media (min-width: 320px) and (max-width: 480px) {
  .outerContainer {
    height: 100%;
  }

  .container {
    width: 100%;
    height: 100%;
  }
}

@media (min-width: 480px) and (max-width: 1200px) {
  .container {
    width: 60%;
  }
}


.form {
  display: flex;
  border-top: 2px solid #D3D3D3;
}

.form-input {
  border: none;
  border-radius: 0;
  padding: 3%;
  width: 80%;
  font-size: 1.2rem;
}

input:focus, textarea:focus, select:focus {
  outline: none;
}

.sendBtn {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979FF;
  padding: 20px;
  display: inline-block;
  border: none;
  width: 20%;
  transition: 0.4s;
}

.sendBtn:hover {
  color: #0054e5;
}

/* messages */

.messagesContainer {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.messageBox {
  background: #F3F3F3;
  border-radius: 20px;
  padding: 5px 20px;
  color: white;
  display: inline-block;
  max-width: 80%;
}

.messageText {
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
}

.messageText img {
  vertical-align: middle;
}

.messageContainer {
  display: flex;
  justify-content: flex-end;
  padding: 0 5%;
  margin-top: 3px;
}

.sentText {
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
}

.pl-10 {
  padding-left: 10px;
}

.pr-10 {
  padding-right: 10px;
}

.justifyStart {
  justify-content: flex-start;
}

.justifyEnd {
  justify-content: flex-end;
}

.colorWhite {
  color: white;
}

.colorDark {
  color: #353535;
}

.backgroundBlue {
  background: #2979FF;
}

.backgroundLight {
  background: #F3F3F3;
}
</style>
  