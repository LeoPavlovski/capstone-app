<template>
  <div class="d-flex">
    <v-dialog v-model="editDialog" width="500">
      <v-card color="primary" elevation="3" v-if="newsItem">
        <v-card-title class="white--text">Edit Course</v-card-title>
        <v-card elevation="2" class="pa-5" max-height="1000" min-height="795">
          <v-text-field v-model="newsItem.title" dense outlined label="News title"></v-text-field>
          <v-textarea no-resize v-model="newsItem.content" dense outlined label="News Content"></v-textarea>
          <v-col
              cols="12"
          >
            <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="newsItem.publication_date"
                    label="Picker in dialog"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="newsItem.publication_date"
                  scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="modal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-text-field dense outlined :disabled="true" v-model="newsItem.author"></v-text-field>

          <v-btn :disabled="!isFormValidEdit"  color="primary" class="mt-16"  width="100%" @click="submitEdit">Submit</v-btn>
        </v-card>
      </v-card>
    </v-dialog>
    <Navigation class="w-100 w-md-25"></Navigation>
    <v-row class="text-center pa-5">
      <v-col cols="12" md="4">
        <v-card color="primary"  elevation="3" >
          <v-card-title class="white--text">Create News</v-card-title>
          <v-card elevation="2" class="pa-5 overflow-auto"  height="350">
            <v-text-field v-model="news.title" dense outlined label="News Title"></v-text-field>
            <v-textarea dense outlined label="News Content" v-model="news.content"></v-textarea>
            <v-col
                cols="12"
            >
              <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date"
                      label="Picker in dialog"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="modal = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-text-field disabled dense outlined label="Author" v-model="news.author"></v-text-field>
            <v-btn  :disabled="!isFormValid" color="primary" class="mt-16"  width="100%" @click="addNews">Submit</v-btn>
          </v-card>
        </v-card>
      </v-col>

      <!-- Active Internships Section -->
      <v-col cols="12" md="8">
        <v-card color="primary" class="elevation-3 white--text">
          <v-card-title>News For CST Department</v-card-title>
          <v-data-table
              :items="newsData"
              :headers="newsHeaders"
              item-key="id"
              fixed-header
              class="elevation-2"
              height="290"
              :loading="loading"
              loading-text="loading..."
          >
            <template v-slot:item.title="{item}">
              <v-icon x-small color="red">mdi-checkbox-blank-circle</v-icon>
              {{item.title}}
            </template>
            <template v-slot:item.content="{item}">
              <v-icon small color="red">mdi-book-open-page-variant</v-icon>
              {{item.content}}
            </template>
            <template v-slot:item.publication_date="{item}">
              <v-icon small color="blue">mdi-timetable</v-icon>
              {{item.publication_date}}
            </template>
            <template v-slot:item.author="{item}">
              <v-icon small color="orange">mdi-account-box</v-icon>
              {{item.author}}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" class="text-left">
        <v-card color="primary" class="elevation-3">
          <v-card-title class="white--text">My News</v-card-title>
          <v-data-table
              :items="filteredNewsForUser"
              :headers="myNewsHeaders"
              item-key="id"
              class="elevation-2"
              fixed-header
              height="120"
              :loading="loading"
              loading-text="loading..."
          >
            <template v-slot:item.title="{item}">
              <v-icon x-small color="red">mdi-checkbox-blank-circle</v-icon>
              {{item.title}}
            </template>
            <template v-slot:item.content="{item}">
              <v-icon small color="red">mdi-book-open-page-variant</v-icon>
              {{item.content}}
            </template>
            <template v-slot:item.publication_date="{item}">
              <v-icon small color="blue">mdi-timetable</v-icon>
              {{item.publication_date}}
            </template>
            <template v-slot:item.author="{item}">
              <v-icon small color="orange">mdi-account-box</v-icon>
              {{item.author}}
            </template>
            <template v-slot:item.actions="{item}">
              <v-btn small class="primary mr-2" @click="openDialog(item)">Edit</v-btn>
              <v-btn small class="red white--text" @click="deleteNews(item)">Delete</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import { mapState } from "vuex";

export default {
  async mounted() {
    await this.getUsers();
    await this.getCourses();
    await this.getNews();

  },
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      user: state => state.user,
      courses: state => state.courses,
      newsData:state=>state.news,
    }),
    isFormValid() {
      return (
          this.news.content &&
          this.news.title &&
          this.date
      );
    },
    isFormValidEdit() {
      return (
          this.newsItem.content &&
          this.newsItem.title &&
          this.newsItem.publication_date
      );
    },
    filteredNewsForUser(){
      const filteredNews = this.newsData.filter(news =>news.author === this.user.name)
      return filteredNews;
    },
  },
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      editDialog:false,
      modal: false,
      menu2: false,
      courseData:[],
      news:{
        title:'',
        content:'',
        author:'',
        publication_date:'',
      },
      loading:false,
      dialog: false,
      newsHeaders: [
        { text: "Title", value: "title" },
        { text: "Content", value: "content" },
        { text: "Author", value: "author" },
        { text: "Publication Date", value: "publication_date" },
      ],
      myNewsHeaders: [
        { text: "Title", value: "title" },
        { text: "Content", value: "content" },
        { text: "Author", value: "author" },
        { text: "Publication Date", value: "publication_date" },
        { text: "Actions", value: "actions" },
      ],
      newsItem: null,
    };
  },
  methods: {
    getNews(){
      this.$store.dispatch('getNews');
    },
    addNews(){
      const body={
        title:this.news.title,
        content:this.news.content,
        author:this.user.name,
        publication_date:this.date
      };
      this.$store.dispatch('createNews',body).then(res=>{
        this.news.title = '';
        this.news.content = '';
        this.date = '';
        this.getNews();
      });
    },
    updateNews(item){
      const body={
        id:item.id,
        title:this.newsItem.title,
        content:this.newsItem.content,
        author:this.newsItem.author,
        publication_date:this.newsItem.date
      }
      this.$store.dispatch('updateNews',body);
    },
    deleteNews(item){
      const body={
        id:item.id,
      }
      this.$store.dispatch('deleteNews',body.id).then(res=>{
        this.getNews();
      })
    },
    getCourses(){
      this.$store.dispatch('getCourses')
    },
    getUsers() {
      this.$store.dispatch('getUsers');
    },
    submitEdit() {
      const body = {
        title: this.newsItem.title,
        content: this.newsItem.content,
        publication_date: this.newsItem.publication_date,
        author: this.newsItem.author,
        id:this.newsItem.id,
      };
      this.$store.dispatch('updateNews', body).then(res => {
        this.getNews();
        this.editDialog = false;
      });
    },
    openDialog(item) {
      this.newsItem = { ...item };
      this.editDialog = true;
    },
  },
};
</script>