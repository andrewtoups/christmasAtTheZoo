
///////////////////
// Global Utilities
///////////////////
var Utils = {
  getRandomDate: function getRandomDate(start, end){
    var dateRange = end.getTime() - start.getTime();
    var randomDate = new Date(start.getTime() + (dateRange * Math.random()));
    var dateObject = {
      month: randomDate.getMonth() + 1,
      date: randomDate.getDate(),
      year: randomDate.getFullYear()
    };
    return dateObject;
  },
};

///////////////////
// Zoo Constructor Function
///////////////////
function Zoo (){
  this.menagerie = {};
  this.regions = {
    zoo: null,
    display: null,
    pens: []
  };
}

Zoo.prototype = {
  populate: function populate(numOfAnimals){
    for (var index = 0; index < numOfAnimals; index++){
      newAnimal = this.grabAnimal();
      if (newAnimal !== undefined) {
        this.menagerie[newAnimal.name + index] = newAnimal;
      } else {
        this.menagerie = {};
        return 'Something went horribly, horribly wrong!!';
      }
    }
    return numOfAnimals + " animals coming right up!";
  },
  grabAnimal: function grabAnimal(species){
    if (species === undefined) {
      var animalTypes = ['Dog', 'Gila Monster', 'Horse', 'Alligator'];
      var index = Math.floor(Math.random() * 4);
      species = animalTypes[index];
    }
    switch (species) {
      case 'Dog':
        return Dog.random();
      case 'Gila Monster':
        return GilaMonster.random();
      case 'Horse':
        return Horse.random();
      case 'Alligator':
        return Alligator.random();
      default:
        return console.log("Unknown Species, cannot create");
    }
  },
  showMenagerie: function showMenagerie(){

  }
};

///////////////////
// Animal Contructor Function
///////////////////
function Animal (name, bMonth, bDay, bYear) {
  this.name = name;
  this.birthDay = (function() {
    if (bYear === undefined || bMonth === undefined || bDay === undefined) {
      return "(Not yet born)";
    } else {
      var birthDay = new Date(bYear, bMonth - 1, bDay);
      return birthDay;
    }
  }());
  this.age = this.getAge();
}

Animal.prototype = {
  getAge: function getAge(){
    if (this.birthDay === "(Not yet born)"){
      return 0;
    } else {
      var currentDate = new Date();
      var years = currentDate.getFullYear() - this.birthDay.getFullYear();
      if (years < 1) {
        var hours = (currentDate.getHours() - this.birthDay.getHours());
        return "This baby animal is " + Math.round(hours) + " hours old";
      } else {
        return years + " Years old.";
      }
    }
  },
  toString: function toString(){
    return JSON.stringify(this.getInfo());
  },
  getInfo: function getInfo(){
    var info = {
      name: this.name,
      birthday: this.birthDay,
      age: this.age
    };
    return info;
  },
  init: function init(){

  }
};

///////////////////
// Classifications:
///////////////////

// Mammal Constructor Function
function Mammal (name, bMonth, bDay, bYear) {
  Animal.call(this, name, bMonth, bDay, bYear);
}

Mammal.prototype = Object.create(Animal.prototype, {
  reproduce: {
    value : function reproduce(){
      var now = new Date();
      var bMonth = now.getMonth() + 1,
      bDay = now.getDate(),
      bYear = now.getFullYear();
      var offspring = {
        name: this.name + " Jr.",
        bMonth: bMonth,
        bDay: bDay,
        bYear: bYear
      };
      return offspring;
    }
  },
  getInfo: {
    value: function getInfo(){
      var info = Animal.prototype.getInfo.call(this); // get info from Animal
      info.classification = "Mammal";
      return info;
    }
  },
  toString: {
    value: function toString(){
      return JSON.stringify(this.getInfo());
    }
  }
});

// Reptile Constructor Function
function Reptile (name, bMonth, bDay, bYear) {
  Animal.call(this, name, bMonth, bDay, bYear);
}

Reptile.prototype = Object.create(Animal.prototype, {
  reproduce: {
    value: function reproduce() {
      var numberOfEggs = Math.ceil(Math.random() * 5);
      return numberOfEggs;
    }
  },
  getInfo: {
    value: function getInfo() {
      var info = Animal.prototype.getInfo.call(this); // get info from animal prototype
      info.classification = 'Reptile';
      return info;
    }
  },
  toString: {
    value: function toString() {
      return JSON.stringify(this.getInfo());
    }
  }
});

///////////////////
// Species:
///////////////////
// Dog Constructor Function
function Dog (name, bMonth, bDay, bYear) {
  Mammal.call(this, name, bMonth, bDay, bYear);
  return "I'm a dog and my name is " + name;
}
Dog.lifeExpectancy = 13;
Dog.icon = '🐺';
Dog.random = function random(){
  var minBirthYear = new Date().getFullYear() - Alligator.lifeExpectancy;
  var birthDay = Utils.getRandomDate(new Date(minBirthYear, 0, 0), new Date());
  var randomDog = new Dog('Doggo', birthDay.month, birthDay.date, birthDay.year);
  return randomDog;
};
Dog.prototype = Object.create(Mammal.prototype, {
  fetch: {
    value: function fetch(numberOfFetches){
      return this.name + " fetched " + numberOfFetches + " times. Good doggo!";
    }
  },
  reproduce: {
    value: function reproduce(){
      var childInfo = Mammal.prototype.reproduce.call(this);
      var offspring = new Dog(childInfo.name, childInfo.bMonth, childInfo.bDay, childInfo.bYear);
      return offspring;
    }
  },
  getInfo: {
    value: function getInfo(){
      var info = Mammal.prototype.getInfo.call(this); // get info from Mammal
      info.species = "Dog";
      info.icon = Dog.icon;
      return info;
    }
  },
  toString: {
    value: function toString(){
      return JSON.stringify(this.getInfo());
    }
  }
});

