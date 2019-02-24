<template>
  <v-layout >
    <v-flex xs10 sm4 offset-sm3>
      <div class="list white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>ToDo List</v-toolbar-title>
        </v-toolbar> 
        <div v-for="todo in todos"
        	:key="todo.id">
        	<panel title="Todos">
            <div class="description inline">
        	{{todo.description}}
        </div>
        <div class="inline">
          <v-btn @click="editToDo(todo.id, todo.description)" color="#00bcd4" fab small dark>
              <font-awesome-icon icon="edit" />
          </v-btn>
          <v-btn @click="deleteToDo(todo.id)" color="red" fab small dark>
              <font-awesome-icon icon="trash" />
          </v-btn>
        </div>
        	</panel>
        </div>
      </div>
    </v-flex>
    <v-flex sm2>
        <v-textarea
          outline
          color="#00bcd4"
          v-model="description"
          name="input-7-4"
          label="Add an Item"
          ></v-textarea>
        <v-btn v-if="!this.editMode" @click="addToDo">Add</v-btn>
        <v-btn v-if="this.editMode"  @click="saveToDo">Save</v-btn>
        <v-btn color="#00bcd4" dark @click="logout">Logout</v-btn>
        <div class="error" v-html="error">Testing</div>
        <div class="success" v-html="success"></div>
      </v-flex>

  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import ToDoService from '@/services/Crud'
export default{
	components: {
		Panel
	},
	data () {
		return {
			todos: null,
      description: '',
      editMode: false,
      selected: null,
      error: '',
      success: ''
		}
	},
  methods: {
    async getAllToDos() {
      this.todos = (await ToDoService.getAllToDos({
        id: this.$store.getters.getUser
      })).data
    },

    async addToDo () {
      try {
          await ToDoService.createToDo({
            description: this.description,
            user_ID: this.$store.getters.getUser
          })
          this.getAllToDos()
        } catch (err) {
          this.error = err.response.data.error
        }
    },

    async editToDo (id, description) {
      this.description = description,
      this.selected = id
      this.editMode = true
    },

    async saveToDo () {
      try {
          await ToDoService.editToDo({
            description: this.description,
            id: this.selected
          })
          this.description = '',
          this.editMode = false
          this.getAllToDos()
        } catch (err) {
          this.error = err.response.data.error
        }

    },

    async getMode () {
      return this.editMode
    },

    async logout () {
      this.$store.dispatch('setUser', 0)
      this.$store.dispatch('loggedIn', false)
       this.$router.push({name: 'register'})
    },

    deleteToDo:  async function (ids) {
      try {
           await ToDoService.deleteToDo({
            id: ids
          })
          this.getAllToDos()
        } catch (err) {
          this.error = err.response.data.error
        }
    },
  },

	async mounted () {
    if(this.$store.getters.getStatus){
      this.getAllToDos()
    }else{
		  this.$router.push({name: 'register'})
    }
	}
}
</script>

<style scoped>

.error {
  color:red;
}

.align-right {
  text-align:right;
}

.inline {
  display:inline-block;
}

.description {
  width: 60%;
}

.list {
  margin-right:10px;
}

</style>
