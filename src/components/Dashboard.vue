<template>
  <div style="width: 95%; margin: auto;">
<!--    Place for the picture.-->
    <v-row>
      <v-col cols="3">
        <div class="d-flex align-center">
          <img
              class="mt-16"
              style="border-radius: 50%;"
              width="150"
              height="150"
              src="https://picsum.photos/200/300"
          ></img>
          <div class="d-flex flex-column justify-center ">
            <h4 class="mt-16 px-2 font-weight-bold">Welcome back , Leo Pavlovski 😇</h4>
            <h4 class="ml-2">ID : 129379</h4>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- Display Information about the student -->
    <v-row>
      <v-col cols="8">
        <v-card elevation="10">
          <v-card-title class="headline font-weight-bold">
            Contemporary Sciences Student 🖥️👩🏻‍💻⚙️
          </v-card-title>
          <v-card-text>
            <p>
              <strong>Biography:</strong> Hi, I'm Leo Pavlovski, a passionate computer science student currently pursuing my degree at South East European University. My journey in technology began at an early age, driven by a fascination with how computers work and the endless possibilities they offer. Over the years, I've developed strong skills in various programming languages, including Python, Java, and C++, and I love tackling complex problems through code.
            </p>
            <p>
              Throughout my studies, I've immersed myself in learning about software development, algorithms, and data structures. I've participated in numerous coding competitions and hackathons, which have honed my problem-solving abilities and kept me on the cutting edge of industry trends. Recognition from my peers and professors has been a motivating force, pushing me to continuously improve and innovate.
            </p>
          </v-card-text>
          <v-card-title>Active Courses</v-card-title>
          <v-data-table :headers="headers" :items="formattedCourses" hide-default-footer class="elevation-0">
            <template v-slot:item="{ item, index }">
              <tr>
                <td>
                  <v-avatar size="36">
                    <v-icon>{{ icons[index] }}</v-icon>
                  </v-avatar>
                  <span class="ml-2">{{ item.name }}</span>
                </td>
                <td>
                  <span>{{ item.description }}</span>
                </td>
                <td>
                  <span style="font-size:20px;">{{emojis[index]}}</span>
                </td>
                <td>{{grades[index]}}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card elevation="10">
          <v-card-title class="headline font-weight-bold">
           <span class="pa-2 ml-5 d-flex">Top Performing Classes 🏆</span>
            <v-card width="500">
              <v-data-table :items="CST_courses" hide-default-footer height="650">
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>
                      {{item.name}}
                    </td>
                    <td>
                      {{grades[index]}}
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-card-title>
          <v-card-text style="font-size:16px;" class="text-center">
            <!-- Add personal information content here -->
           You are Currently The 20th Student In the Generation.🏆
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card elevation="10">
          <v-card-title class="headline font-weight-bold">
            <span class=" pa-2 ml-7 d-flex">Available Internships 👨‍💻</span>
            <v-card width="500">
              <v-data-table :items="internships" hide-default-footer height="750" style="max-height: 670px">
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>
                      {{item.name}}
                    </td>
                    <td>
                      <v-btn height="25" class="float-end" color="primary">Apply</v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-card-title>
          <v-card-text style="font-size:16px;" class="text-center">
            <!-- Add personal information content here -->
           If accepted , You will receive a notification.
            <v-icon color="primary">mdi-bell-ring</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CST_courses: [
        { name: "Introduction to Computer Science", description: "An introduction to the fundamental concepts of computer science." },
        { name: "Data Structures and Algorithms", description: "Study of data organization, management, and algorithms." },
        { name: "Operating Systems", description: "Principles and structure of operating systems." },
        { name: "Database Management Systems", description: "Design and management of databases." },
        { name: "Computer Networks", description: "Concepts and protocols of computer networking." },
        { name: "Software Engineering", description: "Methods and principles of software design and development." },
        { name: "Artificial Intelligence", description: "Study of intelligent agents and machine learning algorithms." },
        { name: "Machine Learning", description: "Techniques for enabling computers to learn from data." },
        { name: "Web Development", description: "Technologies and tools for building web applications." },
        { name: "Cybersecurity", description: "Principles and practices of securing computer systems." }
      ],
      icons: ["mdi-book-open-variant", "mdi-school", "mdi-pencil", "mdi-book-open", "mdi-desktop-classic", "mdi-notebook", "mdi-feather", "mdi-calendar", "mdi-brain", "mdi-notebook"],
      emojis: ["📚", "🎓", "📝", "📖", "🖥️", "🧑‍🏫", "🖊️", "📅", "🧠", "📒"],
      grades: ["10","9", "8", "7", "9", "10", "10", "9", "10", "9"],
       internships : [
        { name: "Google" },
        { name: "Microsoft" },
        { name: "Amazon" },
        { name: "Facebook" },
        { name: "Apple" }
      ]
    };
  },
  computed: {
    formattedCourses() {
      return this.CST_courses.map((course, index) => ({
        name: course.name,
        description: course.description,
      }));
    },
    headers() {
      return [
        { text: "Course Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Icon", value: "icon" },
        { text: "Grade", value: "grade" }
      ];
    }
  },
};
</script>

<style scoped>
.v-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
}
.v-avatar .v-icon {
  font-size: 24px;
}
</style>
