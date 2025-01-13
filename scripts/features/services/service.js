import Data from "../models/model.js";

const taskOperations = {
    allTasks: [],

    getAllTasks() {
        return this.allTasks;
    },

    add(taskObj) {
        const data = new Data(taskObj.id, taskObj.taskValue);
        this.allTasks.push(data);
        console.log("Task added:", data);
    },

    search(id) {
        return this.allTasks.find(task => task.id == id);
    },

    remove(taskId) {
        this.allTasks = this.allTasks.filter(task => task.id != taskId);
        console.log(`Task with ID ${taskId} removed.`);
    },

    update(taskId, newText) {
        const taskObj = this.search(taskId);
        if (taskObj) {
            taskObj.text = newText;
            console.log(`Task with ID ${taskId} updated to: ${newText}`);
        }
    },

    loadTasks(data) {
        this.allTasks = data.map(task => new Data(task.id, task.text, task.isChecked, task.isDeleted));
        console.log(this.allTasks)
    },

    toggleCheck(taskId){
        let checked = this.search(taskId)
        if (checked) {
            checked.isChecked = !checked.isChecked;
        }
    }
};

export default taskOperations;
