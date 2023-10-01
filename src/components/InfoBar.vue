<template>
    <div class="infoBar">
        <div class="leftInnerContainer"> <img src="../assets/onlineIcon.png" alt="online image" class="onlineIcon">
            <h3>{{ room }}</h3>
        </div>
        <div class="rightInnerContainer">
            <a href="/">
                <span class="material-symbols-outlined">
                    close
                </span>
            </a>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'InfoBar',
    props: {
        room: String,
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.material-symbols-outlined {
    color: #fff;
    transition: 0.4s
}

.material-symbols-outlined:hover {
    color: #8e00be;
    text-shadow: 1px 1px 5px #b104ea98;
}
.infoBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #2979FF;
    border-radius: 4px 4px 0 0;
    height: 60px;
    width: 100%;
}

.leftInnerContainer {
    flex: 0.5;
    display: flex;
    align-items: center;
    margin-left: 5%;
    color: #FFFFFF;
}

.rightInnerContainer {
    display: flex;
    flex: 0.5;
    justify-content: flex-end;
    margin-right: 5%;
}

.onlineIcon {
    margin-right: 5%;
}
</style>
  