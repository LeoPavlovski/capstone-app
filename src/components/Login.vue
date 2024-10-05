<template>
  <v-container>
    <v-row align="center" justify="center"  style="margin-top:20px;">
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
                            label="Name"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="firstName"
                        />
                        <v-text-field
                            label="Surname"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="lastName"
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
                          <v-select
                              v-model="staff"
                              :items="users"
                              item-text="role"
                              item-value="id"
                              dense
                              outlined
                              class=""
                              label="Select Role"
                          >
                          </v-select>
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


import {mapGetters, mapState} from "vuex";

export default {
  data: () => ({
    role:null,
    staff:null,
    step: 1,
    email:'',
    firstName:'',
    lastName:'',
    password:'',
    username:'',
    users:[{id:1,role:'Student'}, {id:2, role:'Professor'},{id:3,role:'Admin'}],
  }),
  computed:{
    ...mapState({
      user:(state)=>state.user
    }),
    ...mapGetters({

    })
  },
  methods:{
    performLogin() {
      const body = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch('login', body).then(res => {
        if(this.user.roleId === 1){
          this.$router.push('/student');
        }
        if(this.user.roleId === 2){
          this.$router.push('/professor');
        }
        if(this.user.roleId === 3){
          this.$router.push('/companies');
        }
      })
    },
    performRegister(){
      if(this.staff === 1){
        this.role =  'Student'
      }else if(this.staff ===2){
        this.role =  'Professor'
      }else if(this.staff ===3){
        this.role =  'Admin'
      }
      //const intStaff = parseInt(this.staff);
      const body ={
        email:this.email,
        password:this.password,
        roleId : parseInt(this.staff),
        roleName : this.role,
        name:this.firstName,
        surname:this.lastName
      }

      this.$store.dispatch('register',body).then(res=>{
        this.step=0;
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