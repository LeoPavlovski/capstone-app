
<template>
  <div style="width:95%;margin:auto;">
    <div class="mt-16">
      <v-card>
        <v-row>
          <v-col cols="3">
            <h3 class="ml-3">Welcome Leo Pavlovski 👋 🤗</h3>
            <v-card-text>How are you feeling today?</v-card-text>
<!--            Upcoming Exams-->
            <v-card-title class="ml-2">Upcoming Exams 💥</v-card-title>
            <div class="overflow-auto" style="max-height: 300px;">
              <v-card v-for="item in upcomingExams" class="elevation-4 pa-5 mx-5 mb-1" style="font-size:15px;">
                {{item}}
                <v-chip pill small @click="visitRequirement" class="float-right white--text" color="blue">Check Requirements</v-chip>
              </v-card>
            </div>
          </v-col>
          <v-col cols="6">
            <h3 class="ml-2">Latest News (News For CST Students) 📰</h3>
            <v-data-table :items="news" height="400">
              <template v-slot:item="{item ,index }">
                <tr>
                  <td>{{item}}</td>
                  <td>
                    <v-icon :color="index % 2 === 1 ? 'red' : 'orange'">{{index % 2  === 1 ? 'mdi-alert-circle' : 'mdi-alert'}}</v-icon>
                  </td>
                </tr>
              </template>

            </v-data-table>
          </v-col>
          <v-col cols="3">
            <h3 class="ml-3">Your Professors 👨‍🏫</h3>
            <v-data-table :items="professorsAndSubjects" height="400">
              <template v-slot:item="{item ,index }">
                <tr>
                  <td>
                    {{item.professor}}
                  </td>
                  <td>
                    {{item.subject}}
                  </td>
                </tr>
              </template>

            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card elevation="10">
              <v-card-title class="ml-2">
                Check out companies 🌆 🚀
              </v-card-title>
              <v-card-text>
                <v-data-table :items="programmingCompanies" height="550">
                <template v-slot:item="{item}">
                  <tr>
                    <td>{{item.company}} </td>
                    <td>{{item.adminCEO}} </td>
                    <td><v-chip @click="visitCompany(item)" class="float-right white--text" color="blue" >Visit Company</v-chip> </td>
                  </tr>
                </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card-title>Company Internship Requirements 🤩</v-card-title>
            <v-card max-height="620" class="overflow-auto pa-4" elevation="10" >

              <div v-for="(internship, index) in internships " :key="index">
                <h2>{{ internship.company }} - {{ internship.position }}</h2>

                <h3>Requirements:</h3>
                <ul>
                  <li v-for="(requirement, reqIndex) in internship.requirements" :key="reqIndex">{{ requirement }}</li>
                </ul>

                <h3>Preferred Qualifications:</h3>
                <ul>
                  <li v-for="(qualification, qualIndex) in internship.preferredQualifications" :key="qualIndex">{{ qualification }}</li>
                </ul>
              </div>

            </v-card>
          </v-col>
          <v-col cols="3">
          <v-card-title>Join A Club</v-card-title>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
