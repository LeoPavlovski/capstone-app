<template>
  <v-container>
    <v-row align="center" justify="center"  style="margin-top:200px;">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10" >
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4
                        class="text-center"
                        style="font-size:25px;"
                    >Login to Your Account</h4>
                    <h6
                        class="text-center  mt-2"
                        style="font-size:17px;"

                    >Log in to your account so you can continue builiding <br>and editing your onboarding flows</h6>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                            label="Email"
                            v-model="email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            class="mt-16"
                        />
                        <v-text-field
                            label="Password"
                            outlined
                            dense
                            v-model="password"
                            color="blue"
                            autocomplete="false"
                            type="password"

                        />

                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                                v-model="staff"
                                label="Check For Staff Account."
                                class="mt-n1"
                                color="blue"
                            > </v-checkbox>
                          </v-col>
                        </v-row>
                        <v-btn @click="performLogin" color="blue" dark block tile>Log in</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="6" class="blue rounded-bl-xl" >
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text" >
                      <h3 class="text-center" style="font-size:20px;">Don't Have an Account Yet?</h3>
                      <h6
                          class="text-center mt-2"
                          style="font-size:16px;"
                      >Let's get you all set up so you can start creating your your first<br>  onboarding experience</h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row >
                <v-col cols="12" md="6" class="blue rounded-br-xl">
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text" >
                      <h3 class="text-center " style="font-size:16px;">Already Signed up?</h3>
                      <h6
                          class="text-center"
                          style="font-size:16px;"
                      >Log in to your account so you can continue building and<br>  editing your onboarding flows</h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn  tile outlined dark @click="step--">Log in</v-btn>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4
                        class="text-center"
                        style="font-size:16px;"
                    >Sign Up for an Account</h4>
                    <h6
                        class="text-center mt-3 mb-16  grey--text " style="font-size:16px;"
                    >Let's get you all set up so you can start creatin your <br>
                      first onboarding experiance</h6>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                            label="Username"
                            v-model="username"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                        />
                        <v-text-field
                            label="Email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="email"
                        />
                        <v-text-field
                            label="Password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            type="password"
                            v-model="password"

                        />
                          <v-col cols="12" sm="7">
                            <v-checkbox
                                v-model="staff"
                                label="Check For Staff Account."
                                class="mt-n1"
                                color="blue"
                            > </v-checkbox>
                          </v-col>
                        <v-btn @click="performRegister" color="blue" dark block tile>Sign up</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>


export default {
  data: () => ({
    staff:false,
    step: 1,
    email:'',
    password:'',
    username:'',
  }),
  methods:{
    performLogin(){
      if(this.staff === true){
        this.staff =1;
      }
      else{
        this.staff=0;
      }
      const body ={
        email:this.email,
        password:this.password,
        status:this.staff
      };
      this.$store.dispatch('login',body).then(res=>{
        console.log('res : ' , res);
        this.$router.push('/dashboard');
      });
    },
    performRegister(){

      const body ={
        email:this.email,
        password:this.password,
        status:this.staff,
        name:this.username
      }

      this.$store.dispatch('register',body).then(res=>{
        console.log(res);
      })
    }
  },
  props: {
    source: String
  }


}
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>