const submitComponent ={
  template:
  `<div class="field">
            <label class="label">Submission title</label>
            <div class="control">
              <input class="input" type="text" v-model="title" placeholder="Text input">
            </div>
          </div>
          <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <textarea class="textarea" v-model="description" placeholder="Textarea"></textarea>
            </div>
          </div>
          <label class="label">Submission by</label>
          <div class="field">
              <div class="control">
                <label class="radio">
                  <input type="radio" name="question" value="daniel.jpg" v-model="avatar">
                  <img class="image is-24x24" src="./public/images/avatars/daniel.jpg"></label>
                <label class="radio">
                  <input type="radio" name="question" value="kristy.png" v-model="avatar">
                  <img class="image is-24x24" src="./public/images/avatars/kristy.png"></label>
                <label class="radio">
                  <input type="radio" name="question" value="veronika.jpg" v-model="avatar">
                  <img class="image is-24x24" src="./public/images/avatars/veronika.jpg"></label>
                <label class="radio">
                  <input type="radio" name="question" value="molly.png" v-model="avatar">
                  <img class="image is-24x24" src="./public/images/avatars/molly.png"></label>  
              </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" @click="submit">Submit</button>
            </div>
            <div class="control">
              <button class="button is-white" @click="reset">Reset</button>
            </div>
          </div>`,
          data(){
            return{
              title:'',
              description:'',
              avatar:'',
            }
          },
          props: ["submissions"], 
          methods:{
            reset(){
              this.title ='';
              this.description ='';
              this.avatar= '';
            },
            submit(){
              this.submissions.push(
                {
                  id: this.submissions.length+1,
                  title: this.title,
                  description: this.description,
                  url: '#',
                  votes: 0,
                  avatar: './public/images/avatars/'+this.avatar,
                  submissionImage: './public/images/submissions/image-yellow.png',
                });
              this.reset();
            },
          }
}
const submissionComponent = {
	template: 
    `<div style="display: flex; width: 100%">
        <figure class="media-left"> 
			<img class="image is-64x64" v-bind:src="submission.submissionImage">
		</figure>
			<div class="media-content"> 
				<div class="content">
					<p> 
						<strong>
						    <a v-bind:href="submission.url" class="has-text-info">{{ submission.title }}</a>
						    <span class="tag is-small">#{{ submission.id }}</span> 
						</strong>
						    <br>{{ submission.description }} <br>
						    <small class="is-size-7"> Submitted by:
						      <img class="image is-24x24" v-bind:src="submission.avatar"> 
						    </small>
						  </p>
						</div>
					  </div>
					  <div class="media-right">
					  	<span class="icon is-small" v-on:click="upvote(submission.id)">
							<i class="fa fa-chevron-up"></i>
							<strong class="has-text-info">{{ submission.votes }}</strong>
						</span>
					  </div>
    </div>`,
    props: ["submission", "submissions"], 
    methods: {
    upvote(submissionId){
      const submission=this.submissions.find(
        (submission)=>{
          return submission.id===submissionId;
        });
      submission.votes++;
    },
  },
};

const upvoteApp = {
    data() {
    return {
      submissions: Seed.submissions
    } 
  },
  computed: {
    sortedSubmissions() {
      return this.submissions.sort(
        (a, b) => { return b.votes - a.votes; }); 
    },
  },

   components: {
    "submission-component": submissionComponent,
    "submit-component" :submitComponent,
  }, 
}; 

Vue.createApp(upvoteApp).mount("#app");