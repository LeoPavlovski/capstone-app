<template>
  <div class="d-flex">
    <Navigation class="w-100 w-md-25"></Navigation>
    <v-col cols="12"  md="10" style="margin-top:50px;">
      <v-card color="primary" elevation="3">
        <v-card-title class="white--text">Create User</v-card-title>
        <v-card elevation="2" class="pa-5 overflow-auto" max-height="510" min-height="510">
<!--          TODO name email password role surname-->
          <v-text-field label="Name" outlined v-model="roleObject.name" dense hide-details></v-text-field>
          <v-text-field class="py-5" outlined label="Surname" v-model="roleObject.surname" dense hide-details></v-text-field>
          <v-text-field outlined label="Email" dense hide-details v-model="roleObject.email"></v-text-field>
          <v-text-field type="password" class="py-5" dense hide-details outlined label="Password" v-model="roleObject.password"></v-text-field>
          <v-select :menu-props="{offsetY:true}" outlined dense hide-details label="Select Role" v-model="roleId" :items="roles" item-text="role" item-value="id"></v-select>
          <!-- You can add more fields as needed -->
<!--          TODO call the register api here.-->
          <div class="d-flex align-center justify-center">
            <v-btn width="100%" color="primary" class="my-5" @click="createUser">Create</v-btn>
          </div>

        </v-card>
      </v-card>
    </v-col>
  </div>

</template>
<script>
import Navigation from "@/components/Navigation.vue";

export default{
  components: {Navigation},
  data(){
    return{
      roleId:null,
      roleObject:{
        name:'',
        surname:'',
        password:null,
        email:null,
      },
      roles:[
       {
        id:1,
        role:"Student"
      },
        {
          id:2,
          role:"Professor"
        }
      ]
    }
  },
  methods:{
    createUser(){
      // After that we are going to need to make a department for the user.
      //Options : CST , Law, Business Economics ,Faculty of health sciences.
      //And only see users which they have been in the same department.
      const department = parseInt(localStorage.getItem('department'));
      const body ={
        name:this.roleObject.name,
        surname:this.roleObject.surname,
        email:this.roleObject.email,
        password:this.roleObject.password,
        roleId:this.roleId,
        department:parseInt(localStorage.getItem('department')),
        departmentName: department === 1 ? 'Computer Science' : 'Business Economics'
      }
      this.$store.dispatch('register', body);
    }

  },
  computed:{

  },
  watch:{

  }
}
</script>

<style>

</style>