// Gila Monster Constructor Function
function GilaMonster(name, bMonth, bDay, bYear){
  Reptile.call(this, name, bMonth, bDay, bYear);
}
GilaMonster.lifeExpectancy = 30;
GilaMonster.icon = '🐲';
GilaMonster.random = function random(){
  var minBirthYear = new Date().getFullYear() - Alligator.lifeExpectancy;
  var birthDay = Utils.getRandomDate(new Date(minBirthYear, 0, 0), new Date());
  var randomGilaMonster = new GilaMonster('Gilly', birthDay.month, birthDay.date, birthDay.year);
  return randomGilaMonster;
};
GilaMonster.prototype = Object.create(Reptile.prototype, {
  bask: {
    value: function bask(duration) {
      return this.name + " basked in the hot desert sun for " + duration + " hours. That's chill.";
    }
  },
  reproduce: {
    value: function reproduce(){
      var numberOfEggs = Reptile.prototype.reproduce.call(this);
      var eggs = {};
      for (var index = 0; index < numberOfEggs; index++){
        eggs[index] = new GilaMonster(this.name + ' Jr.', undefined, undefined, undefined);
      }
      console.log(this.name + " laid " + numberOfEggs + " eggs.");
      return eggs;
    }
  },
  getInfo: {
    value: function getInfo() {
      var info = Reptile.prototype.getInfo.call(this);
      info.species = "Gila Monster";
      info.icon = GilaMonster.icon;
      return info;
    }
  },
  toString: {
    value: function toString() {
      return JSON.stringify(this.getInfo());
    }
  }
});

// Alligator Constructor Function
function Alligator(name, bMonth, bDay, bYear){
  Reptile.call(this, name, bMonth, bDay, bYear);
}
Alligator.lifeExpectancy = 50;
Alligator.icon = '🐊';
Alligator.random = function random(){
  var minBirthYear = new Date().getFullYear() - Alligator.lifeExpectancy;
  var birthDay = Utils.getRandomDate(new Date(minBirthYear, 0, 0), new Date());
  var randomAlligator = new Alligator('Ally', birthDay.month, birthDay.date, birthDay.year);
  return randomAlligator;
};
Alligator.prototype = Object.create(Reptile.prototype, {
  chomp: {
    value: function chomp(numOfTimes) {
      return this.name + " chomped " + numOfTimes + " times.";
    }
  },
  reproduce: {
    value: function reproduce(){
      var numberOfEggs = Reptile.prototype.reproduce.call(this);
      var eggs = {};
      for (var index = 0; index < numberOfEggs; index++){
        eggs[index] = new Alligator(this.name + ' Jr.', undefined, undefined, undefined);
      }
      console.log(this.name + " laid " + numberOfEggs + " eggs.");
      return eggs;
    }
  },
  getInfo: {
    value: function getInfo() {
      var info = Reptile.prototype.getInfo.call(this);
      info.species = "Alligator";
      info.icon = Alligator.icon;
      return info;
    }
  },
  toString: {
    value: function toString() {
      return JSON.stringify(this.getInfo());
    }
  }
});

// Horse Constructor Function
function Horse(name, bMonth, bDay, bYear){
  Mammal.call(this, name, bMonth, bDay, bYear);
}
Horse.lifeExpectancy = 30;
Horse.icon = '🐴';
Horse.random = function random(){
  var minBirthYear = new Date().getFullYear() - Horse.lifeExpectancy;
  var birthDay = Utils.getRandomDate(new Date(minBirthYear, 0, 0), new Date());
  var randomHorse = new Horse('Horsey', birthDay.month, birthDay.date, birthDay.year);
  return randomHorse;
};
Horse.prototype = Object.create(Mammal.prototype, {
  gallop: {
    value: function gallop(distance) {
      return this.name + " galloped for " + distance + " miles! Holy heck.";
    }
  },
  reproduce: {
    value: function reproduce(){
      var childInfo = Mammal.prototype.reproduce.call(this);
      var offspring = new Horse(childInfo.name, childInfo.bMonth, childInfo.bDay, childInfo.bYear);
      return offspring;
    }
  },  getInfo: {
    value: function getInfo() {
      var info = Mammal.prototype.getInfo.call(this);
      info.species = "Horse";
      info.icon = Horse.icon;
      return info;
    }
  },
  toString: {
    value: function toString() {
      return JSON.stringify(this.getInfo());
    }
  }
});

var ourZoo = new Zoo();
ourZoo.populate(20);
