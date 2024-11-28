<template>
  <div class="d-flex">
    <Navigation class="w-100 w-md-25" />

    <v-row class="mx-2" justify="center">
      <!-- Left column for the Create User card -->
      <v-col cols="6" class="mt-16">
        <v-alert
            border="left"
            style="position:absolute;top:10px;right:0;"
            type="success"
            width="400"
            v-if="userCreated"
        >
          User Created!
        </v-alert>
        <v-card color="primary" elevation="3" width="100%">
          <v-card-title class="white--text">Create User</v-card-title>
          <v-card elevation="2" class="pa-5 overflow-auto" max-height="510" min-height="510">
            <v-text-field label="Name" outlined v-model="roleObject.name" dense hide-details></v-text-field>
            <v-text-field class="py-5" outlined label="Surname" v-model="roleObject.surname" dense hide-details></v-text-field>
            <v-text-field outlined label="Email" dense hide-details v-model="roleObject.email"></v-text-field>
            <v-text-field type="password" class="py-5" dense hide-details outlined label="Password" v-model="roleObject.password"></v-text-field>
            <v-select :menu-props="{ offsetY: true }" outlined dense hide-details label="Select Role" v-model="roleId" :items="roles" item-text="role" item-value="id"></v-select>
            <div class="d-flex align-center justify-center">
              <v-btn width="100%" color="primary" class="my-5" @click="createUser">Create</v-btn>
            </div>
          </v-card>
        </v-card>
      </v-col>

      <!-- Right column for the user data table -->
      <v-col cols="6" class="mt-16">
        <v-card color="primary" elevation="3" width="100%">
          <v-card-title class="white--text">Users Created</v-card-title>
          <v-card elevation="2" class="pa-5 overflow-auto">
            <v-data-table sort-by="id" fixed-header :headers="headers" :items="myUsers" :items-per-page="-1"  hide-default-footer height="470" class="overflow-auto">
              <template v-slot:item="{ item }">
                <tr v-if="item.userCreatedBy === user.id">
                  <td>{{ item?.name }}</td>
                  <td>{{ item?.surname }}</td>
                  <td>{{ item?.roleId === 2 ? 'Professor' : 'Student' }}</td>
                  <td>{{ item?.email }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

  </div>

</template>
<script>
import Navigation from "@/components/Navigation.vue";
import {mapState} from "vuex";

export default{
  components: {Navigation},
  data(){
    return{
      headers:[
        { text: "Name", value: "name" },
        { text: "Surname", value: "surname" },
        { text: "Role Name", value: "role" },
        { text: "Email", value: "email" },
      ],
      roleId:null,
      userCreated:false,
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
  mounted(){
    this.$store.dispatch('getUsers').then(res=>{
    });
    // console.log('user : ' , this.user);

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
        userCreatedBy:this.user.id,
        departmentName: department === 1 ? 'Computer Science' : 'Business Economics'
      }
      console.log('body : ' , body);
      this.$store.dispatch('register', body).then(res => {
        this.userCreated=true;
        this.$store.dispatch('getUsers').then(res=>{
          window.location.reload();
        });
        this.roleObject.name = '';
        this.roleObject.email='';
        this.roleObject.surname= '';
        this.roleObject.password = '';
        this.roleId = null;
        setTimeout(() => {
          this.userCreated = false;
        }, 2000);
      });
    }

  },
  computed:{
    ...mapState({
      users: state => state.users,
      user:state=>state.user,
      myUsers:state=>state.myUsers,
    })
  },
  watch:{

  }
}
</script>

<style>

</style>