export default{
  data(){
    return{
     news: [
        "Google announces new AI tools for developers to build advanced applications.",
        "MIT researchers develop a quantum computing algorithm to solve complex problems faster.",
        "Amazon Web Services introduces new cloud services for machine learning and big data.",
        "Apple releases new frameworks for augmented reality and machine learning in the latest iOS update.",
        "Microsoft Azure partners with universities to offer free cloud computing courses for students.",
        "OpenAI unveils a new version of its GPT model with enhanced capabilities for natural language processing.",
        "GitHub introduces new features for collaborative coding and project management.",
        "Facebook's AI research team publishes groundbreaking research on deep learning techniques.",
        "NVIDIA releases new GPU architecture designed for high-performance computing and AI workloads.",
        "Tesla announces advancements in autonomous driving technology with improved safety features.",
        "IBM launches new quantum computing service for enterprise customers.",
        "Intel unveils next-generation processors optimized for AI and machine learning.",
        "Coursera offers a new series of courses on cloud computing and cybersecurity.",
        "Stanford University publishes a comprehensive study on the future of AI ethics.",
        "Udacity partners with Google to provide scholarships for its Data Science Nanodegree program.",
        "Cisco announces new cybersecurity solutions to protect against emerging threats.",
        "Harvard University introduces an online program for advanced computer science studies.",
        "Twitter integrates new AI-driven features to enhance user experience.",
        "Oracle releases updates to its cloud infrastructure for improved scalability and performance.",
        "Red Hat launches a new open-source project to support cloud-native applications."
      ],
      upcomingExams : [
        "GRE (Graduate Record Examination) - Scheduled for various dates throughout the year.",
        "TOEFL (Test of English as a Foreign Language) - Scheduled for various dates throughout the year.",
        "GATE (Graduate Aptitude Test in Engineering) - Scheduled for February 2025.",
        "CAT (Common Admission Test) - Scheduled for various dates throughout the year",
        "JEE Advanced (Joint Entrance Examination Advanced) - Scheduled for May 2025.",
        "SAT (Scholastic Assessment Test) - Scheduled for August, October, December 2024, and March, May 2025.",
        "IELTS (International English Language Testing System) - Scheduled for various dates throughout the year."
      ],
       professorsAndSubjects : [
        { professor: "Alice Johnson", subject: "Introduction to Computer Science" },
        { professor: "Michael Smith", subject: "Data Structures and Algorithms" },
        { professor: "Sophia Williams", subject: "Operating Systems" },
        { professor: "James Brown", subject: "Database Management Systems" },
        { professor: "Emma Davis", subject: "Artificial Intelligence" },
        { professor: "Liam Miller", subject: "Machine Learning" },
        { professor: "Olivia Wilson", subject: "Computer Networks" },
        { professor: "Noah Anderson", subject: "Software Engineering" },
        { professor: "Ava Martinez", subject: "Cybersecurity" },
        { professor: "Ethan Taylor", subject: "Web Development" }
      ],
      programmingCompanies : [
        { company: "Google", adminCEO: "Sundar Pichai" },
        { company: "Microsoft", adminCEO: "Satya Nadella" },
        { company: "Apple", adminCEO: "Tim Cook" },
        { company: "Amazon", adminCEO: "Andy Jassy" },
        { company: "Facebook", adminCEO: "Mark Zuckerberg" },
        { company: "IBM", adminCEO: "Arvind Krishna" },
        { company: "Oracle", adminCEO: "Safra Catz" },
        { company: "Intel", adminCEO: "Pat Gelsinger" },
        { company: "Adobe", adminCEO: "Shantanu Narayen" },
        { company: "NVIDIA", adminCEO: "Jensen Huang" }
      ],
       internships : [
        {
          company: "Google",
          position: "Software Engineering Intern",
          requirements: [
            "Currently enrolled in a Bachelor's, Master's, or PhD program in Computer Science or a related technical field.",
            "Experience with one or more general-purpose programming languages such as Java, C/C++, Python, or JavaScript.",
            "Knowledge of data structures and algorithms.",
            "Strong problem-solving and analytical skills.",
            "Ability to work independently and as part of a team.",
            "Excellent communication skills.",
            "Previous internship or project experience is a plus.",
            "Availability for a full-time internship for a minimum of 12 weeks."
          ],
          preferredQualifications: [
            "Experience with distributed systems, machine learning, and cloud computing.",
            "Knowledge of Unix/Linux environments and scripting.",
            "Experience with databases and SQL.",
            "Familiarity with version control systems such as Git.",
            "Participation in coding competitions or hackathons."
          ]
        },
        {
          company: "Microsoft",
          position: "Software Engineering Intern",
          requirements: [
            "Currently enrolled in a Bachelor's, Master's, or PhD program in Computer Science or a related technical field.",
            "Proficiency in at least one programming language such as C#, C++, Java, or Python.",
            "Understanding of fundamental data structures and algorithms.",
            "Strong problem-solving abilities.",
            "Ability to collaborate effectively in a team environment.",
            "Excellent verbal and written communication skills.",
            "Previous internship or project experience is a plus.",
            "Available for a full-time internship for a specified duration."
          ],
          preferredQualifications: [
            "Familiarity with cloud platforms and services.",
            "Experience with web development frameworks like React or Angular.",
            "Knowledge of databases and SQL.",
            "Exposure to version control systems like Git.",
            "Participation in coding competitions, hackathons, or open-source projects."
          ]
        },
        {
          company: "Amazon",
          position: "Software Development Engineer Intern",
          requirements: [
            "Currently pursuing a Bachelor's, Master's, or PhD in Computer Science or related technical discipline.",
            "Proficiency in programming languages such as Java, C++, Python, or Ruby.",
            "Understanding of data structures, algorithms, and object-oriented design principles.",
            "Strong analytical and problem-solving skills.",
            "Ability to work effectively in a team setting.",
            "Excellent written and verbal communication skills.",
            "Previous internship, co-op experience, or personal projects in software development is advantageous.",
            "Available for a full-time internship lasting 12 to 16 weeks."
          ],
          preferredQualifications: [
            "Experience with distributed systems, cloud computing, or machine learning.",
            "Familiarity with Unix/Linux environments and scripting languages (e.g., Bash, Python).",
            "Knowledge of relational and non-relational databases.",
            "Proficiency in using version control tools such as Git.",
            "Active participation in coding competitions, hackathons, or programming communities."
          ]
        }
      ]
     }
  },
  methods:{
    visitRequirement(){
      console.log('Clicked');
    },
    visitCompany(item){
      console.log(item);
      console.log('Visited ');
    }
  },
}
</script>
