<template>
  <div class="d-flex align-center  justify-center animated-background" style="height:100vh;">
    <v-card elevation="0">
      <v-col cols="12" sm="12">
        <h3 class="text-center">Welcome to CST InternSync 📝</h3>
        <v-card class="elevation-6 mt-3" height="500">
          <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
            {{ snackbarMessage }}
          </v-snackbar>
          <v-window v-model="step" >
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="12" lg="12" class="mx-auto">
                  <v-card class="pa-6" >
                    <v-card-text>
                      <!-- Title -->
                      <h4 class="text-center mb-4" style="font-size: 24px; font-weight: 600; color: #2c3e50;">Login to Your Account</h4>
                      <h6 class="text-center mb-6" style="font-size: 16px; color: #7f8c8d;">Log in to your account to continue building <br> and editing your onboarding flows.</h6>

                      <!-- Form -->
                      <v-form @submit.prevent="performLogin">
                        <v-row class="mb-4">
                          <v-col cols="12">
                            <v-text-field
                                label="Email"
                                v-model="email"
                                dense
                                prepend-inner-icon="mdi-email mdi-18px"
                                color="blue"
                                autocomplete="off"
                                class="mt-3"
                                outlined
                                required
                            />
                          </v-col>
                        </v-row>

                        <v-row class="mb-2 mt-n10">
                          <v-col cols="12">
                            <v-text-field
                                label="Password"
                                v-model="password"
                                dense
                                prepend-inner-icon="mdi-key mdi-18px"
                                color="blue"
                                autocomplete="off"
                                type="password"
                                outlined
                                required
                            />
                          </v-col>
                        </v-row>

                        <!-- Login Button -->
                        <v-btn @click="performLogin" color="blue" dark rounded block large>
                          Log in
                        </v-btn>
                      </v-form>

                      <!-- Signup Prompt -->
                      <v-row class="mt-5 text-center">
                        <v-col>
                          <h6 style="font-size: 14px;">Don't have an account?</h6>
                          <h5  style="font-size: 14px;">Please reach out to an admin for assistance.</h5>
<!--                          <v-btn @click="step++" color="blue" text>-->
<!--                            Sign Up-->
<!--                          </v-btn>-->
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

            </v-window-item>
<!--            <v-window-item :value="2">-->
<!--              <v-row dense>-->
<!--                <v-col cols="12" md="12">-->
<!--                  <div>-->
<!--                    <v-card-text>-->
<!--                      <h3 class="text-center mb-2 " style="font-size:16px;">Already Signed up?</h3>-->
<!--                      <h6 class="text-center" style="font-size:16px;">Log in to your account so you can continue <br> building  and editing your onboarding flows</h6>-->
<!--                    </v-card-text>-->
<!--                    <div class="text-center px-6">-->
<!--                      <v-btn color="red white&#45;&#45;text"  dark rounded outlined  block  @click="step&#45;&#45;">Log in</v-btn>-->
<!--                    </div>-->
<!--                  </div>-->

<!--                  <v-card-text>-->
<!--                    <h4 class="text-center" style="font-size:16px;">Sign Up for an Account</h4>-->
<!--                    <h6 class="text-center mt-3 mb-3 grey&#45;&#45;text " style="font-size:16px;">Let's get you all set up so you can start creating your <br>first onboarding experience</h6>-->
<!--                    <v-row align="center" justify="center">-->
<!--                      <v-col cols="6" style="width:20px;">-->
<!--                        <v-text-field-->
<!--                            label="Name"-->
<!--                            outlined-->
<!--                            dense-->
<!--                            color="blue"-->
<!--                            autocomplete="false"-->
<!--                            v-model="firstName"-->
<!--                        />-->
<!--                        <v-text-field-->
<!--                            label="Surname"-->
<!--                            outlined-->
<!--                            dense-->
<!--                            color="blue"-->
<!--                            autocomplete="false"-->
<!--                            v-model="lastName"-->
<!--                        />-->
<!--                      </v-col>-->
<!--                      <v-col cols="6" style="width:20px;">-->
<!--                        <v-text-field-->
<!--                            label="Email"-->
<!--                            outlined-->
<!--                            dense-->
<!--                            color="blue"-->
<!--                            autocomplete="false"-->
<!--                            v-model="email"-->
<!--                        />-->
<!--                        <v-text-field-->
<!--                            label="Password"-->
<!--                            outlined-->
<!--                            dense-->
<!--                            color="blue"-->
<!--                            autocomplete="false"-->
<!--                            type="password"-->
<!--                            v-model="password"-->
<!--                        />-->
<!--                      </v-col>-->
<!--                      <v-select-->
<!--                          v-model="staff"-->
<!--                          :items="users"-->
<!--                          item-text="role"-->
<!--                          item-value="id"-->
<!--                          dense-->
<!--                          outlined-->
<!--                          class="px-3 mt-n2"-->
<!--                          label="Select Role"-->
<!--                      >-->
<!--                      </v-select>-->
<!--                      <v-select-->
<!--                          v-model="department"-->
<!--                          :items="departments"-->
<!--                          item-text="departmentName"-->
<!--                          item-value="id"-->
<!--                          dense-->
<!--                          outlined-->
<!--                          class="px-3 mt-n2"-->
<!--                          label="Select Department"-->
<!--                      >-->
<!--                      </v-select>-->
<!--                    </v-row>-->
<!--                  </v-card-text>-->
<!--                  <div class="d-flex align-center justify-center ">-->
<!--                    <v-btn class="mb-5"  small @click="performRegister" color="blue" dark rounded>Sign up</v-btn>-->
<!--                  </div>-->
<!--                </v-col>-->

<!--              </v-row>-->
<!--            </v-window-item>-->
          </v-window>
        </v-card>
      </v-col>
    </v-card>
  </div>
</template>

<script>


import {mapGetters, mapState} from "vuex";

export default {
  data: () => ({
    // this.snackbarMessage = error.response.data.message;
    // this.snackbarColor = 'error';
    // this.snackbar = true;
    snackbarColor:'error',
    snackbar:false,
    snackbarMessage:'',
    departments:[{id:1,departmentName:'Computer Science'},{id:2,departmentName:'Business Economics'}],
    department:null,
    role:null,
    staff:null,
    step: 1,
    email:'',
    firstName:'',
    lastName:'',
    password:'',
    username:'',
    users:[{id:3,role:'Admin'}],
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
        localStorage.setItem('department', this.user.department);
        this.snackbarMessage = 'Success';
        this.snackbarColor = 'success';
        this.snackbar = true;
      }).catch((error)=>{
        this.snackbarMessage = error;
        this.snackbarColor = 'error';
        this.snackbar = true;
      })
      },
    // performRegister(){
    //   if(this.staff === 1){
    //     this.role =  'Student'
    //   }else if(this.staff ===2){
    //     this.role =  'Professor'
    //   }else if(this.staff ===3){
    //     this.role =  'Admin'
    //   }
    //   //const intStaff = parseInt(this.staff);
    //   const department = parseInt(this.department);
    //   const body ={
    //     email:this.email,
    //     password:this.password,
    //     roleId : parseInt(this.staff),
    //     roleName : this.role,
    //     name:this.firstName,
    //     surname:this.lastName,
    //     department:parseInt(this.department),
    //     departmentName:department === 1? this.departments[0].departmentName : this.departments[1].departmentName
    //   }
    //
    //   this.$store.dispatch('register',body).then(res=>{
    //     this.step=0;
    //   })
    //
    // }
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

 .animated-background {
   position: relative;
   background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
   background-size: 400% 400%;
   animation: gradientBackground 10s ease infinite;
 }

@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>