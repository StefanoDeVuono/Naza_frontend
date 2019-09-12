<template>
<form autocomplete="on" method="POST" @submit.prevent="signIn">
   <div class="field-list clear">
    <div class="form-item field email">
      <label class="title" for="email-yui_3_17_2_1_1568231635626_12630-field">Email</label>
              
      <input class="field-element" name="email" type="email" autocomplete="off" v-model="email" spellcheck="false" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAUBJREFUOBGVVE2ORUAQLvIS4gwzEysHkHgnkMiEc4zEJXCMNwtWTmDh3UGcYoaFhZUFCzFVnu4wIaiE+vvq6+6qTgthGH6O4/jA7x1OiCAIPwj7CoLgSXDxSjEVzAt9k01CBKdWfsFf/2WNuEwc2YqigKZpK9glAlVVwTTNbQJZlnlCkiTAZnF/mePB2biRdhwHdF2HJEmgaRrwPA+qqoI4jle5/8XkXzrCFoHg+/5ICdpm13UTho7Q9/0WnsfwiL/ouHwHrJgQR8WEwVG+oXpMPaDAkdzvd7AsC8qyhCiKJjiRnCKwbRsMw9hcQ5zv9maSBeu6hjRNYRgGFuKaCNwjkjzPoSiK1d1gDDecQobOBwswzabD/D3Np7AHOIrvNpHmPI+Kc2RZBm3bcp8wuwSIot7QQ0PznoR6wYSK0Xb/AGVLcWwc7Ng3AAAAAElFTkSuQmCC&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;">
    </div>
                      
    <div class="form-item field password">
      <label class="title" for="password-yui_3_17_2_1_1568231635626_11851-field">Password</label>
              
      <input class="field-element" type="password" autocomplete="off" v-model="password" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAUBJREFUOBGVVE2ORUAQLvIS4gwzEysHkHgnkMiEc4zEJXCMNwtWTmDh3UGcYoaFhZUFCzFVnu4wIaiE+vvq6+6qTgthGH6O4/jA7x1OiCAIPwj7CoLgSXDxSjEVzAt9k01CBKdWfsFf/2WNuEwc2YqigKZpK9glAlVVwTTNbQJZlnlCkiTAZnF/mePB2biRdhwHdF2HJEmgaRrwPA+qqoI4jle5/8XkXzrCFoHg+/5ICdpm13UTho7Q9/0WnsfwiL/ouHwHrJgQR8WEwVG+oXpMPaDAkdzvd7AsC8qyhCiKJjiRnCKwbRsMw9hcQ5zv9maSBeu6hjRNYRgGFuKaCNwjkjzPoSiK1d1gDDecQobOBwswzabD/D3Np7AHOIrvNpHmPI+Kc2RZBm3bcp8wuwSIot7QQ0PznoR6wYSK0Xb/AGVLcWwc7Ng3AAAAAElFTkSuQmCC&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;">
    </div>
  </div>

  <div class="form-button-wrapper form-button-wrapper--align-left">
    <input class="button sqs-system-button sqs-editable-button" type="submit" value="Login">
  </div>
</form>
</template>

<script>
  import 'whatwg-fetch'
  import { getAppServer } from 'common/constants'
  import { parse } from 'jsonapi-parse'
  import Storage from 'common/storage'

  export default {
    data() {
      return {
        shared: Storage.sharedState,

        email: 'spree@example.com',
        password: 'spree123'          
      }
    },

    methods: {
      signIn() {
        const credentials = {
          sign_in: {
            email: this.email,
            password: this.password            
          }
        }

        fetch(getAppServer() + '/naza/session.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        }).then(response => response.json()).then(json => {
          const parsedJson = parse(json).data
          this.shared.userToken = parsedJson.authentication_token
        })
      },
    }
  }
</script>
