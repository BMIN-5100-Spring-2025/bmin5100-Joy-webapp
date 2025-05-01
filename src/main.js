import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { Amplify } from 'aws-amplify'
import router           from './router'

const awsConfig = {
  Auth: {
    Cognito:{
      userPoolClientId: "1rskp96od6vbv5icbecm7qigu2",
      userPoolId: "us-east-1_1YXxPxFDP",
      loginWith: {
        email: "true",
        oauth: {
          domain: "bmin5100-students.auth.us-east-1.amazoncognito.com",
          responseType: "token",
        }
      },
      username: 'true'
    }
  },
}

const app = createApp(App)


Amplify.configure(awsConfig)


app.use(createPinia())
.use(router)

app.mount('#app')
