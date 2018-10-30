class Person {
    constructor(firstName, lastName, age, _ssn) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this._ssn = _ssn;
    }
}
var p = new Person("John", "Lee", 29, "123-90-4567");
console.log("Last name: " + p.lastName + " SSN: " + p._ssn);
