const App = {
  data() {
    return {
      title: "Notes",
      input: {
        value: "",
        placeholder: "Type ur note",
        hideValue: '',
        id: 1
      },
      notes: [],
    };
  },
  mounted() {
    this.getNotes();
  },
  watch: {
    notes: {
      handler(updatedList) {
        localStorage.setItem("notes", JSON.stringify(updatedList));
        console.log(updatedList)
      },
      deep: true,
    },
  },
  methods: {
    getNotes() {
      const localNotes = localStorage.getItem("notes");
      if (localNotes) {
        this.notes = JSON.parse(localNotes);
      }
    },
    onSubmit() {
      this.notes.push(this.input.value);

      // reset
      this.input.value = "";
    },
    edit(event){
      const text = event.target; // получаем элемент по клику
      const input = document.querySelector('input[type=hidden]');  //получаем скрытый инпут
      text.id = input.id
      if(text.style.display === 'inline-block') { // если текущее значение видимо
        text.style.display = 'none'
        input.type = 'text'
            input.onblur = function (){ // если с отрытого инпута теряется фокус
          if (input.type === 'text'){
            if(input.value === input.value.length) {
              input.type = 'hidden'
              text.style.display = 'inline-block'
              text.innerHTML = input.value
            } else {
              input.type = 'hidden'
              text.style.display = 'inline-block'
              text.innerHTML = input.value
            }
          }
        }
      }
    },
    remove(index) {
      console.log(`note: ${index} has been removed`);
      this.notes.splice(index, 1);
    },
  },
};

Vue.createApp(App).mount("#app");
