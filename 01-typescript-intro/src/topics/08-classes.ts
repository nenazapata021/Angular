export class Person {
    public firstName: string;
    public lastName: string;

    constructor(
        firstName: string,
        lastName: string = 'No Address',
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export class Hero {
    public person: Person;
    public alterEgo: string;
    public age: number;
    public realName: string;

    constructor(
        alterEgo: string,
        age: number,
        realName: string,
        person: Person,
    ) {
        this.person = person;
        this.alterEgo = alterEgo;
        this.age = age;
        this.realName = realName;
    }
}

const tony = new Person('Tony Stark', 'New York');
const ironman = new Hero('Ironman', 45, 'Tony', tony);

console.log(ironman);