var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping')

var products = [
    new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png',
		title:'Gothic Video Game',
		description: 'Awesome Game!!!',
		price: 10
	 }),
	 new Product({
		imagePath: 'https://www.mobygames.com/images/shots/l/20024-gothic-windows-screenshot-outside-the-old-camp-note-the-character.jpg',
		title:'Game Character',
		description: 'Gothic Screenshot: Outside the Old Camp. Note the characte',
		price: 25
	 }),
	 new Product({
		imagePath: 'https://www.rockpapershotgun.com/images/16/jul/gothic06.jpg',
		title:'Blains Gaming Life',
		description: 'They used an out of focus effect on distant terrain to speed up ',
		price: 18
	 }),
	 new Product({
		imagePath: 'http://1.bp.blogspot.com/_-LixlOVad3c/SXXZqovTvqI/AAAAAAAAA5g/0dodTI1nwFM/s400/gothic+3+green+valley.jpg',
		title:'RPG GAME',
		description: 'Concept art, wallpaper, official screenshots, and other promotional art for Gothic ',
		price: 40
	 }),
	 new Product({
		imagePath: 'https://i.ebayimg.com/images/g/i14AAMXQ1ZhTe8QS/s-l300.jpg',
		title:'PACK Dungeon Lords',
		description: 'Brand new Adventure & RPG game of 2018. FREE to Play Now!',
		price: 30
	 }),
	 new Product({
		imagePath: 'https://m.media-amazon.com/images/M/MV5BZGQwMjBlOTYtZjA3Ny00NjQxLTljZjItM2YwY2MwNzFlNzc2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_.jpg',
		title:'Arcania: Gothic 4',
		description: 'Sila Games - Alfa Beta Juega',
		price: 60
    })
];

var done = 0;

for (var i = 0; i < products.length; i++){
	products[i].save(function(err, result){
		done++;
		if(done === products.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}