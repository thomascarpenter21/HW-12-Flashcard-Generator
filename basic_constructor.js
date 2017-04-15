var Basic = function(front, back) {
    this.front = front;
    this.back = back;

}

Basic.prototype.displayCard = function() {
    console.log('Front: ' + this.front + ', ' + 'Back: ' + this.back);
};

Basic.prototype.displayFront = function() {
    console.log(this.front);

}


Basic.prototype.displayAnswer = function() {
    console.log('Wrong answer, the correct answer is ' + this.back + '.');
}

module.exports = Basic;