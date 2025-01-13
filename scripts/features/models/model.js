class Data {
    constructor(id, text, isChecked = false, isDeleted = false) {
        this.id = id;
        this.text = text;
        this.isChecked = isChecked;
        this.isDeleted = isDeleted;
    }
}

export default Data;
